import React from 'react'
import useAuthUser from '../context/AuthUser'

const Register = () => {
  const { register } = useAuthUser()
  const handleRegister = () => {
    register({
      email: 'diego@diego.com',
      password: '12345',
      contact: '12346789',
      name: 'Diego Carreño'
    })
  }
  return (
    <div>
      <h1 className='text-primary'>register</h1>
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register
