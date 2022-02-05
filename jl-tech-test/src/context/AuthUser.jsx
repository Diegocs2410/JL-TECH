import axios from 'axios'
import { createContext, useContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2'

export const AuthUserContext = createContext()
// Initial State
const initialState = {
  login: false,
  token: '',
  user: {}
}

export const AuthUserProvider = ({ children }) => {
  const [, setIsLoading] = useState(false)
  const [userLogged, setUserLogged] = useState({})

  useEffect(() => {
    const initial = JSON.parse(localStorage.getItem('user'))
    initial
      ? initial.login && setUserLogged(initial)
      : setUserLogged(initialState)
  }, [])

  //   function to get All users
  const getUsers = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get('/users')
      //   console.log(data)
      setIsLoading(false)
      return data
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  //   Login Function
  const login = async (userData, navigate) => {
    try {
      setIsLoading(true)
      const { data } = await axios.post('/users/login', userData)
      if (data.ok) {
        console.log(data)
        setUserLogged({
          login: true,
          token: data.data.token,
          user: data.data.user
        })
        localStorage.setItem('user', JSON.stringify(data.data.user))
        Swal.fire({
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        })
        navigate('/dashboard')
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const value = {
    getUsers,
    login,
    userLogged
  }
  return (
    <AuthUserContext.Provider value={value}>
      {children}
    </AuthUserContext.Provider>
  )
}

const useAuthUser = () => {
  const context = useContext(AuthUserContext)
  if (!context) {
    throw new Error('useAuthUser must be used within AuthUserProvider')
  }
  return context
}
export default useAuthUser
