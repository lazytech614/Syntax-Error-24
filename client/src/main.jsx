import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { UserInfoContextProvider } from './contexts/userInfoContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <UserInfoContextProvider>
        <App />
      </UserInfoContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
