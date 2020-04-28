import React, { FC } from 'react';
import css from 'styled-jsx/css';

export interface LayoutProps {
  children: React.ReactNode;
}

const styles = css`
  max-width: 50em;
  margin: 0 auto;
`;

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{styles}</style>
    </div>
  );
};

export default Layout;
