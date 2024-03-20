// Layout.js
import React from 'react';
import BallCanvas from './BallCanvas';

const Layout = ({ children }) => {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <BallCanvas />
      {children}
    </div>
  );
}

export default Layout;
