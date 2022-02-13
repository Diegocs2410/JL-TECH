import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Loading from "../components/Loading"
import useAuthUser from "../context/AuthUser"
// Import image
import logingBg from "../img/loginBg.jpg"

const Login = () => {
  const { login, isLoading } = useAuthUser()
  const navigate = useNavigate()
  // States
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  // HandleLogin
  const handleLogin = (e) => {
    e.preventDefault()
    login(userData, navigate)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row row-cols-md-2 min-vh-100 ">
          <img src={logingBg} alt="fondo login" className="" />
          <div className="d-grid justify-content-center align-items-start">
            <form onSubmit={handleLogin} className="mt-5">
              <div className="card p-4 shadow border-1 bg-gradient">
                <i className="fas fa-user text-center fa-3x "></i>
                <h3 className="text-center fw-bold fs-1 mb-5">Login</h3>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username / Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="email@email.com"
                    autoFocus
                    required
                    name="email"
                    onChange={handleChange}
                    value={userData.email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="******"
                    required
                    name="password"
                    onChange={handleChange}
                    value={userData.password}
                  />
                </div>
                <button className="btn btn-primary boton " type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
