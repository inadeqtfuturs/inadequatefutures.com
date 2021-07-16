import React from 'react';
import PropTypes from 'prop-types';
import PostPage from '@components/PostPage';
import { getPaths, getPageProps } from '@mdx';

import SEO from '@components/SEO';

function Slug({ mdx, ...pageNode }) {
  const { frontmatter: { title, excerpt } } = pageNode;
  return (
    <>
      <SEO title={title} description={excerpt} />
      <PostPage content={mdx} node={pageNode} />
    </>
  );
}

Slug.propTypes = {
  mdx: PropTypes.object.isRequired
};

export async function getStaticProps({ params: { slug } }) {
  const props = await getPageProps(slug);

  return {
    props
  };
}

export async function getStaticPaths() {
  const paths = await getPaths();
  
  return {
    paths,
    fallback: false
  };
}

export default Slug;
