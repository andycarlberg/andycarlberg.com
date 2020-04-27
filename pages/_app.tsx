import React, { ReactElement } from 'react';
import NextApp from 'next/app';
import Layout from '../src/components/Layout/Layout';

import '../src/styles/styles.scss';

export default class App extends NextApp {
  public render(): ReactElement {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

