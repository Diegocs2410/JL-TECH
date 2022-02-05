import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AuthUserProvider } from './context/AuthUser'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000/api/v1'

ReactDOM.render(
  <React.StrictMode>
    <AuthUserProvider>
      <App />
    </AuthUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
