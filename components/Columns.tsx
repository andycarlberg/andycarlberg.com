import React, { FC, ReactNode } from 'react';
import css from 'styled-jsx/css';

export interface ColumnsProps {
  children: ReactNode;
}

const styles = css`
  text-align: center;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-around;
  }
`;

const Columns: FC<ColumnsProps> = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{styles}</style>
    </div>
  );
};

export default Columns;
