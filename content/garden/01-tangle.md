---
title: 'tangle'
author: 'alex christie'
date: '2020-05-25T15:40:04-06:00'
type: 'garden'
tags: ['nextjs', 'styled system', 'theme-ui', 'component library', 'monorepo', 'full stack']
excerpt: 'This is the first in a series of posts documenting tangle, a fullstack monorepo'
draft: false
---

This is the first in a series of posts documenting tangle, a fullstack monorepo that utilizes next.js and styled-system on the front end, with a graphql backend. The purpose of these posts is to, on the one hand, document the technical foundations of the repo and, on the other, act as an opening for thinking about the project more generally. Towards this end, I've split this post into two sections -- technical and theoretical.

### technical

tangle is an attempt to build a full stack monorepo boilerplate for quickly spinning up web apps. It's also an attempt to learn a bit more about full stack development -- I have a sense of how I want the codebase to work, but the solutions and integrations are not completely obvious from the outset. I do know that I want a few things:

- lerna monorepo to share code between projects
- shared tooling (eslint, prettier, jest, storybook)
- component library built on top of styled components and styled system
- web/front end built on next.js
- server/back end built on an apollo or express graphql server
- alternatively, serverless functions
- easy deployed to heroku/netlify/now

The directory structure is as follows:

``` bash
├── babel.config.js
├── lerna.json
├── package.json
├── packages
│   ├── api
│   ├── components
│   └── web
└── yarn.lock
```

Some of the motivating factors:

1. I find it easier to work in a codebase that's been bootstrap than bootstrapping the same project over and over. I want the ability to dive immediately into the code rather than fret over setup.
1. Because I'm pretty much only writing JS, shared tooling makes the most sense -- again: set and forget.
1. Splitting the frontend into a component library and web project allows the component library to grow organically (more in theoretical section) and isolates the dependencies the web project needs to deal with.
1. Additionally, splitting things up with way will eventually allow me to deploy just an api, or just a frontend app, or pull in just the component library.
1. Serverless functions are what I'd like to build into this, but there's some weirdness with where those functions should reside.
1. Someone else should be able to pick this up and deploy it eventually, so ideally it's easily deployed everywhere.

For MVP, I want to deploy the repo to Netlify, render a component from the component library, and display information by making a call to the server. This initial build (v 0.1.0) will also document the steps made to structure the codebase (i.e. an edited version of what I'll be doing here).

### theoretical

'Tangle' is a noun and a verb. To tangle is a process of becoming entangled; a tangle is the result. But tangles always seem to be tangling and untangling, retaining their tangliness in the process, until they become untangled, which is a wholesale different entity or status. In this way, a tangle is more than the sum of its parts or, at least, differs from the sum of its parts. We should also think about this in terms of entanglement, or the process through which not mutually exclusive objects or entities become somehow different in their interactions among one another (see Barad or Haraway on 'intra-activity'). A blunt and mundane example is the frontend's intra-action with a server or function or service -- they become different: an app, the exposure of data.

tangle, the project, takes these ideas as foundational in an anti-foundational way. I cannot know in advance what tangle will need or become, instead, I'm interested in allowing tangle to grow itself out as needed. Having a minimal, bootstrapped project allows for easy and speedy development that doesn't assume everything a developer would need. As something coalesces into a feature, it can become part of that boilerplate, or a more permanent part of the tangling. Yet, this is also an anti-foundational stance that refuses mastery -- of a set of practices or tool(ing)s -- in favor of humility and learning. tangle attempts to refuse assumption in an effort never to fully congeal. Instead, it'll just tangle on.

What I'm trying to outline here is a way of thinking about development and boilerplates less as full stop solutions to discrete problems than as process driven projects. In time, I want to think about what it would mean to take this stance further beyond the immediate realm of development (as coding or making a thing) into development as a set of relational practices among myriad people, technologies, and social forces.
