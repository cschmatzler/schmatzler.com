---
draft: false
title: "I think you are doing CI wrong"
date: 2023-09-13
description: |
  Continuous integration can be incredibly helpful. Most just slow you down.
---

Continuous integration is ubiquitous. Almost every project out there has some kind of pipeline set up, and most of them I've seen are terrible.  
The idea is simple: have all your lints and tests run before something is published, in a consistent environment, preventing a release if something is smelling
weird. It's a good idea, and there really isn't a codebase where a requirement of running checks is not a good idea. The problem arises when suddenly every
single tool becomes a nail once you introduce CI as a hammer.

## Moving the wrong things into CI

There are a ton of things that make sense to run in CI - the most obvious being tests. Engineers might have different machines, operating systems, runtime
versions, dependency versions. There are an infinite amount of permutations on what a developer setup might look like, and (for server-hosted applications)
only one or at most a handful that we're running on in production. Running our runtime tests on a machine that is similar to the production setup becomes
the obvious choice.  
There are also checks that we moved to CI that are not a good fit.

Let's look at formatting. Every formatter I've seen has some kind of `--check-formatted` option. It doesn't write to any files, but exits with a non-0 code if
it finds an unformatted file. The formatter has some distinct differences to running a test suite:

- It operates purely on the textual representation of the program. Differences in setup become irrelevant. You'll have formatting rules configured somewhere,
  shared between engineers, and running the command on any machine will yield the same results.
- It does not take minutes or hours, it takes a few seconds at most. It also does not require compiling the codebase as a setup step.

Couple these two points with the fact that CI has a somewhat slow feedback loop: you push a change, wait a few seconds for it to be picked up by a CI runner,
setup the environment, install OS dependencies, fetch project dependencies, then run your formatting check. At some point, open the tab in your browser again
to see the `The following files are not formatted: [...]` error, run the formatter, do a `format` commit and repeat. This can, depending on the pipeline setup,
take minutes. In contrast, running the Elixir formatter on a large project I have laying around takes about 3 seconds (and the Elixir formatter is not in the
group of fastest tools since it spins up a BEAM VM). That's multiple orders of magnitude of difference in terms of feedback loop.

### What to do instead

CI pipelines are not the only tool we have to ensure that our project is well-formatted. `git` has supported hooks for an eternity. There are tools like
pre-commit or husky to make setting them up easier. So, what happens if we move our formatting check to a `pre-commit` hook?

- Opening the commit message editor takes a little longer when running `git commit`, since it will run the formatter before opening your editor. This means
  that there is a small slowdown when creating commits, **even for commits that are well-formatted**.
- In the case that you forgot to run the formatter, it will tell you before creating the commit, so you can run the formatter **before** committing.
- There is no more `format` commits in your history.

The first two points are an obvious trade-off you can make. If your commit history does not have a single `format` in there, I applaud your discipline. If you
are like me and every pull request has at least one of them, it's probably a good balance to check in the `pre-commit` stage.

## Ignoring performance and a strict requirement on running pipelines

CI pipelines run **a lot**. I'm on a small team, and there's barely any time of the day where there isn't anything running. Our pipelines are also egregiously
slow and required. This has a ton of drawbacks, the two main ones for me being:

- Deploying a hotfix takes an eternity. Found a typo somewhere that apparently wasn't covered by a test? Something missed during a review? It happens, and
  that's okay. Our tools should empower us to quickly dish out a fix so the impact on customers is restricted to a short time-frame. Once you have the
  combination of required and slow pipelines, the impact increases massively.
- Engineers have to context switch. Or, well, take a lot of coffee breaks. The disadvantage of switching between different things is well-known. My tiny pull
  request taking 20 minutes to run tests means that I will have 20 minutes of downtime before I can continue working on it, fix tests or merge it. That sounds
  like a good amount of time that I don't want to just be sitting around, but also not enough to get into focus on a different ticket to work on.

The first point has an easy fix: allow an engineer to veto the requirement of a pipeline run. It should not be abused in a way that quality suffers, but in
some cases it can actually **increase** quality since we are delivering a fix faster. We should also be able to trust ourselves to use such an option wisely.  
Performance is a more difficult topic, as there are so many different reasons a pipeline might be slow, but paying close attention to caching is probably worth
it. The main takeaway I have for this point is that investing significant time on improving this is almost always worth it. Count how many pipelines your
engineers are running per week, then multiply the time they spend waiting on them with their salary and remember this beautiful [xkcd](https://xkcd.com/1205/).
