import { useState, useEffect, useCallback } from "react"
import Loading from "./Loading"
import { useGetClientsQuery } from "../redux/services/clients"
import useAuthUser from "../context/AuthUser"
import { useDispatch, useSelector } from "react-redux"
import { createClient, getClients, deleteClient } from "../redux/slices/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import moment from "moment"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

const initialState = {
  name: "",
  email: "",
  contact: 0,
}
const CreateClient = () => {
  const [clientData, setClientData] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const { data, error, isLoading } = useGetClientsQuery("clients", {
  //   Headers: {
  //     authorization: "Bearer " + userLogged.data.token,
  //   },
  // })
  const clients = useSelector(({ client }) => client)

  useEffect(() => {
    dispatch(getClients())
  }, [dispatch])

  const handleChange = ({ target: { name, value } }) => {
    setClientData({ ...clientData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createClient(clientData))
    setClientData(initialState)
    Swal.fire({
      title: "Cliente creado",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      text: "El cliente ha sido creado con éxito",
      icon: "success",
      showConfirmButton: false,
      timer: 1500,
    })
  }
  const handleDelete = (id) => {
    // Fire swal to confirm delete
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este cliente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Eliminado!", "Cliente Eliminado con éxito.", "success", {
          showConfirmButton: false,
        })
        dispatch(deleteClient(id))
      }
    })
    dispatch(getClients())
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
                autoFocus
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
      {clients.isLoading ? (
        <Loading />
      ) : (
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Creado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.clients?.map(
              ({ _id: id, name, contact, email, createdAt }, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{contact}</td>
                  <td>{moment(createdAt).format("MMM Do YY")}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-3">
                      <FontAwesomeIcon
                        icon={faPenSquare}
                        className="me-2 text-white"
                      />
                    </button>

                    <button
                      className="btn btn-danger btn-sm "
                      onClick={() => handleDelete(id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="me-2 text-white"
                      />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default CreateClient
