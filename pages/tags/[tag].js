import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@stitches';
import { getPages, getPathsByProp } from '@mdx';

import PostExcerpt from '@components/PostExcerpt';

const PostsWrapper = styled('div', {
  display: 'grid',
  gap: '$8',
  margin: '$8 0',
});

function Tag({ tag, posts }) {
  if (posts.length < 1) {
    return (
      <>
        <h1>we couldn't find anything tagged with '{tag}'</h1>
      </>
    );
  }

  return (
    <>
      <h1>{tag}</h1>
      <PostsWrapper>
        {posts.map(post =>
          <PostExcerpt post={post} key={post?.meta?.rawDate} />
        )}
      </PostsWrapper>
    </>
  );
}

Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  posts: PropTypes.array
};

Tag.defaultProps = {
  posts: []
};

export async function getStaticProps({ params: { tag } }) {
  const tagNoDash = tag.replace('-', ' ');
  const posts = await getPages({
    frontmatter: { draft: null, tags: tag }
  });
  const postsNoDash = await getPages({
    frontmatter: { draft: null, tags: tagNoDash }
  });

  const allPosts = [...posts, ...postsNoDash];

  const uniquePosts = Array.from(new Set(allPosts.map(a => a?.meta?.rawDate)))
    .map(d => allPosts.find(p => p?.meta?.rawDate === d));

  return {
    props: {
      tag,
      posts: uniquePosts
    }
  };
};

export async function getStaticPaths() {
  const paths = await getPathsByProp('frontmatter.tags');
  const test = paths.map(p => ({ params: { tag: p } }));

  return {
    paths: test,
    fallback: 'blocking'
  };
}

export default Tag;
