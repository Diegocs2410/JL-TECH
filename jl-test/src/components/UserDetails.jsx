import { Card, Select } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import ModalEdit from './ModalEdit'
import { Modal, Button } from 'antd'

const { Option } = Select

const UserDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [user, setUser] = useState({})
  const userLogged = JSON.parse(localStorage.getItem('user'))

  const options = {
    headers: {
      authorization: 'Bearer ' + userLogged.data.token
    }
  }
  const [newImg, setNewImg] = useState('')

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        setIsLoading(true)
        const {
          data: { data }
        } = await axios.get(`/users/${id}`, options)
        setUser(data)
        setNewImg(data.avatar)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        setIsLoading(false)
      }
    }
    fetchUserById()
  }, [])

  function handleChange(value) {
    setUser({ ...user, role: value })
  }
  const updateUser = async () => {
    const formData = new FormData()
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('contact', user.contact)
    formData.append('role', user.role)

    formData.append('avatar', newImg)
    try {
      Swal.fire({
        title: 'Actualizando',
        text: 'Espere por favor',
        onBeforeOpen: () => {
          Swal.showLoading()
        }
      })
      user.avatar !== '' && formData.append('avatar', user.avatar)
      const { data } = await axios.put(`/users/${id}`, formData, options)
      Swal.fire({
        title: 'Actualizado',
        text: 'El usuario se actualizo correctamente',
        icon: 'success'
      })
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: 'Error',
        text: 'No se pudo actualizar el usuario',
        icon: 'error'
      })
    }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleSubmit = e => {
    e.preventDefault()
    updateUser()
  }
  const handleAction = () => {
    console.log('Hello')
  }
  const handleOk = () => {
    setIsModalVisible(false)
  }
  const validateFormat = e => {
    if (e.target.files[0].type && e.target.files) {
      const image = e.target.files[0]
      console.log(image)
      if (
        image.type === 'image/jpeg' ||
        image.type === 'image/jpeg' ||
        image.type === 'image/png' ||
        image.type === 'image/gif'
      ) {
        setNewImg(URL.createObjectURL(image))
        setUser({ ...user, avatar: image })
      } else {
        Swal.fire({
          title: 'Error',
          text: ' Just Images are allowed ',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        e.target.value = ''
      }
    }
  }
  //   Modal
  const ModalEdit = () => {
    return (
      <>
        <Button onClick={showModal}>
          <i className='fas fa-user-edit'></i>
        </Button>
        <Modal
          title='Edita tu perfil'
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <img src={newImg} alt='avatar' className='w-50 mb-2 mx-auto' />
          <input type='file' onChange={validateFormat} />
        </Modal>
      </>
    )
  }

  const { name, avatar, contact, email } = user
  return (
    <div className='container'>
      <h1 className='mt-3'>Editar Información</h1>
      <div className='d-flex mt-1'>
        <Card
          size='small'
          hoverable
          loading={isLoading}
          actions={[<ModalEdit user={user} />]}
          style={{ width: 250, margin: '10px' }}
          cover={
            <img
              alt='profile'
              src={newImg}
              style={{
                width: 220,
                margin: '0 auto',
                display: 'block',
                maxHeight: 200
              }}
            />
          }
        ></Card>
        <form onSubmit={handleSubmit}>
          <div className='card p-3 mt-2' style={{ width: '34rem' }}>
            <div className='row mb-3'>
              <label htmlFor='name' className='col-sm-3 fw-bold col-form-label'>
                Nombre
              </label>
              <div className='col-sm-9'>
                <input
                  type='txt'
                  className='form-control'
                  id='name'
                  value={name}
                  onChange={e => setUser({ ...user, name: e.target.value })}
                />
              </div>
            </div>
            <div className='row mb-3'>
              <label
                htmlFor='email'
                className='col-sm-3 fw-bold col-form-label'
              >
                Email
              </label>
              <div className='col-sm-9'>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  value={email}
                  onChange={e => setUser({ ...user, email: e.target.value })}
                />
              </div>
            </div>
            <div className='row mb-3'>
              <label
                htmlFor='contact'
                className='col-sm-3 fw-bold col-form-label'
              >
                Contacto
              </label>
              <div className='col-sm-9'>
                <input
                  type='text'
                  className='form-control'
                  id='contact'
                  value={contact}
                  onChange={e => setUser({ ...user, contact: e.target.value })}
                />
              </div>
            </div>
            <div className='row mb-3'>
              <label
                htmlFor='contact'
                className='col-sm-3 fw-bold col-form-label'
              >
                Role
              </label>
              <Select
                defaultValue='admin'
                style={{ width: 150 }}
                onChange={handleChange}
                allowClear
              >
                <Option value='Admin'>Admin</Option>
                <Option value='Recursos Humanos'>Recursos Humanos</Option>
                <Option value='Vendedor'>Vendedor</Option>
                <Option value='Bodeguero'>Bodeguero</Option>
              </Select>
            </div>
            <button type='submit' className='btn btn-primary btn-sm w-25 '>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserDetails
