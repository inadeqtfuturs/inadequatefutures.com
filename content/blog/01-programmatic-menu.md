---
title: 'programmatic menus in Gatsby'
author: 'alex christie'
date: '2019-01-20T12:49:34-06:00'
type: 'code'
tags: ['gatsby', 'coding', 'react', 'menu', 'navigation']
excerpt: 'creating a menu component that consumes a configuration object'
draft: false
---
Programmatically generating menus is a difficult concept at first because it seems simple enough just to hard code your menu into a component. However, making a reusable and data agnostic menu component is really easy and can travel with you from project to project. Here, I want to outline two approaches to generating menus from your data. The first involves defining menu items in markdown frontmatter, which can be useful when designing sites for folks less familiar with javascript or coding more generally. The second is an iteration on the current Gatsby documentation that skips using GraphQL fragments in favor of a meta config file.

### Markdown Frontmatter

I'm currently working on a Gatsby site template designed specifically for folks with minimal, if any, javascript knowledge. With these users in mind, I'm trying to define most things through really basic global variables in `gatsby-config.js` and frontmatter. I think performing tasks by querying markdown frontmatter can simplify user experience immensely, especially if users are given clear guidelines and a fairly robust set of options.

I wanted users to be able to define their menu from frontmatter for a few reasons:

- It's fairly semantic. Users don't need to write out objects or arrays to get some nice menus.
- Users can distinguish between pages, posts, and pages that should be menu items from the markdown file itself.
- Users don't have to think about slugs because `gatsby-node.js` programmatically generates them. So there's never a time where a slug changes and your menu doesn't reflect that change.  

That being said, this method surely has some downsides:

- Menu is no longer centralized -- you have to go to different files to edit and reorder the menu.
- It's arguable whether this is a major upgrade from just defining a menu in `gatsby-node.js`, especially if users are already defining *other* site data there.
- Implementing sub menus this way is going to be difficult.

With these things in mind, let's take a look at some example frontmatter:

``` markdown
---
title: 'hi.'
author: 'ed.'
date: 2018-12-29T10:52:33-6:00
type: 'page'
menuItem: 1
menuTitle: 'home'
draft: true
---
```

The important things here are just that I've defined a menuItem to position the item in the menu, and I have a label or menuTitle for the item in case I want the title and what shows up in the menu to be different.

Here's our menu component:

```javascript
import React from 'react';
import { Link } from 'gatsby';
import { graphql, StaticQuery } from 'gatsby';

export default (props) => (
  <StaticQuery
    query={graphql`
      query MenuQuery {
        allMarkdownRemark(
          filter: { frontmatter: { type: { eq: "page" } } },
          sort: {fields: [frontmatter___menuItem], order: ASC},
        ) {
          edges {
            node {
              frontmatter {
                menuTitle
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => {
      const items = data.allMarkdownRemark.edges
      return (
        <nav>
          {items.map(({node}) => {
            const { frontmatter: { menuTitle }, fields:{ slug }, } = node;

            return (
              <Link
                to={slug}
                activeClassName={'active'}
                key={menuTitle}>
                {menuTitle}
              </Link>
            )
          })}
        </nav>
      );
    }}
  />
)
```

StaticQuery is doing the majority of the heavy lifting here. We're filtering all of our markdown files for anything that's listed as a 'page,' and then ordering them by `frontmatter.menuItem`. Any page that doesn't define a menuItem in its frontmatter is excluded from the search. This query also exposes the `menuTitle` and `slug`, so all that's left to do is map our object into Link. What we're left with is a set of easily styled list items nester in `nav` tag.

If you're looking for a simple way to generate single level menus, this is a really great way to go. But what if you're looking for something a little more robust, specifically with nested sub-menus?

### Meta Config File

The approach I ended up taking was siloing metadata about the site into a siteConfig file. Here, I define some site wide settings, and map out my menu. While this can be done in `gatsby-config.js` (and Gatsby docs even offer this as a solution for [mapping programmatic menus](https://www.gatsbyjs.org/docs/centralizing-your-sites-navigation/)), I decided to forego writing another GraphQL fragment of just use an object with some arrays. So the main difference and benefit here is just slimmer syntax at the cost of passing the object through the top level layout component.

There are two parts of this setup: the `siteConfig.js` file, and the menu components. I keep my siteConfig in `content/meta`, though it could be stored anywhere. Here, I define my menu with a series of objects listing the item label, and the page we're navigating to. Additionally, I wanted to be able to define sub-menu items, so I giving 'teaching' a subItems array with objects that are constructed the same way as the top-level objects:

``` javascript
const menu = [
  { label: 'home', to: '/' },
  { label: 'about', to: '/about' },
  { label: 'teaching', to: '/teaching', subItems: [
    { label: 'teaching philosophy', to: '/teaching' },
    { label: 'course descriptions', to: '/classes' },
  ]},
  { label: 'cv', to: '/cv' },
  { label: 'code', to: '/code' },
]

...

module.exports = {
  menu: menu,
  ...
}
```

The final bit of code here is just exporting a bunch of arrays from `siteConfig.js`, but we're just looking at menu for now.

The second part is my `menu.js` and `menuItem.js` component. `menu.js` simply maps the array into the `menuItem.js` component. This is where we use the arrays to define and programmatically generate out menu:

``` javascript
import React from 'react';
import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const MenuItem = ({ item }) => {
  const { label, to, subItems } = item;

  return (
      subItems
        ? (
          <li key={label}>
            <Link to={to}>
              {label} <FontAwesomeIcon icon={['fas', 'angle-down']} size='sm' />
            </Link>
            <ul>
              {subItems.map((subItem) => {
                const { label, to } = subItem;

                return (
                  <li key={label}><Link to={to}>{label}</Link></li>
                )
              })}
            </ul>
          </li> )
        : ( <li key={label}><Link to={to}>{label}</Link></li> )
  )
};

export default MenuItem;
```

So, what's happening here?

- We're deconstructing the item so we can use 'label', 'to', and check for subItems.
- We then use a [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to differentiate arrays that do and do not have 'subItems'.
- If one does, we map the 'label' and 'to' properties to a list item and Link tag, respectively. We also add an 'angle-down' icon to signify that the link has a dropdown menu.
- Then, we map the subItems in similar fashion, iterating over the subItem object.
- The second half of the ternary just gives us a standard Link nested in a list item.

I like this approach because it gives us the separation of concerns that Gatsby's documentation recommends without having to write a static GraphQL query. Additionally, the example above should give you an idea of how to start working with sub-menus, which is absent in the current Gatsby documentation. Check out [my Github](https://github.com/inadeqtfuturs/if/blob/master/src/components/styles/menu.js) for styling.

### Wrap Up

I hope these two models of dealing with menus provide useful examples for folks working on their own Gatsby projects. In future iterations of these menu designs, I'd like to work on rendering a collapsible (hamburger) menu for mobile.
