import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {DarkModeContextProvider } from './contexts/darkModeContext.jsx'
import { AuthContextProvider } from './contexts/authContext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <DarkModeContextProvider>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  </DarkModeContextProvider>
  </React.StrictMode>,
)
