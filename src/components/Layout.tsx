import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}> {/* Adjust based on Navbar height */}
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default Layout;
