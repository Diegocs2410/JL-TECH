import axios from "axios"
import authHeader from "./authHeader"

const getClients = async () => {
  try {
    const { data } = await axios.get("/clients", {
      headers: authHeader(),
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
const createClient = async (client) => {
  try {
    // verify if client exists in the database
    const { data } = await axios.post("/clients", client, {
      headers: authHeader(),
    })
    return data
  } catch (error) {
    console.log(error)
  }
}
const deleteClient = async (id) => {
  try {
    const { data } = await axios.delete(`/clients/${id}`, {
      headers: authHeader(),
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

const authService = {
  getClients,
  createClient,
  deleteClient,
}

export default authService
