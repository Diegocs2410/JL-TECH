import axios from 'axios'
import { createContext, useState, useContext, useEffect } from 'react'
import Swal from 'sweetalert2'
const AuthUserContext = createContext(null)

const initialState = {
  ok: false,
  message: '',
  data: {}
}

// Provider
export const AuthUserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [userLogged, setUserLogged] = useState(initialState)
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) setUserLogged(JSON.parse(user))
  }, [])

  //   Login
  const login = async (userData, navigate) => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('/users/login', userData)
      localStorage.setItem('user', JSON.stringify(data))
      setUserLogged(data)
      setIsLoading(false)
      Swal.fire({
        title: 'Login Satisfactorio',
        text: 'Bienvenido sr(a) ' + data.data.user.name.toUpperCase(),
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      Swal.fire({
        title: 'Error',
        text: 'Usuario o contraseña incorrectos',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  //   Register

  const register = async (userData, navigate) => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('/users', userData)
      localStorage.setItem('user', JSON.stringify(data))
      setUserLogged(data)
      setIsLoading(false)
      Swal.fire({
        title: 'Registro Satisfactorio',
        text: 'Bienvenido sr(a) ' + data.data.user.name.toUpperCase(),
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error',
        text: ' El usuario ya existe, intente con otro nombre de usuario',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  //   Logout function
  const logout = navigate => {
    setIsLoading(true)
    localStorage.removeItem('user')
    setUserLogged(initialState)
    Swal.fire({
      title: 'Cerrando Sesión',
      text: 'Hasta pronto',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
    navigate('/')
    setIsLoading(false)
  }

  const value = {
    isLoading,
    userLogged,
    login,
    register,
    logout
  }

  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  )
}

const useAuthUser = () => {
  const context = useContext(AuthUserContext)
  if (context === undefined)
    throw new Error('useAuthUser must be used within a AuthUserProvider')

  return context
}
export default useAuthUser
