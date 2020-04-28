import React, { ReactElement } from 'react';
import NextApp from 'next/app';

import '../styles/styles.scss';
import { initGA, logPageView } from '../lib/analytics';

export default class App extends NextApp {
  componentDidMount(): void {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  public render(): ReactElement {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
