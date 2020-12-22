import React, { createContext, useCallback, useContext, useState } from 'react';

import api from 'services/api';

interface User {
  id: string;
  name: string;
  email: string;
  occupation: string;
  avatar: string;
}

interface IAuthState {
  token: string;
  user: User;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: User;
  signIn(credential: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@lsreefer:token');
    const user = localStorage.getItem('@lsreefer:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(
    async ({ email, password }: ISignInCredentials) => {
      const response = await api.post('sessions', {
        email,
        password,
      });

      const { user, token } = response.data;

      localStorage.setItem('@lsreefer:token', token);
      localStorage.setItem('@lsreefer:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
    },
    [],
  );

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@lsreefer:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem('@lsreefer:token');
    localStorage.removeItem('@lsreefer:user');
    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}
