import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AuthContextProvider } from './Contexts/authContext';
import { APIContextProvider } from './Contexts/apiContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <APIContextProvider>
        <App />
      </APIContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
