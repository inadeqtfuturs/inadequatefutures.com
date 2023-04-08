---
title: 'building tag pages with nextjs'
author: 'alex christie'
date: '2020-09-06T11:06:07-06:00'
type: 'garden'
tags: ['nextjs', 'getStaticPaths', 'digital garden', 'getStaticProps']
excerpt: 'using nextjs ssr to make static tag pages'
draft: false
---

High level overview for making index pages for each tag in your mdx/nextjs blog.

0. setup/assumptions

We'll use [`getStaticPaths` and `getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) to statically generate the tag pages. If a tag exists, we'll have a route like `site.com/tags/${tag}`. To do this, we'll set up a 'tag' folder with a `[slug].js` file in the pages folder.

I'm assuming that you already have tags in your frontmatter, and that you have some way of getting an array/list of all your posts. I highly recommend taking a look at [mdnext's utility file](https://github.com/domitriusclark/mdnext-blog/blob/master/src/utils/get-mdx-content.js) and this function in [next.js's blog example](https://github.com/vercel/next.js/blob/canary/examples/blog-starter/lib/api.js). Also worth taking a look at [`next-mdx-remote`](https://github.com/hashicorp/next-mdx-remote#example-usage) both as an example and as because it's an excellent library for doing this.

1. get all posts

We need to get all our tags to generate a list of paths. We can do this in the `getStaticPaths` portion of the `[slug].js` file.

```js

export async function getStaticPaths() {
  const posts = await getAllPosts(directory);
}

```

2. accrete all tags

Next, we'll reduce those tags into a single array of strings.

```js
export async function getStaticPaths() {
  const posts = await getAllPosts(directory);
  const blogTags = posts.reduce((acc, { frontMatter: { tags } }) => {
    const newTags = tags.reduce((newAcc, tag) => {
      if (acc.includes(tag)) {
        return newAcc;
      }
      return [...newAcc, tag];
    }, []);
    return [...acc, ...newTags];
  }, []);
  const paths = blogTags.map(tag => ({
    params: {
      slug: tag
    }
  }));
}
```

Here, we're using a nested reducer -- for each array of tags in a post, we check if that tag exists in the accumulator for the `blogTags`. If it's already in there, like if another post already had that tag, we skip it, otherwise, we toss it into an array called `newTags` that we can spread into the `blogTags` acc. I like doing this rather than using a `forEach` and `push` because it's immutable.

3. use those tags to form pages

Now that we have an array of tags, we pass them as our paths parameter to the return value.

``` javascript
export async function getStaticPaths() {
  const posts = await getAllPosts(directory);
  const blogTags = posts.reduce((acc, { frontMatter: { tags } }) => {
    const newTags = tags.reduce((newAcc, tag) => {
      if (acc.includes(tag)) {
        return newAcc;
      }
      return [...newAcc, tag];
    }, []);
    return [...acc, ...newTags];
  }, []);
  const paths = blogTags.map(tag => ({
    params: {
      slug: tag
    }
  }));

  return {
    paths,
    fallback: false
  };
}
```

4. get posts associated with tag for each page

For each tag pages, we want to grab the associated blog posts. So we're grabbing all our posts and filtering to see which posts' tags include whatever the slug is.

```js
export async function getStaticProps({ params: { slug } }) {
  const posts = await getAllPosts(directory);
  const blogPosts = posts.filter(post => post.frontMatter.tags.includes(slug));

  if (!blogPosts) {
    console.warn(`No content found for tag ${slug}`);
  }

  return {
    props: {
      posts: blogPosts,
      tag: slug
    }
  };
}
```

We're returning the associated blog posts and the given tag. We can then doing something like this:

```js
export default function TagIndex({ posts, tag }) {
  return (
    <Layout>
      <h2>posts tagged {tag}</h2>
      {posts.map(post => (
        <Excerpt post={post} key={post.slug} />
      ))}
    </Layout>
  );
}
```
