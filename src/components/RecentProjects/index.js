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
const SeeMore = styled('a', {
  color: '$gray700',
  margin: 0,
  fontSize: '$sm',
  '&:hover,&:active': {
    color: '$text'
  }
});

const ProjectsWrapper = styled('div', {
  display: 'grid',
  gap: '$6',
  '@sm': {
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
});
const ProjectWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column'
});
const Topics = styled('span', {
  fontSize: '$2xs',
  margin: 0
});
const ProjectName = styled('h4', {
  fontSize: '$lg',
  fontWeight: 'normal'
});
const Description = styled('p', {
  fontSize: '$xs',
  margin: '0 0 $3'
});
const LinkWrapper = styled('div', {
  margin: 'auto 0 0'
});
const GithubLink = styled('a', {
  fontSize: '$xs',
  color: '$text',
  textTransform: 'uppercase',
  textDecoration: 'none',
  transition: 'text-decoration 0.3s',
  '&:hover, &:focus': {
    textDecoration: 'underline'
  }
});

function RecentProjects({ repositories }) {
  return (
    <Section>
      <Header>
        <Title>recent projects</Title>
        <Link href="/work" passHref>
          <SeeMore>see more</SeeMore>
        </Link>
      </Header>
      <ProjectsWrapper>
        {repositories.map(({
          description,
          homepage,
          id,
          name,
          topics,
          svn_url: svnUrl
        }) => (
          <ProjectWrapper key={id}>
            {topics && <Topics>{topics.slice(0,2).join(' / ')}</Topics>}
            <ProjectName>{name}</ProjectName>
            <Description>{description}</Description>
            <LinkWrapper>
              <GithubLink href={svnUrl}>github</GithubLink>
              {homepage && (
                <>
                  {' / '}
                  <GithubLink href={homepage}>site</GithubLink>
                </>
              )}
            </LinkWrapper>
          </ProjectWrapper>
        ))}
      </ProjectsWrapper>
    </Section>
  );
}

RecentProjects.propTypes = {
  repositories: PropTypes.array.isRequired
};

export default RecentProjects;
