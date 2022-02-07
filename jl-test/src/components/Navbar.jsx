import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useAuthUser from '../context/AuthUser'

const Navbar = () => {
  const user = localStorage.getItem('user')
  const avatar = user
    ? JSON.parse(user).data.user.avatar
    : 'https://cdn-icons-png.flaticon.com/512/260/260507.png'

  // context
  const navigate = useNavigate()
  const { logout, userLogged } = useAuthUser()
  // Handle logout
  const handleLogout = () => {
    logout(navigate)
  }

  return (
    <nav className='navbar navbar-expand-xl navbar-dark bg-dark shadow sticky-top'>
      <div className='container '>
        <NavLink to='/' className='navbar-brand'>
          JL Test
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse justify-content-between'
          id='navbarSupportedContent'
        >
          <ul className='navbar-nav mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink to='/' className='nav-link'>
                Home
              </NavLink>
            </li>
            {!user && (
              <ul className='navbar-nav mb-2 mb-lg-0 '>
                <li className='nav-item'>
                  <NavLink to='/login' className='nav-link'>
                    Login
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='/register' className='nav-link'>
                    Registro
                  </NavLink>
                </li>
              </ul>
            )}
          </ul>
          {user && (
            <ul className='navbar-nav mb-2 mb-lg-0 d-flex justify-content-center align-items-center'>
              <li className='nav-item'>
                <NavLink to='/dashboard' className='nav-link'>
                  Lista Usuarios
                </NavLink>
              </li>
              <NavLink
                to='/dashboard'
                className='nav-item d-flex align-items-center'
              >
                <div className='nav-link d-flex align-items-center justify-content-center'>
                  <img
                    src={avatar}
                    alt=''
                    className='bg-light rounded-circle img-fluid'
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover'
                    }}
                  />
                  <div className='dropdown ms-2'>
                    <button
                      className='btn btn-primary btn-sm dropdown-toggle'
                      type='button'
                      id='userOptions'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    ></button>
                    <ul className='dropdown-menu' aria-labelledby='userOptions'>
                      {userLogged.role === 'admin' && (
                        <>
                          <NavLink to='/register' className='dropdown-item'>
                            Crear Usuario
                          </NavLink>
                          <NavLink to='/createclient' className='dropdown-item'>
                            Modulo Clientes
                          </NavLink>
                        </>
                      )}
                      <button onClick={handleLogout} className='dropdown-item'>
                        Sign Out
                      </button>
                    </ul>
                  </div>
                </div>
              </NavLink>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
