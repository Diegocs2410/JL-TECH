import React, { useState } from 'react'
import Loading from '../components/Loading'
import useAuthUser from '../context/AuthUser'

const Register = () => {
  const { register, isLoading } = useAuthUser()
  const [userRegData, setUserRegData] = useState({
    name: '',
    email: '',
    contact: '',
    password: ''
  })

  const handleRegister = () => {
    register(userRegData)
  }
  // HandleChange
  const handleChange = e => {
    const { name, value } = e.target
    setUserRegData({ ...userRegData, [name]: value })
  }
  return (
    <div className='container'>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='container'>
          <div className='d-grid  align-content-center min-vh-100 justify-content-center'>
            <form onSubmit={handleRegister}>
              <div
                style={{
                  width: '450px'
                }}
                className='card p-5 shadow border-1 bg-gradient'
              >
                <i className='fas fa-user text-center fa-3x '></i>
                <h3 className='text-center fw-bold fs-1 mb-5'>Register</h3>
                <div className='mb-3'>
                  <label htmlFor='username' className='form-label'>
                    Nombre
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='ex: Pepito Perez'
                    autoFocus
                    required
                    name='name'
                    onChange={handleChange}
                    value={userRegData.name}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='username' className='form-label'>
                    Nombre
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='3071567898'
                    autoFocus
                    required
                    name='contact'
                    onChange={handleChange}
                    value={userRegData.contact}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='username' className='form-label'>
                    Username / Email
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='username'
                    placeholder='email@email.com'
                    autoFocus
                    required
                    name='email'
                    onChange={handleChange}
                    value={userRegData.email}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='password' className='form-label'>
                    Password
                  </label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    placeholder='******'
                    required
                    name='password'
                    onChange={handleChange}
                    value={userRegData.password}
                  />
                </div>
                <button className='btn btn-primary boton ' type='submit'>
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register
