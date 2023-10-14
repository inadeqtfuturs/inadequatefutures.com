import React from 'react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote';
import PropTypes from 'prop-types';
import { styled } from '@stitches';
import MDXComponents from '@components/MDXComponents';

const getSimplifiedSlug = (s) => s.replace(' ', '-');

const PostHeader = styled('div', {
  marginBottom: '$4',
  paddingBottom: '$2',
  borderBottom: '1px solid $text',
  p: {
    marginBottom: '$2'
  }
});

const PostWrapper = styled('div', {
  'a:hover, a:focus': {
    background: '$green300'
  }
});

const TagWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$2'
});

const Tag = styled(Link, {
  borderRadius: '$sm',
  padding: '$0half $2',
  margin: 0,
  fontSize: '$2xs',
  background: 'rgba(0, 0, 0, 0.03)',
  whiteSpace: 'nowrap',
  textDecoration: 'none'
});


function Post({ content, node }) {
  const { frontmatter: { title, excerpt, tags}, meta: { date } } = node;

  return (
    <PostWrapper>
      <PostHeader>
        <h1>{title}</h1>
        <p>{date}</p>
        <p>{excerpt}</p>
        {tags && (
          <TagWrapper>
            {tags.sort().map(tag => (
              <Tag href={`/tags/${getSimplifiedSlug(tag)}`} passHref key={tag}>
                {tag}
              </Tag>
            ))}
          </TagWrapper>
        )}
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
