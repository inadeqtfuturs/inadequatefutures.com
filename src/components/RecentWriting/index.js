import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { styled, darkTheme } from '@stitches';

const Section = styled('section', {
  margin: '$6 0',
  '@lg': {
    margin: '$10 0'
  },
  [`.${darkTheme} &`]: {
    margin: 0
  }
});

const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  padding: '$zeroOne',
  borderBottom: '$contentBorder'
});

const Title = styled('h3', {
  margin: '0 0 $4',
  '&:after': {
    content: '""',
    height: '2px',
    width: '40px',
    background: '$text',
    display: 'block',
    marginTop: '$4'
  },
  [`.${darkTheme} &`]: {
    margin: 0,
    '&:after': {
      content: 'none'
    }
  },
});

const SeeMore = styled('a', {
  color: '$gray700',
  margin: 0,
  fontSize: '$sm',
  '&:hover,&:active': {
    color: '$text'
  }
});

const PostsWrapper = styled('div', {
  display: 'grid',
  gap: '$6',
  '@sm': {
    gridTemplateColumns: 'repeat(2, 1fr)'
  },

  [`.${darkTheme} &`]: {
    gap: '$gutter',
    background: '$black',
    borderBottom: '$contentBorder'
  }
});

const PostWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$zeroOne',
  background: '$background'
});

const Date = styled('span', {
  fontSize: '$2xs',
  textTransform: 'uppercase',
  '&:not(:first-child)': {
    margin: '$4 0 0',
  },
  margin: '0',
  '@sm': {
    margin: '0',
    '&:not(:first-child)': {
      margin: '0',
    }
  }
});

const PostName = styled('a', {
  fontSize: '$lg',
  fontWeight: 'normal',
  color: '$text',
  textDecoration: 'none'
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
  background: '$containerBackground',
  [`.${darkTheme} &`]: {
    margin: 'auto 0 -1rem -1rem',
    gap: '$gutter',
    borderTop: '$contentBorder',
    borderRight: '$contentBorder'
  }
});

const Tag = styled('span', {
  borderRadius: '$sm',
  padding: '$0half $2',
  margin: 0,
  fontSize: '$2xs',
  background: 'rgba(0, 0, 0, 0.03)',
  whiteSpace: 'nowrap',
  height: 'min-content',
  [`.${darkTheme} &`]: {
    background: '$background'
  }
});

function RecentWriting({ posts }) {
  return (
    <Section>
      <Header>
        <Title>recent writing</Title>
        <Link href="/garden" passHref>
          <SeeMore>see more</SeeMore>
        </Link>
      </Header>
      <PostsWrapper>
        {posts.map(({
          frontmatter: { title, excerpt, tags },
          meta: { date, rawDate },
          params: { slug }
        }) => (
          <PostWrapper key={rawDate}>
            <Date>{date}</Date>
            <Link href={`/${slug.join('/')}`} passHref>
              <PostName>{title}</PostName>
            </Link>
            <Excerpt>{excerpt}</Excerpt>
            <TagWrapper>
              {tags.map(t => <Tag key={t}>{t}</Tag>)}
            </TagWrapper>
          </PostWrapper>
        ))}
      </PostsWrapper>
    </Section>
  );
}

RecentWriting.propTypes = {
  posts: PropTypes.array.isRequired
};

export default RecentWriting;
