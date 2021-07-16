import React from 'react';
import PropTypes from 'prop-types';
import { serialize } from 'next-mdx-remote/serialize';
import { getPages } from '@mdx';

import SEO from '@components/SEO';
import Projects from '@components/Projects';

function Work({ projects }) {
  return (
    <>
      <SEO title="work" description="if -- sample work" />
      <h1>work</h1>
      <Projects projects={projects} />
    </>
  );
}

Work.propTypes = {
  projects: PropTypes.array.isRequired
};

export async function getStaticProps() {
  const portfolio = await getPages({ frontmatter: { type: 'portfolio' } });
  const projects = await Promise.all(portfolio.map(async project => {
    const { content, frontmatter } = project;
    const mdx = await serialize(content, {
      scope: frontmatter
    });

    return {
      mdx,
      ...project
    };
  }));

  const sorted = projects.sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  ).filter(a => a.frontmatter.title !== 'plume.com');

  return {
    props: {
      projects: sorted
    }
  };
}

export default Work;
