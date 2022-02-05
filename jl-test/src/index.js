import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import axios from 'axios'
import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { AuthUserProvider } from './context/AuthUser'

axios.defaults.baseURL = 'http://localhost:4000/api/v1'

ReactDOM.render(
  <React.StrictMode>
    <AuthUserProvider>
      <App />
    </AuthUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
