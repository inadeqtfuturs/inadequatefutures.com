---
title: 'blog relaunch'
author: 'alex christie'
date: '2019-01-02T10:59:05-06:00'
type: 'code'
tags: ['coding', 'gatsby', 'javascript', 'frontend']
excerpt: 'relaunching the blog'
draft: false
---

My personal website, *inadequate futures*, has been rewritten a total of three times. I was inspired to pick html and css back up after learning about static site generators, specifically [Jekyll](https://jekyllrb.com/), after reading about [Alex Gil's 'Ed' theme](https://elotroalex.github.io/ed/about/) for minimal editions (I am in the process of porting this over to Gatsby. More on that at the end of this post). The first version of the site was launched about a year ago on GitHub pages with the help of [Hugo](https://gohugo.io/), which quickly shifted my focus from building *my* website back towards the world of frontend development. Not long after launching '[if-ver01](https://inadeqtfuturs.github.io/),' I started reading about the JAMStack and React, which offered what seemed like a robust alternative for turning markdown files into blog posts.

For the second version of the site, I moved to [Gatsby](https://www.gatsbyjs.org/), which I chose after looking around for other blogging frameworks built on Javascript. I liked Gatsby because it remained atomistic and modular (things that initially attracted me to Hugo), but also because it was built on React, providing the opportunity to learn one of the major javascript frameworks. Having worked with Gatsby for the past year, I think it offers some great features for anyone developing for the modern web:

### JAMStack and Modern JS Technology

The [JAMStack](https://jamstack.org/) undergirds much contemporary frontend web development. By leveraging javascript, APIs, and markdown, static site generators are able to deploy lightweight and fast websites without much data overhead. Gatsby, in my experience, offers the best modern JAMStack experience out of the box with prefetched links, page caching, and a pre-installed service worker. By prefetching content (i.e. rendering pages before you've even clicked on the links), Gatsby offers a fast and smooth navigation experience. Additionally, between the client side rendering and pre-installed service worker, users nearly always have access to a minimum-viable version of the website.

This is all to say that Gatsby helps developers build simple progressive web apps out-of-the-box. A [progressive web app](https://developers.google.com/web/progressive-web-apps/) functions on your smart phone or tablet like any other app--you can add it to your homescreen, it's fully immersive, and you can use it on- or offline. For my blog, and for future projects, it was important for me to develop for mobile and the modern web. Gatsby solved many of the problems I was having trying to implement many of these technologies with other static site generators.

### Easy to Set Up // Easy to (Re)Use

Gatsby has some of the best documentation for learning a completely new stack, teaching developers a variety of technologies along the way. I began working with Gatsby with little to no formal javascript experience. However, getting up and running was anything but daunting. Not only does the [tutorial](https://www.gatsbyjs.org/tutorial/) walk you through everything you need to start building a simple blog, it also introduces users to Gatsby's layout logic, GraphQL, and Google's Lighthouse audit.

Installation is as easy as running a handful of commands in terminal, but what I really like about Gatsby is the reusability of components and project structure. Because the frontend is largely data agnostic--GraphQL will give you whatever data you ask it for and then you simply pass it into [jsx](https://reactjs.org/docs/introducing-jsx.html)--users are able to reuse, refactor, and upgrade components to fit whatever particular use case they're working on. Updating *inadequate futures* was as easy as starting a new Gatsby project, dropping my content into the project root, and utilizing some existing components to get up and running.

### GraphQL and the Mesh

Gatsby utilizes [GraphQL](https://graphql.org/) to fetch data. Prior to working with Gatsby, I had never used a query language before. Returning to work on a few WordPress projects over the past six months, I can't quite imagine frontend development *without* GraphQL. Whereas WordPress offers a largely 'what you see is what you get' editing experience, GraphQL and Gatsby's frontend are  uncoupled. This means that you can query whatever information you might need from a markdown file, and inject it wherever you want it on the front end.

As a really simple example, here's a simplified snippet for querying individual blog posts:

```js
markdownRemark(fields: { slug: { eq: $slug } }) {
  html
  excerpt(format: PLAIN)
  frontmatter {
    title
    author
    date(formatString: "MMMM DD, YYYY")
  }
}
```

Here, I'm just asking GraphQL to give me the body of the markdown file, a plaintext formated version of the body to pass into an SEO component, and I get some basic information from the frontmatter, including a formatted date string. I then pass this into various post and excerpt components, allowing me to display the data using html and css:

```js
<h2 dangerouslySetInnerHTML={{ __html: title}} />
<p><i>{date} by {author}</i></p>
<div>
  { ... }
  <p dangerouslySetInnerHTML={{ __html: html }} />
</div>
```

While I'm only querying my own markdown files, GraphQL *can* be used with other content management systems, including WordPress, Drupal, and others. This means that you can utilize Gatsby with existing projects even if they're already tied to a CMS. In the future, I'd be interested experimenting with this approach, allowing for editors and developers to work in tandem without committing wholesale to something like WordPress.

### What's Next

I rewrote *inadequate futures* to integrate some of the lessons I learned about javascript, react, and component composition over the past year or so. I'm currently at work putting this knowledge into practice by porting the [Jekyll theme Ed](https://elotroalex.github.io/ed/) over to Gatsby with the sense that editors would be interested in integrating some of the above advantages of the modern JAMStack into their minimal editions and other humanities projects. I see this as an effort to contribute to both digital humanistic inquiry and add to the growing number of Gatsby starters.

I made this section of the website to start documenting some of my experiences with Gatsby, React, and web development. If you'd like to talk about static site generators, Gatsby, or [my research](https://www.inadequatefutures.com), don't hesitate to reach out on [twitter](https://twitter.com/inadeqt_futurs) or via email (alexj [dot] christie [at] gmail [dot] com).