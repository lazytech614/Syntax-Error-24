import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { UserInfoContextProvider } from './contexts/userInfoContext.jsx'
import { FeedContextProvider } from './contexts/FeedContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <UserInfoContextProvider>
        <FeedContextProvider>
          <App />
        </FeedContextProvider>
      </UserInfoContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
