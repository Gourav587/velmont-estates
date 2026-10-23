import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { login, requestPasswordRecovery, updateUser, acceptInvite } from '@netlify/identity';
import { Navigate } from 'react-router-dom';
import { useAuth, logout } from '../context/AuthContext';

export function AuthCallbackRedirect() {
  const { callback, error } = useAuth();
  if (callback || error) return <Navigate to="/admin" replace />;
  return null;
}
export default function AdminAccess({ children }: { children: ReactNode }) {
  const { user, loading, callback, error: callbackError, finishCallback } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recover, setRecover] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      if (callback?.type === 'invite') { await acceptInvite(callback.token, password); finishCallback(); }
      else if (callback?.type === 'recovery') { await updateUser({ password }); finishCallback(); }
      else if (recover) { await requestPasswordRecovery(email); setNotice('If your account exists, a password reset link is on its way.'); }
      else await login(email, password);
      setPassword('');
    } catch { setError('Unable to complete sign-in. Check your details or request a new link.'); }
    finally { setBusy(false); }
  }
  if (loading) return <div className="container section" role="status">Checking your session…</div>;
  if (!callback && user?.roles?.includes('admin')) return <><div className="container admin-session"><span>Administrator</span><button className="btn btn-outline" onClick={() => { void logout().catch(() => setError('Unable to sign out. Please try again.')); }}>Sign out</button>{error && <p role="alert">{error}</p>}</div>{children}</>;
  if (!callback && user) return <section className="section container"><h1>Administrator access required</h1><p>Your account does not have permission to edit listings. Ask the site owner to assign the admin role.</p><button className="btn btn-primary" onClick={() => { void logout().catch(() => setError('Unable to sign out.')); }}>Sign out</button>{error && <p role="alert">{error}</p>}</section>;
  return <section className="section container"><div className="auth-panel"><p className="eyebrow">Velmont Estates</p><h1>{callback ? 'Set your password' : recover ? 'Reset your password' : 'Administrator sign-in'}</h1><p>Access is reserved for authorized listing managers.</p><form onSubmit={submit} className="stack">
    {!callback && <label>Email<input type="email" autoComplete="username" required value={email} onChange={event => setEmail(event.target.value)} className="form-input" /></label>}
    {(!recover || callback) && <label>Password<input type="password" autoComplete={callback ? 'new-password' : 'current-password'} minLength={callback ? 10 : undefined} required value={password} onChange={event => setPassword(event.target.value)} className="form-input" /></label>}
    {(error || callbackError) && <p role="alert" className="error-message">{error || callbackError}</p>}
    {notice && <p role="status">{notice}</p>}
    <button disabled={busy} className="btn btn-primary">{busy ? 'Please wait…' : callback ? 'Save password' : recover ? 'Send reset link' : 'Sign in'}</button>
    {!callback && <button type="button" className="btn btn-outline" onClick={() => { setRecover(!recover); setError(''); setNotice(''); }}>{recover ? 'Back to sign-in' : 'Forgot password?'}</button>}
  </form></div></section>;
}
