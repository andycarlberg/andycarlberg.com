import React, { ReactElement } from 'react';
import NextApp from 'next/app';

import '../styles/styles.scss';

export default class App extends NextApp {
  public render(): ReactElement {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
