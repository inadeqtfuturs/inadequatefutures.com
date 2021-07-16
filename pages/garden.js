import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@stitches';
import { getPages } from '@mdx';

import PostExcerpt from '@components/PostExcerpt';

import SEO from '@components/SEO';

const PostsWrapper = styled('div', {
  display: 'grid',
  gap: '$8',
  margin: '$8 0',
});

function Garden({ posts }) {
  return (
    <>
      <SEO title="garden" description="if - digital garden" />
      <h1>garden</h1>
      <PostsWrapper>
        {posts.map(post =>
          <PostExcerpt post={post} key={post?.meta?.rawDate} />
        )}
      </PostsWrapper>
    </>
  );
}

Garden.propTypes = {
  posts: PropTypes.array
};

Garden.defaultProps = {
  posts: []
};

export async function getStaticProps() {
  const posts = await getPages({ frontmatter: { draft: null, type: ['garden', 'code'] } });

  return {
    props: {
      posts
    }
  };
}

export default Garden;
