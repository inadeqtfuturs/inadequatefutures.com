import React from 'react';
import PropTypes from 'prop-types';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import { styled } from '@stitches';
import { getPageProps } from '@mdx';

import SEO from '@components/SEO';

const AboutWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  '@md': {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  }
});
const ContentWrapper = styled('div', {});
const ImageWrapper = styled('div', {
  position: 'relative',
  flex: '1 0 auto',
  minHeight: '300px',
  margin: '0 0 $6',
  '@md': {
    margin: '0 0 0 5%',
    width: '45%',
    minHeight: 'unset'
  }
});

export function About({ mdx }) {
  return (
    <>
      <SEO title="about" description="if -- about page" />
      <AboutWrapper>
        <ImageWrapper>
          <Image
            src="/images/profile.jpg"
            layout="fill"
            objectFit="contain"
            objectPosition="top"
          />
        </ImageWrapper>
        <ContentWrapper>
          <MDXRemote {...mdx} />
        </ContentWrapper>
      </AboutWrapper>
    </>
  );
}

About.propTypes = {
  mdx: PropTypes.object.isRequired
};

export async function getStaticProps() {
  const props = await getPageProps(['pages', 'about']);

  return {
    props
  };
}

export default About;
