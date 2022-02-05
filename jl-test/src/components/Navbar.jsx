import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-xl navbar-dark bg-dark'>
      <div className='container'>
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
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink to='/' className='nav-link'>
                Home
              </NavLink>
            </li>
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
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            <li className='nav-item d-flex align-items-center'>
              <NavLink to='/dashboard' className='nav-link'>
                <img
                  src='https://cdn-icons-png.flaticon.com/512/260/260507.png'
                  alt=''
                  className='img-thumbnail rounded-circle'
                  style={{ width: '30px', height: '30px' }}
                />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
