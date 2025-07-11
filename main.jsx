// Location: frontend/src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { AuthProvider } from './context/AuthContext.jsx'; // 1. Import AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap the App component */}
    <AuthProvider> {/* 2. Wrap the App */}
      <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
