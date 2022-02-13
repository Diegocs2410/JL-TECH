import axios from "axios"
import React, { useState, useEffect } from "react"
import Loading from "../components/Loading"
import UsersList from "../components/UsersList"
import useAuthUser from "../context/AuthUser"

const Dashboard = () => {
  // states
  const [users, setUsers] = useState([])
  const { userLogged } = useAuthUser()
  const [isLoading, setIsLoading] = useState(false)

  // Options on post image
  const options = {
    headers: { authorization: "Bearer " + userLogged.data.token },
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.get("/users", options)
        setUsers(data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  return (
    <div className="container">
      <h1 className="text-danger mt-3">Usuarios</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="row">
          {users?.data?.map((user) => (
            <div className="col" key={user._id}>
              <UsersList user={user} loading={isLoading} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
