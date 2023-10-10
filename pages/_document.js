/* eslint-disable react/no-danger */
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getCssString } from '@stitches';

const FONT_INTER = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;500&display=swap';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    try {
      const initialProps = await Document.getInitialProps(ctx);

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

  render() {
    return (
      <Html lang="en">
        <Head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-ZMJ5MG24F1" />
          <script 
            id="gtm" 
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments)}
                gtag('js', new Date());

                gtag('config', 'G-ZMJ5MG24F1');
              `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
