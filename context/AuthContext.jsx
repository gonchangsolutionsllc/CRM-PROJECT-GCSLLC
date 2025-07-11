import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('crm_token'));
  const navigate = useNavigate();

  const login = async (email, password) => {
    const response = await fetch('http://localhost:5001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to login.');
    }

    localStorage.setItem('crm_token', data.access_token);
    setToken(data.access_token);
    navigate('/'); // Redirect to dashboard on successful login
  };

  const logout = () => {
    localStorage.removeItem('crm_token');
    setToken(null);
    navigate('/login');
  };

  // The 'value' object provides the token and functions to the rest of the app
  const value = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
