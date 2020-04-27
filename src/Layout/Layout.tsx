import React, { FC } from 'react';

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{`
        background-color: red;
      `}</style>
    </div>
  );
};

export default Layout;
