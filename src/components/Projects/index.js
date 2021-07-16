import React from 'react';
import PropTypes from 'prop-types';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import { styled } from '@stitches';

const ProjectsWrapper = styled('section', {
  display: 'grid',
  gap: '$8',
  '@sm': {
    gridTemplateColumns: 'repeat(2, 1fr)'
  }
});
const ProjectWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column'
});
const ImageWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  height: '0',
  paddingTop: '56.3%',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  borderRadius: '$md',
  overflow: 'hidden'
});
const Gradient = styled('div', {
  display: 'block',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  variants: {
    gradient: {
      one: {
        background: 'linear-gradient(160deg, #4b969a , hsla(232.11,100%,92.55%,0.4) 100%)'
      },
      two: {
        background: 'radial-gradient(circle at -137% -1%, #f20e57 4%, hsla(316.06,69.61%,60%,0.4) 95%), linear-gradient(47deg, #1242AF 14%, #309BC5 71%)'
      }
    }
  }
});
const Title = styled('h2', {
  margin: '$3 0',
  fontSize: '$xl'
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
const TagWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$2',
  margin: '0 0 $2'
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

function Projects({ projects }) {
  return (
    <ProjectsWrapper>
      {projects.map(({
        mdx,
        frontmatter: {
          title,
          images,
          gradient,
          site,
          tech,
          repo
        }
      }) => (
        <ProjectWrapper key={title}>
          <ImageWrapper>
            {images && <Image src={images[0]} layout="fill" objectFit="contain" alt={title} />}
            {gradient && <Gradient gradient={gradient} />}
          </ImageWrapper>
          <Title>{title}</Title>
          <TagWrapper>
            {tech && tech.map(t => <Tag key={t}>{t}</Tag>)}
          </TagWrapper>
          <MDXRemote {...mdx} />
          <LinkWrapper>
            {site && <GithubLink href={site}>site</GithubLink>}
            {site && repo && <>{' / '}</>}
            {repo && <GithubLink href={repo}>github</GithubLink>}
          </LinkWrapper>
        </ProjectWrapper>
      ))}
    </ProjectsWrapper>
  );
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired
};

export default Projects;
