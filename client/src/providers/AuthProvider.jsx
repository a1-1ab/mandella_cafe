import { useCallback, useEffect, useMemo, useState } from 'react';
import { authApi, tokenStorage } from '../lib/api/index.js';
import { AuthContext } from '../hooks/useAuth.js';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('booting');

  const persistSession = useCallback((session) => {
    tokenStorage.set(session.token);
    setUser(session.user);
    return session.user;
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
    setStatus('anonymous');
  }, []);

  useEffect(() => {
    let active = true;

    const boot = async () => {
      try {
        if (tokenStorage.get()) {
          const profile = await authApi.me();
          if (!active) return;
          setUser(profile);
          setStatus('ready');
          return;
        }

        const session = await authApi.guest();
        if (!active) return;
        persistSession(session);
        setStatus('ready');
      } catch {
        if (!active) return;
        tokenStorage.clear();
        setStatus('anonymous');
      }
    };

    boot();

    return () => {
      active = false;
    };
  }, [persistSession]);

  const login = useCallback(
    async (credentials) => {
      const session = await authApi.login(credentials);
      persistSession(session);
      setStatus('ready');
      return session.user;
    },
    [persistSession]
  );

  const register = useCallback(
    async (payload) => {
      const session = await authApi.register(payload);
      persistSession(session);
      setStatus('ready');
      return session.user;
    },
    [persistSession]
  );

  const value = useMemo(
    () => ({ user, status, isReady: status === 'ready', isGuest: Boolean(user?.isGuest), login, register, logout }),
    [user, status, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
