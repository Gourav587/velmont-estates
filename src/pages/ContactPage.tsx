import React from 'react';
import ContactSection from '../components/ContactSection';

const ContactPage: React.FC = () => {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '100%' }}>
        <ContactSection />
      </div>
    </div>
  );
};

export default ContactPage;
