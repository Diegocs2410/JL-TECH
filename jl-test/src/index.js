import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import axios from "axios"
import "antd/dist/antd.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import { AuthUserProvider } from "./context/AuthUser"
import { Provider } from "react-redux"
import { store } from "./redux/store"

axios.defaults.baseURL = "http://localhost:4000/api/v1"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthUserProvider>
        <App />
      </AuthUserProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
