import React from 'react';
import { styled } from '@stitches';

import SEO from '@components/SEO';
import Generative from '@components/Generative';

const Wrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxHeight: 'calc(100svh - 72px - 93px)',
  p: {
    maxWidth: 420,
    textAlign: 'center;'
  }
});

export default function Custom500() {
  return (
    <>
      <SEO title="500" description="we hit some kind of exception. we're probably working on it" />
      <Wrapper>
        <Generative />
        <h1>500</h1>
        <p>
          we hit some kind of exception. we're probably working on it
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
