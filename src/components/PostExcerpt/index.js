import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { styled, darkTheme } from '@stitches';

const getSimplifiedSlug = (s) => s.replace(' ', '-');

const PostWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$zeroOne',
  background: '$background'
});

const Date = styled('span', {
  fontSize: '$2xs',
  textTransform: 'uppercase',
  margin: 0
});

const PostName = styled('a', {
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
  maxWidth: 'fit-content',
  gap: '$2',
});

const Tag = styled('a', {
  borderRadius: '$sm',
  padding: '$0half $2',
  margin: 0,
  fontSize: '$2xs',
  background: 'rgba(0, 0, 0, 0.03)',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  height: 'min-content',
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
      <Link href={`/${slug.join('/')}`} passHref>
        <PostName>{title}</PostName>
      </Link>
      <Excerpt>{excerpt}</Excerpt>
      <TagWrapper>
        {tags.map(t => (
          <Link href={`/tags/${getSimplifiedSlug(t)}`} passHref key={t}>
            <Tag>{t}</Tag>
          </Link>
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
