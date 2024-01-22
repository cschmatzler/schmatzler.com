---
draft: false
title: "Idiom: a new internationalisation library for Elixir"
date: 2023-10-03
description: |
  There's a lot of untapped potential in how we internationalise our products. Now, there's a new library to
  help out.
---

There was a time when my team was tasked with updating the translations in our app. The request was to update
a few strings according to new legal requirements. At the time, our workflow included updating the
translations in an external editor, exporting them to the file format of each codebase, adding a commit with
the updated file, and submitting a new version to the App and Play Store - way too many manual steps that made
this a very unpopular task to pick up. It was a complete pain in the ass.  

This is one situation where I felt like our tooling setup really failed us. There are so many little things we
could have done: automatically synchronise to our repository, for example. Still, there is one limitation that
cannot be overcome when bundling our translation files with our releases: having to build a new release and,
for mobile applications, going through the annoying review process of the Stores.  

Over time, the idea of over-the-air localisation became more and more lovely to me. Then, I ended up working
in the localisation industry, and realised that what I wanted wasn't possible in Elixir at the moment. There
is a long-standing [pull request](https://github.com/elixir-gettext/gettext/pull/305) for `gettext` which adds
support for runtime translations, but `gettext` still isn't the fully featured library I would like to see:
there is no support for fallback locales and the way plurals are used is not immediately obvious especially
for languages with more than two plural forms.

## Enter Idiom

Let me introduce Idiom to you - and let's not beat around the bush for too long, so here's an excerpt from the
README:

```elixir
# Set the locale
Idiom.put_locale("en-US")

t("landing.welcome")

# With natural language key
t("Hello Idiom!")

# With interpolation
t("Good morning, {{name}}. We hope you are having a great day.", %{name: "Marco"})

# With plural and interpolation
t("You need to buy {{count}} cheese cakes", count: 1)

# With namespace
t("Create your account", namespace: "signup")
Idiom.put_namespace("signup")
t("Create your account")

# With explicit locale
t("Create your account", to: "fr")

# With fallback locale
t("Create your account", to: "fr", fallback: "en")
t("Create your account", to: "fr", fallback: ["en-US", "en"])

# With fallback key
t(["Create your account", "Register"], to: "fr")

# Everything everywhere all at once
t("Thank you {{name}}, your purchase of {{count}} items was successful", %{name: "Marco"}, to: "fr", namespace: "signup", count: 2, fallback: "en")
```

Now that you know the entire API (that was quick, I know), let's talk about some of the cool things that are
hopefully going to make you not hate localisation.

### Automatic locale hierarchy

Most languages have some sort of variations between regions. If you're American, you're gonna take the
elevator, whereas the British among us would properly be more comfortable with a lift. Then there's also
regional differences in spelling (`@behaviour`, anyone?). The base language and a majority of the messages
will stay the same, though. In order to reduce duplication, Idiom allows you to define your translations like
this:

```json
{
  "en": {
    "default": {
      "Create your account": "Create your account"
    }
  },
  "en-US": {
    "default": {
      "Take the elevator": "Take the elevator"
    }
  },
  "en-GB": {
    "default": {
      "Take the elevator": "Take the lift"
    }
  }
}
```

The `"Create your account"` key stays the same in every region of the English language, so we can define it
one level up under the `en` locale. The regional differences can then be defined under the `en-US` and `en-GB`
locales.  
Now, when you call `t("Create your account", to: "en-GB")`, Idiom will also automatically try to resolve the
key in the `en` locale if it's not found inside `en-GB` by creating a resolution hierarchy internally. That
way, you can define regional differences without duplicating every single key.

### Fallback locales

Ever have a language that is not yet *fully* there translation-wise, missing a key here and there, but still
ready enough to be made available for the users? Know that the user speaks another language? Add it to the
resolution hierarchy as fallback language, and it'll transparently show the message in that language. This is
also quite handy when you are targeting users from multi-lingual countries. For some Swiss people, for
example, you might get away with something like `t("Hello!", to: "de", fallback: ["fr", "it"])`. Others might
rip your head off, though, so make sure to finish those German translations!

### Over-the-air localisation

Finally. The reason I actually wrote this thing.  
Right now, Idiom supports two backends out of the box: [Phrase](https://phrase.com) and
[Lokalise](https://lokalise.com). They are both fantastic tools to manage your translations, and I highly
recommend either of them. Both also support bundling your translations as over-the-air package to be
downloaded from their CDNs, and Idiom can continuously download them and keep your copy fresh.

Let's look at that, shall we?

```elixir
config :idiom,
  default_locale: "en",
  default_namespace: "default",
  backend: Idiom.Backend.Phrase
  # backend: Idiom.Backend.Lokalise

config :idiom, Idiom.Backend.Phrase,
  locales: ["de-DE", "en-US"],
  distribution_id: "54070a20cb50153126f891eaee37123a",
  distribution_secret: "K14wARUvEikIj_9-HlcuZc0uFLG1w_OfUviNi5mDpsQ",
  otp_app: :hello_it_is_me_your_otp_app

config :idiom, Idiom.Backend.Lokalise,
  project_id: "8858941664f84165efb1d8.83865528",
  api_token: "47022866020464a1fdd9cfe66438025cbx87",
  otp_app: :hello_it_is_me_your_otp_app
```

Select a backend, add your tokens, and let Idiom start is as part of its `Supervisor`. It's that easy! Now,
your team writing copy can just update things themselves and publish a new distribution on their timeline
without requiring any engineering input.

Of course, if you are not ready to jump to an OTA solution, Idiom still supports the local file system as
source. In fact, I'd highly recommend having some version of your localisation efforts locally in case the
provider you are using is unavailable. When you are ready to move, though, Idiom will already support you in
that endeavour - and, if it's with a provider that's not Phrase or Lokalise, let me know or open a PR/publish
your own on Hex!

## What's next?

Not much, at the moment! I'd like to add some more test cases around RTL languages and different scripts, but
writing them has turned out to be pretty difficult since I don't speak one myself. Since Elixir is UTF-8 by
default, though, I am reasonably confident about Idiom already supporting those. Still, test cases are always
nice, so if you feel like your language would fit the above description, please get in touch or open a PR!

Other than that, I am just waiting for the feedback to come in as I release this to the public. The good, the
bad, the "how the hell did you miss this bug?" - they're all welcome, seriously!

I don't expect any huge changes to the API and behaviour at this point, but the version will probably stay at
`0.x` for a while to leave the door open for more sweeping changes in case y'all think it's unusable. Fingers
crossed!

---

Thanks to the team behind `gettext` for creating the current de-facto localisation library in Elixir, the
[i18next](https://www.i18next.com) team for giving me a ton of inspiration around the API, and my team at work
that got an early look at this and gave some valuable feedback.
