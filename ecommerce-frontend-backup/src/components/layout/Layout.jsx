import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AIAssistant from '../common/AIAssistant';

const Layout = ({ children }) => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default Layout;