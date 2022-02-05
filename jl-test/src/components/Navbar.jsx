import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuthUser from '../context/AuthUser'

const Navbar = () => {
  const user = localStorage.getItem('user')
  const avatar = user
    ? JSON.parse(user).data.user.avatar
    : 'https://cdn-icons-png.flaticon.com/512/260/260507.png'

  // context
  const navigate = useNavigate()
  const { logout } = useAuthUser()
  // Handle logout
  const handleLogout = () => {
    logout(navigate)
  }

  return (
    <nav className='navbar navbar-expand-xl navbar-dark bg-dark'>
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
              <li className='nav-item d-flex align-items-center'>
                <NavLink
                  to='/'
                  className='nav-link d-flex align-items-center justify-content-center'
                >
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
                  <button
                    onClick={handleLogout}
                    className='ms-2 btn btn-warning btn-sm'
                  >
                    Sign Out
                  </button>
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
