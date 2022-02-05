import axios from 'axios'
import React, { useState, useEffect } from 'react'
import useAuthUser from '../context/AuthUser'

const Dashboard = () => {
  // states
  const [users, setUsers] = useState([])
  const { userLogged } = useAuthUser()
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/users')
      } catch (err) {
        console.log(err)
      }
    }
  }, [])

  return (
    <div className='container'>
      <h1 className='text-danger mt-3'>Panel Usuario</h1>
    </div>
  )
}

export default Dashboard
