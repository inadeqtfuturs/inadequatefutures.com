import { DateTime } from 'luxon';

import { createUtils } from 'next-mdx-relations';

// eslint-disable-next-line import/no-extraneous-dependencies
import markdownLinkExtractor from 'markdown-link-extractor';
import rehypePrettyCode from 'rehype-pretty-code';

// plugins
/* import rehypeHighlightCode from './plugins/rehype-highlight-code'; */
/* import rehypeMetaAttribute from './plugins/rehype-meta-attribute'; */
import { options } from './plugins/rehype-pretty-options';

function getNodeInfo(node) {
  if (node?.frontmatter?.type === 'code' || node?.frontmatter?.type === 'garden') {
    return {
      title: node?.frontmatter?.title,
      slug: node?.params?.slug
    };
  }
  return null;
}

export const {
  getPaths,
  getPages,
  getPageProps,
  getPathsByProp
} = createUtils({
  content: '/content',
  slugRewrites: {
    blog: 'garden'
  },
  sort: {
    by: 'meta.rawDate',
    order: 'desc'
  },
  relationGenerators: {
    directionalLinks: nodes => {
      const sortedNodes = nodes
        .sort((a, b) => a?.meta?.rawDate - b?.meta?.rawDate)
        .map((node, index, array) => {
          const prev = index > 0 ? array[index - 1] : null;
          const next = index < array.length - 1 ? array[index + 1] : null;
          return {
            ...node,
            frontmatter: {
              ...node.frontmatter,
              prev: getNodeInfo(prev),
              next: getNodeInfo(next)
            }
          };
        });
      return sortedNodes;
    },
    mentionedIn: nodes => nodes.map((node) => ({
      ...node,
      meta: {
        ...node.meta,
        mentionedIn: nodes.filter(
          n => n.meta?.mentions.includes(`/${node.params.slug.join('/')}`))
      }
    }))
  },
  // page level
  metaGenerators: {
    date: node => {
      const { frontmatter: { date } } = node;
      if (date) {
        const isoDate = DateTime.fromISO(date);
        return isoDate.toLocaleString(DateTime.DATE_FULL);
      }
      return null;
    },
    rawDate: node => {
      const { frontmatter: { date } } = node;
      if (date) {
        return DateTime.fromISO(date).toMillis();
      }
      return null;
    },
    mentions: node => markdownLinkExtractor(node.content).filter(l => l[0] === '/')
  },
  mdxOptions: {
    rehypePlugins: [
      [rehypePrettyCode, options]
      /* rehypeHighlightCode, */
      /* rehypeMetaAttribute */
    ]
  }
});
