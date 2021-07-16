/* eslint-disable react/no-danger */
import React from 'react';
import NextDocument from 'next/document';
import { getCssString } from '@stitches';

const FONT_INTER = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;500&display=swap';

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    try {
      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssString() }} />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href={FONT_INTER} rel="preload" as="style" />
            <link href={FONT_INTER} rel="stylesheet" media="all" />
            <noscript>
              <link href={FONT_INTER} rel="stylesheet" />
            </noscript>
          </>
        ),
      };
    // eslint-disable-next-line no-empty
    } finally {}
  }
}