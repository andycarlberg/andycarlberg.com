import React from 'react';
import Head from 'next/head';
import css from 'styled-jsx/css';

const styles = css`
  max-width: 50em;
  margin: 0 auto;

  @media print {
    max-width: none;
  }
`;

export default (frontMatter) => {
  return ({ children }) => {
    const slug = frontMatter.__resourcePath.replace('blog/', '').replace('.mdx', '');

    return (
      <>
        <Head>
          <title>{frontMatter.title}</title>
        </Head>
        <div>
          {children}
          <style jsx>{styles}</style>
        </div>
      </>
    );
  };
};
