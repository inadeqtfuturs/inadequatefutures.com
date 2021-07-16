---
title: 'markdown, dynamic routes, next.js'
author: 'alex christie'
date: '2020-11-08T14:32:50-06:00'
type: 'code'
tags: ['markdown', 'garden', 'nextjs']
excerpt: 'dynamic and catch-all routing in nextjs'
draft: false
---
I'm currently building out a new digital garden over at [digital-garden.dev](https://digital-garden.dev) and writing about the process. The foundations are [next.js](https://nextjs.org/) and [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote), and I'm using them to generate static pages on build. This is a brief overview for working with dynamic routes and static generation in next.js.

### generating static pages

There are two important functions we use to generate static routes at build time with next.js. The first is `getStaticProps()`, which fetches data at build time and generates a page based on that data. The other is `getStaticPaths()`, which returns an array of paths that next.js will statically pre-render. While you can use `getStaticProps()` alone, it's helpful to see these working in tandem with one another. We generate a list of paths using `getStaticPaths` and pass that array to `getStaticProps`, which will process or fetch the data we need and generate the pages. We can also think about this in terms of file structure:

``` js
/posts
│   post-01.mdx
│   post-02.mdx
/pages
│   _app.js
│   _document.js
│   index.js
└───/posts
    │  [slug].js
```

In the file `/posts/[slug].js` (this path will become important later), we'll export `getStaticPaths`, pointing it at the `/posts` directory, getting a list of all the file paths we want to render. We'll additionally export `getStaticProps`, which will generate paths and pages for our mdx files at `/posts/post-01` and `/posts/post-02`. The `[slug].js` file can catch any mdx file in the `/posts` directory and generate a path and page for that mdx file. All the pages we generate will have a prefix of `/posts` because that's where the `[slug].js` file lives. We could similarly have `/notes/[slug].js` and generate pages with `/notes` as the path prefix.

### getStaticPaths // getStaticProps

Using our example repo, we can export a function called `getStaticProps` that looks like this:

``` js
import { promises as fs } from 'fs';
import path from 'path';
import glob from 'fast-glob';

...

const content = './posts';

export async function getStaticPaths() {
  // 1. define where the content is
  const contentGlob = `${source}/**/*.mdx`;
  // 2. get a list of files
  const files = glob.sync(contentGlob);
  // 3. if there are no files, return an empty array
  if (!files.length) return [];

  // see below
  const paths = await Promise.all(
    files.map(async filepath => {
      const slug = filepath
        .replace(/^.*[\\\/]/, '')
        .replace(new RegExp(`${path.extname(filepath)}$`), '');
      return { params: { slug } };
    });
  );

  return {
    paths,
    fallback: false
  };
}
```

This function allows us to define where our content is and get a list of markdown files. We then map over the array of files, getting the file name without the extension (`path.extname(filepath)`) to use as our slug. However, because `getStaticProps` is expecting an array of objects that contain a `params` key, we need to return an array of objects rather than just a list of paths. `paths` ends up looking like this:

```js
paths = [
  { params: { slug: 'post-01' } },
  { params: { slug: 'post-02' } }
]
```

Now that we have the paths, we need to generate the pages. We'll export `getStaticProps`, which takes our paths as an argument:

``` js
import renderToString from 'next-mdx-remote/render-to-string';
import matter from 'gray-matter';

...

export async function getStaticProps({ params: { slug } }) {
  const contentGlob = `${source}/**/*.mdx`;
  const files = glob.sync(contentGlob);
  if (!files.length) return [];

  const posts = await Promise.all(
    files.map(async filepath => {
      const fileSlug = filepath
        .replace(/^.*[\\\/]/, '')
        .replace(new RegExp(`${path.extname(filepath)}$`), '');
      // 1. read the file
      const mdxSource = await fs.readFile(filepath);
      // 2. use `matter()` to return the content and the frontmatter (data)
      const { content, data } = matter(mdxSource);
      // 3. render the mdx to string
      const mdx = await renderToString(content, {
        // we're not passing any custom components
        // see https://github.com/hashicorp/next-mdx-remote
        components: null,
        scope: data
      });

      return {
        slug: fileSlug,
        mdx,
        frontMatter: { ...data }
      }
    })
  );

  // make sure the path you hit actually has a post
  const [blogPost] = posts.filter(post => post.slug === slug);
  if (!blogPost) {
    // eslint-disable-next-line no-console
    console.warn(`No content found for slug ${slug}`);
  }

  return {
    props: {
      mdxSource: blogPost.mdx,
      frontMatter: blogPost.frontMatter
    }
  };
}
```

The first bits of code should look very similar. We're grabbing all of our content and generating slugs again. The difference here is we're also *reading* the file, getting both the frontmatter and the content of the post. The rest of the function just makes sure that when you hit a given path a post actually exists there. It returns what you'd need to render a post -- the source or content, and the frontmatter.

This is a really basic example of what you can do with static generation in next.js. But I also suspect a lot of folks will end up working with it to make static blogs, so hopefully this is helpful boilerplate.

### dynamic routes

In working on [garden](digital-garden.dev), I wanted to take dynamic routes a step further and allow for dynamic path prefixes based on where content lived. Let's return to the content directory example:

``` js
/content
└───/posts
    |   post-01.mdx
    |   post-02.mdx
└───/notes
    |   note-01.mdx
    |   note-02.mdx
```

Instead of a flat `/posts` directory, I now have a nested content directory. I want to be able to generate paths for my posts and notes based on their file path. A few ways you could do this.

1. In addition to `posts/[slug].js`, add an additional `notes/[slug].js` to catch the notes. The major downside here is just code repetition. It also requires adding a new directory to `/pages` every time there's a new kind of content.
2. Use a catch all route, so something like `[...slug].js` at the root of pages. This can end up being a bit mess as you get deeply nested routes (though it's something I'm thinking about now).

The solution I came up with is to have a catch all file at `/[path]/[slug].js` that generates paths that are one level deep (think the posts, notes, etc model) and keeps the slug logic intact. 

The first thing to do is update the `getStaticPaths()` function to return an array of objects with the shape `{ slugPath, slug }`. We'll also update `source` to be an array of strings that point to where our mdx files live.

```js
const contentSource = ['content/garden', 'content/note'];

export async function getStaticPaths() {
  const files = contentSource.reduce((acc, src) => {
    // using process.cwd() based on next.js documentation
    // https://nextjs.org/docs/basic-features/data-fetching#reading-files-use-processcwd
    const contentGlob = `${path.join(process.cwd(), src)}/**/*.mdx`;
    const files = glob.sync(contentGlob);
    return [...acc, ...files]
  }, [])

  if (!files.length) return [];

  const paths = await Promise.all(
    files.map(async filepath => {
      // get file name and use as slug
      const slug = filepath
        .replace(/^.*[\\\/]/, '')
        .replace(new RegExp(`${path.extname(filepath)}$`), '');
      // get parent folder and use as slugPath
      const slugPath = path.dirname(filepath).replace(/^.*[\\\/]/, '');

      return { params: { path: slugPath, slug } };
    })
  )

  return {
    paths,
    fallback: false
  };
}
```

Using a reducer instead of a map, we end up with something like this:

```js
paths = [
  { params: { path: 'posts', slug: 'post-01' } },
  { params: { path: 'posts', slug: 'post-02' } },
  { params: { path: 'notes', slug: 'note-01' } },
  { params: { path: 'notes', slug: 'note-02' } }
]
```

This is not radically different than the initial example. Notice that we're just grabbing the parental directory name and passing that in as one of our params. Also notice that in the param object, we have two keys -- path and slug -- which correspond to our folder structure. `getStaticPaths` is going to expect these two keys to be in each `params` object, and we should update the `getStaticProps` to check for them:

``` js
export async function getStaticProps({ params: { path, slug } }) {
  ...
  const posts = await Promise.all(
    files.map(async filepath => {
      const slug = filepath
        .replace(/^.*[\\\/]/, '')
        .replace(new RegExp(`${path.extname(filepath)}$`), '');
      // get parent folder and use as slugPath
      const slugPath = path.dirname(filepath).replace(/^.*[\\\/]/, '');

      ...

      return {
        slug: `/${slugPath}/${slug}`,
        mdx,
        frontMatter: { ...data }
      }
    })
  );

  // make sure the path you hit actually has a post
  const [blogPost] = posts.filter(post => post.slug === `/${slugPath}/${slug}`);
  if (!blogPost) {
    // eslint-disable-next-line no-console
    console.warn(`No content found for slug /${slugPath}/${slug}`);
  }
}
```

A small update, but we're making sure we get the correct content.

### wrapping up and future thinking

There's surely room for improvement here: a better way to handle slugs, perhaps a different way to catch routes (especially if we want deeper nested routes). However, if you need to spin up something quickly, this might be a good way for thinking about it.

### further reading

- [garden](https://github.com/inadeqtfuturs/garden)
- [mdnext](https://github.com/domitriusclark/mdnext/)
- [next.js](https://nextjs.org/)
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
