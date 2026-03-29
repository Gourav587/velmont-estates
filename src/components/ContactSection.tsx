import React, { useState, useRef } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAIL_JS_SERVICE_ID || 'your_service_id',
        import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID || 'your_template_id',
        formRef.current,
        import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY || 'your_public_key'
      );

      if (result.text === 'OK') {
        setStatus('success');
      } else {
        throw new Error('Something went wrong. Please try again later.');
      }
    } catch (err: any) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to send message. Please try again.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <section className="section" id="contact">
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '600px' }}>
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            background: 'var(--secondary)',
            borderRadius: '32px',
            maxWidth: '600px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <div style={{ color: 'var(--accent)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
              <CheckCircle2 size={64} />
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Thank You!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
              Your message has been received. Our team will contact you shortly to discuss your real estate needs.
            </p>
            <button 
              onClick={handleReset}
              className="btn btn-primary"
              style={{ padding: '1rem 2.5rem' }}
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Get in <span style={{ color: 'var(--accent)' }}>Touch</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Ready to make your next move? Reach out today for a personalized consultation.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '4rem'
        }}>
          {/* Contact Info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--secondary)', padding: '1rem', borderRadius: '12px', color: 'var(--accent)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Call Us</h4>
                  <p style={{ color: 'var(--text-muted)' }}>+91 82848 83282</p>
                  <p style={{ color: 'var(--text-muted)' }}>+91 91156 62411</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--secondary)', padding: '1rem', borderRadius: '12px', color: 'var(--accent)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Email Us</h4>
                  <p style={{ color: 'var(--text-muted)' }}>velmontestate@gmail.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--secondary)', padding: '1rem', borderRadius: '12px', color: 'var(--accent)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Location</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Triregion (Pathankot, Gurdaspur, Amritsar)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            padding: '3rem',
            background: 'var(--secondary)',
            borderRadius: '24px',
            border: '1px solid var(--border)'
          }}>
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Name</label>
                  <input name="user_name" type="text" placeholder="Your Name" required className="form-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Phone</label>
                  <input name="user_phone" type="tel" placeholder="Your Phone" required className="form-input" />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Email</label>
                <input name="user_email" type="email" placeholder="Your Email" required className="form-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Message</label>
                <textarea name="message" placeholder="Tell us what you're looking for..." rows={4} required className="form-input"></textarea>
              </div>

              {status === 'error' && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#ff4444', fontSize: '0.9rem', padding: '1rem', background: 'rgba(255,68,68,0.1)', borderRadius: '8px' }}>
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="btn btn-primary"
                style={{ 
                  width: '100%', 
                  marginTop: '1rem',
                  opacity: status === 'submitting' ? 0.7 : 1,
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer'
                }}
              >
                {status === 'submitting' ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send size={18} />
                    Send Quick Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
