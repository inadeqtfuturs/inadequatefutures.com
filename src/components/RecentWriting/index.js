import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { styled } from '@stitches';

const Section = styled('section', {
  margin: '$6 0',
  '@lg': {
    margin: '$10 0'
  }
});

const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline'
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
  }
});

const SeeMore = styled(Link, {
  color: '$gray700',
  margin: 0,
  fontSize: '$sm',
  '&:hover,&:active': {
    color: '$text'
  }
});

const PostsWrapper = styled('div', {
  display: 'grid',
  gridAutoFlow: 'column',
  gridTemplateRows: 'repeat(8, min-content)',
  gap: '0 $6',
  '@sm': {
    gap: '0 $8',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(4, min-content)'
  }
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

const PostName = styled(Link, {
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
  gap: '$2'
});

const Tag = styled('span', {
  borderRadius: '$sm',
  padding: '$0half $2',
  margin: 0,
  fontSize: '$2xs',
  background: 'rgba(0, 0, 0, 0.03)',
  whiteSpace: 'nowrap',
  height: 'min-content'
});

function RecentWriting({ posts }) {
  return (
    <Section>
      <Header>
        <Title>recent writing</Title>
        <SeeMore href="/garden" passHref>
          see more
        </SeeMore>
      </Header>
      <PostsWrapper>
        {posts.map(({
          frontmatter: { title, excerpt, tags },
          meta: { date, rawDate },
          params: { slug }
        }) => (
          <React.Fragment key={rawDate}>
            <Date>{date}</Date>
            <PostName href={`/${slug.join('/')}`} passHref>
              {title}
            </PostName>
            <Excerpt>{excerpt}</Excerpt>
            <TagWrapper>
              {tags.map(t => <Tag key={t}>{t}</Tag>)}
            </TagWrapper>
          </React.Fragment>
        ))}
      </PostsWrapper>
    </Section>
  );
}

RecentWriting.propTypes = {
  posts: PropTypes.array.isRequired
};

export default RecentWriting;
