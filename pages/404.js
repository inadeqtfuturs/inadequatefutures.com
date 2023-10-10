import React from 'react';
import { styled } from '@stitches';

import SEO from '@components/SEO';
import Generative from '@components/Generative';

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  p: {
    maxWidth: 420,
    textAlign: 'center;'
  }
});

export default function Custom404() {
  return (
    <>
      <SEO title="404" description="you're trying to find something that doesn't exist (at least not here)" />
      <Wrapper>
        <Generative />
        <h1>404</h1>
        <p>
          you're trying to find something that 
          doesn't exist (at least, not here)
        </p>
        <br />
        <br />
        <p>
          the above image is generative art made with canvas apis. 
          you can refresh this page to generate a new object
        </p>
      </Wrapper>
    </>
  );
}
