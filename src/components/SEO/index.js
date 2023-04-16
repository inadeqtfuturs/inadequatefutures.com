import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { NextSeo } from 'next-seo';

export default function SEO({
  title,
  description,
  twitter,
  favicon,
  ogImage
}) {
  const seoTitle = `if | ${title}`;

  return (
    <>
      <Head>
        <link rel="icon" href={favicon} />
      </Head>
      <NextSeo
        title={seoTitle}
        description={description}
        openGraph={{
          title: seoTitle,
          description,
          images: [{
            url: `${process.env.NEXT_PUBLIC_URL}/${ogImage}`,
            width: 700,
            height: 700,
            alt: 'if'
          }]
        }}
        twitter={{
          handle: `@${twitter}`,
          cardType: 'summary_large_image'
        }}
      />
    </>
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
  ogImage: '/images/profile.jpg',
  favicon: '/images/favicon.ico'
};
