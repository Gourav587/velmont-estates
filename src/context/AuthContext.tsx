/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getUser, onAuthChange, handleAuthCallback, logout } from '@netlify/identity';
import type { User } from '@netlify/identity';
interface AuthState {
  user: User | null;
  loading: boolean;
  callback: { type: 'invite'; token: string } | { type: 'recovery' } | null;
  error: string;
  finishCallback: () => void;
}
const AuthContext = createContext<AuthState | undefined>(undefined);
// Process callback hashes once, including under React StrictMode.
let initialization: ReturnType<typeof handleAuthCallback> | undefined;
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [callback, setCallback] = useState<AuthState['callback']>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthChange((_event, user) => { if (active) setUser(user); });
    async function initialize() {
      try {
        initialization ??= handleAuthCallback();
        const result = await initialization;
        if (!active) return;
        if (result?.type === 'invite') {
          if (!result.token) throw new Error('Invalid invitation.');
          setCallback({ type: 'invite', token: result.token });
        }
        if (result?.type === 'recovery') setCallback({ type: 'recovery' });
        const current = await getUser();
        if (active) setUser(current);
      } catch { if (active) setError('This sign-in link could not be verified. Request a new link and try again.'); }
      finally { if (active) setLoading(false); }
    }
    void initialize();
    return () => { active = false; unsubscribe(); };
  }, []);
  return <AuthContext.Provider value={{ user, loading, callback, error, finishCallback: () => setCallback(null) }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error('useAuth must be used within AuthProvider');
  return auth;
}
export { logout };
