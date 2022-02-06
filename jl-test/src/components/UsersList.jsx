import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import useAuthUser from '../context/AuthUser'
const { Meta } = Card

const roleArr = ['admin', 'rh', 'vendedor', 'bodeguero']

const styleStr = role => {
  switch (role) {
    case 'admin':
      return 'Administrador'
    case 'rh':
      return 'Recursos Humanos'
    case 'vendedor':
      return 'Vendedor'
    case 'bodeguero':
      return 'Bodeguero'
    default:
      return 'Administrador'
  }
}

const UsersList = ({ user, isLoading }) => {
  const { name, avatar, contact, role, _id } = user
  const { userLogged } = useAuthUser

  // Handle delete user
  const handleDelete = async () => {}

  return (
    <Card
      size='large'
      title={name.toUpperCase()}
      hoverable
      loading={isLoading}
      extra={
        <>
          <Link to={`/userdetails/${_id}`}>Editar</Link>
          {/* {userLogged.user.role === 'admin' && (
            <button
              className='btn btn-danger btn-sm ms-2'
              onClick={handleDelete}
            >
              Eliminar
            </button>
          )} */}
        </>
      }
      style={{ width: 240, height: 360, margin: '10px' }}
      cover={
        <img
          alt='profile'
          src={avatar}
          style={{
            width: 220,
            margin: '0 auto',
            display: 'block',
            maxHeight: 200
          }}
        />
      }
    >
      <div className='d-flex'>
        <span className='badge bg-primary me-2 mb-2'>Role: </span>
        <Meta title={styleStr(role)} />
      </div>
      <div className='d-flex'>
        <span className='badge bg-primary me-2'>Contacto: </span>
        <Meta title={contact} />
      </div>
    </Card>
  )
}

export default UsersList
