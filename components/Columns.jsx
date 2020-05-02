import React from 'react';
import css from 'styled-jsx/css';

const styles = css`
  text-align: center;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-around;
  }
`;

const Columns = ({ children }) => {
  return (
    <div>
      {children}
      <style jsx>{styles}</style>
    </div>
  );
};

export default Columns;
