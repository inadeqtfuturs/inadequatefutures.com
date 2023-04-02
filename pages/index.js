import React from 'react';
import PropTypes from 'prop-types';
import { MDXRemote } from 'next-mdx-remote';
import { getPages, getPageProps } from '@mdx';
import { styled, darkTheme } from '@stitches';
import getGithubRepoInfo from '@lib/getGithubRepoInfo';

import SEO from '@components/SEO';
import RecentProjects from '@components/RecentProjects';
import RecentWriting from '@components/RecentWriting';

const Wrapper = styled('section', {
  padding: '$zeroOne',
  [`.${darkTheme} &`]: {
    borderBottom: '$contentBorder'
  }
});

export function Index({ mdx, repositories, posts }) {
  return (
    <>
      <SEO />
      <Wrapper>
        <MDXRemote {...mdx} />
      </Wrapper>
      {repositories && <RecentProjects repositories={repositories} />}
      {posts && <RecentWriting posts={posts} />}
    </>
  );
}

Index.propTypes = {
  mdx: PropTypes.object.isRequired,
  posts: PropTypes.array,
  repositories: PropTypes.array
};

Index.defaultProps = {
  posts: null,
  repositories: null
};

export async function getStaticProps() {
  const props = await getPageProps(['pages', 'index']);
  const repositories = await getGithubRepoInfo(
    'inadeqtfuturs',
    ['garden', 'if-sf', 'next-mdx-relations']
  );
  const posts = await getPages({ frontmatter: { draft: null, type: ['garden', 'code'] } });
  const recentPosts = posts.slice(0, 2);

  return {
    props: {
      repositories,
      posts: recentPosts,
      ...props
    }
  };
}

export default Index;
