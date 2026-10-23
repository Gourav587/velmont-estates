import React, { useState, useRef, useId } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactSection: React.FC<{ projectId?: string; projectTitle?: string }> = ({ projectId = '', projectTitle = '' }) => {
  const formId = useId();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      const values = new FormData(formRef.current);
      const result = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(Array.from(values.entries()).map(([key, value]) => [key, String(value)])).toString(),
      });
      if (!result.ok) throw new Error('Unable to submit your enquiry. Please try again or call us.');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage('Unable to submit your enquiry. Please try again or call +91 82848 83282.');
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
          <div role="status" style={{
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
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
                  <p style={{ color: 'var(--text-muted)' }}><a href="tel:+918284883282">+91 82848 83282</a></p>
                  <p style={{ color: 'var(--text-muted)' }}><a href="tel:+919115662411">+91 91156 62411</a></p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--secondary)', padding: '1rem', borderRadius: '12px', color: 'var(--accent)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.5rem' }}>Email Us</h4>
                  <p style={{ color: 'var(--text-muted)' }}><a href="mailto:velmontestate@gmail.com">velmontestate@gmail.com</a></p>
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
            padding: 'clamp(1.25rem, 4vw, 3rem)',
            background: 'var(--secondary)',
            borderRadius: '24px',
            border: '1px solid var(--border)'
          }}>
            <form 
              name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field"
              ref={formRef}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="project_id" value={projectId} />
              <input type="hidden" name="project_title" value={projectTitle} />
              <div hidden><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></div>
              {projectTitle && <p className="notice">Enquiry about: <strong>{projectTitle}</strong></p>}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }} htmlFor={`${formId}-user_name`}>Name</label>
                  <input id={`${formId}-user_name`} name="user_name" autoComplete="name" maxLength={160} type="text" placeholder="Your Name" required className="form-input" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }} htmlFor={`${formId}-user_phone`}>Phone</label>
                  <input id={`${formId}-user_phone`} name="user_phone" autoComplete="tel" maxLength={30} type="tel" placeholder="Your Phone" required className="form-input" />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }} htmlFor={`${formId}-user_email`}>Email</label>
                <input id={`${formId}-user_email`} name="user_email" autoComplete="email" maxLength={254} type="email" placeholder="Your Email" required className="form-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }} htmlFor={`${formId}-message`}>Message</label>
                <textarea id={`${formId}-message`} name="message" maxLength={4000} defaultValue={projectTitle ? `I would like to arrange a visit to ${projectTitle}. Please contact me with more details.` : ''} placeholder="Tell us what you're looking for..." rows={4} required className="form-input"></textarea>
              </div>

              {status === 'error' && (
                <div role="alert" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#ff4444', fontSize: '0.9rem', padding: '1rem', background: 'rgba(255,68,68,0.1)', borderRadius: '8px' }}>
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <p className="photo-note">We use your contact details to respond to this enquiry. <Link className="text-link" to="/privacy">Read our privacy notice</Link>.</p>
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
