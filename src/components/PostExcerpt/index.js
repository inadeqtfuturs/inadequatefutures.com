import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { styled } from '@stitches';

const getSimplifiedSlug = (s) => s.replace(' ', '-');

const PostWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});

const Date = styled('span', {
  fontSize: '$2xs',
  textTransform: 'uppercase',
  margin: 0
});

const PostName = styled(Link, {
  fontSize: '$lg',
  fontWeight: 'normal',
  marginBottom: '$2',
  color: '$text',
  textDecoration: 'none',
  '&:hover, &:focus': {
    textDecoration: 'underline'
  }
});

const Excerpt = styled('p', {
  fontSize: '$xs',
  margin: '0 0 $3'
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

function PostExcerpt({ post }) {
  const {
    frontmatter: { title, excerpt, tags },
    meta: { date },
    params: { slug }
  } = post;

  return (
    <PostWrapper>
      <Date>{date}</Date>
      <PostName href={`/${slug.join('/')}`} passHref>
        {title}
      </PostName>
      <Excerpt>{excerpt}</Excerpt>
      <TagWrapper>
        {tags.map(t => (
          <Tag href={`/tags/${getSimplifiedSlug(t)}`} passHref key={t}>
            {t}
          </Tag>
        ))}
      </TagWrapper>
    </PostWrapper>
  );
}

PostExcerpt.propTypes = {
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      excerpt: PropTypes.string,
      tags: PropTypes.array
    }),
    meta: PropTypes.shape({
      date: PropTypes.string,
      rawDate: PropTypes.any
    }),
    params: PropTypes.shape({
      slug: PropTypes.array
    })
  })
};

PostExcerpt.defaultProps = {
  post: null
};

export default PostExcerpt;
