import axios from "axios"
import { useState, useEffect, useCallback } from "react"
import useAuthUser from "../context/AuthUser"
import Loading from "./Loading"

const initialState = {
  name: "",
  email: "",
  contact: 0,
}
const CreateClient = () => {
  const [clientData, setClientData] = useState(initialState)
  const [clientsDB, setClientsDB] = useState([])

  const { isLoading, setIsLoading, userLogged, getClients } = useAuthUser()

  
  const handleChange = ({ target: { name, value } }) => {
    setClientData({ ...clientData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("submit")
  }

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <h1 className="display-4 text-center">Crear Cliente</h1>
        <fieldset>
          <div className="card w-50 mx-auto p-5">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingName"
                placeholder="Escribe tu nombre"
                value={clientData.name}
                name="name"
                onChange={handleChange}
              />
              <label htmlFor="floatingName">Nombre </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingContact"
                placeholder="Tel: +57 (55) 5555 5555"
                value={clientData.contact}
                name="contact"
                onChange={handleChange}
              />
              <label htmlFor="floatingContact">Numero Contacto</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={clientData.email}
                name="email"
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <button className="btn btn-primary mt-3">Crear</button>
          </div>
        </fieldset>
      </form>
      {/* Table */}
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CreateClient
