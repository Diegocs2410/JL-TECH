import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'antd'
import axios from 'axios'
import Swal from 'sweetalert2'

const ModalEdit = ({ user }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [userUpdated, setUserUpdated] = useState({})
  const userLogged = JSON.parse(localStorage.getItem('user'))
  const [newImg, setNewImg] = useState(user.avatar)
  const options = {
    headers: { authorization: 'Bearer ' + userLogged.data.token }
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleUpdate = async () => {
    const formData = new FormData()
    formData.append('avatar', newImg)

    try {
      await axios.put(`/users/${user._id}`, userUpdated, options)
    } catch (error) {
      console.log(error)
    }
    console.log('update')
  }
  const handleOk = () => {
    console.log(userUpdated)
    handleUpdate()
    setIsModalVisible(false)
  }
  const validateFormat = e => {
    if (e.target.files[0].type && e.target.files) {
      const image = e.target.files[0]
      if (
        image.type === 'image/jpeg' ||
        image.type === 'image/jpeg' ||
        image.type === 'image/png' ||
        image.type === 'image/gif'
      ) {
        setNewImg(URL.createObjectURL(image))
        setUserUpdated({ ...user, avatar: image })
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

export default ModalEdit
