import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

export default function SEO({
  title,
  description,
  twitter,
  favicon,
  ogImage
}) {
  return (
    <Head>
      <title>if | {title}</title>

      <link rel="icon" href={favicon} />

      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${process.env.URL}/${ogImage}`} />
      <meta property="og:image:width" content="700" />
      <meta property="og:image:height" content="700" />
      <meta name="twitter:site" content={twitter} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={`${process.env.URL}/${ogImage}`} />
    </Head>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  twitter: PropTypes.string,
  favicon: PropTypes.string,
  ogImage: PropTypes.string
};

SEO.defaultProps = {
  title: 'home',
  description: 'if - making stuff online',
  twitter: 'inadeqt_futurs',
  ogImage: 'images/profile.jpg',
  favicon: '/favicon.ico'
};
