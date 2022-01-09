import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import PropTypes from 'prop-types';
import { styled } from '@stitches';
import MDXComponents from '@components/MDXComponents';

const PostHeader = styled('div', {
  marginBottom: '$4',
  borderBottom: '1px solid $text'
});

const PostWrapper = styled('div', {
  'a:hover, a:focus': {
    background: '$green300'
  }
});

function Post({ content, node }) {
  const { frontmatter: { title, excerpt }, meta: { date } } = node;

  return (
    <PostWrapper>
      <PostHeader>
        <h2>{title}</h2>
        <p>{date}</p>
        <p>{excerpt}</p>
      </PostHeader>
      <MDXRemote
        {...content}
        components={MDXComponents}
      />
    </PostWrapper>
  );
}

Post.propTypes = {
  content: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired
};

export default Post;
