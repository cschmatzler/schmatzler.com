---
draft: true
title: Tooling is everything
date: 2024-01-10
description: |
  I'm frustrated, and probably turning my back on Elixir.
---

I love Elixir. I really do. I'm also _really_ frustrated with its tooling (or lack thereof).

After dabbling with Rust and TypeScript/React working on a [side
project](https://github.com/leuchtturm-io/leuchtturm), I am so amazed by their tooling that opening an Elixir
file in my editor and debugging an issue feels like I am trying to torture myself.

## The state of Elixir tooling

The go-to language server for Elixir is [elixir-ls](https://github.com/elixir-lsp/elixir-ls), which also comes
with Debug Adapter Protocol support. Then, up and coming are also
[lexical](https://github.com/lexical-lsp/lexical) and [next-ls](https://github.com/elixir-tools/next-ls),
although both are not ready for production usage yet. For linting, there's
[credo](https://github.com/rrrene/credo), which has a ton of rules but no ability to fix any of them
automatically, and [styler](https://github.com/adobe/elixir-styler), which re-implements a subset of credo's
rules with the ability to automatically rewrite them.

Well, let's start with the language server problem:  
elixir-ls sucks. It does not have code actions. At all. Unknown symbol? Well, import it yourself. Unused
alias? Well, delete it yourself. Rename a symbol? Search and replace, what else? Workspace symbol search? Huh,
never heard of it.  
Aliasing a symbol _might_ work while auto-completing, but the language server might also put it anywhere in
the file instead of at the start where it belongs. Having not one, but two new projects created to replace it
is no surprise, but neither of them are far enough with development that they are usable at this point.

{% admonition title="foo" %}
bar
{% /admonition %}
