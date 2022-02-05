import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthUser from '../context/AuthUser'

const Navbar = () => {
  const { login } = useAuthUser()
  const [userData] = useState({
    email: 'diego@diego.com',
    password: '12345'
  })
  const navigate = useNavigate()

  const handleLogin = () => {
    login(userData, navigate)
  }
  return (
    <div>
      Navbar
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default Navbar
