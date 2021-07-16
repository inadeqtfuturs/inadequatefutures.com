---
title: 'garden webpack plugin (or, bidirectional linking)'
author: 'alex christie'
date: '2020-09-06T11:06:07-06:00'
type: 'garden'
tags: ['nextjs', 'webpack', 'webpack plugin', 'getStaticProps']
excerpt: 'documenting process of creating webpack plugin'
draft: true
---

`getStaticProps` is really great at generating pages from static data, but I also need some way to track relations between static files. If Post A mentions Post B, I want to display that relation on Post B. While this *could* happen in the `getStaticProps` function, it doesn't make sense to run through the whole file system to surface that relation. Instead, I want to generate a static map at build time and just reference that.

### initial implementation

1. get all `.mdx` files
2. parse and get array of all links
3. map garden

```js
garden = [
  {
    post: ${postTitle},
    id: uuid,
    order: ${postDate}, // ordered chronologically
    mentions: [] // array of links
  }
]
```

4. map back over `garden` to insert `mentionedIn` array

```js
garden = [
  {
    ...postInfo,
    mentionedIn: [] // array of posts that mention this post
  }
]
```

5. export garden as a static file so it's available to `getStaticProps`

### writing plugin

