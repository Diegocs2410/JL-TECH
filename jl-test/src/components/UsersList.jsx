import React from 'react'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
const { Meta } = Card

const UsersList = ({ user, isLoading }) => {
  const { name, avatar, contact, role, _id } = user
  return (
    <Card
      size='large'
      title={name.toUpperCase()}
      hoverable
      loading={isLoading}
      extra={<Link to={`/userdetails/${_id}`}>Editar</Link>}
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
        <Meta title={role} />
      </div>
      <div className='d-flex'>
        <span className='badge bg-primary me-2'>Contacto: </span>
        <Meta title={contact} />
      </div>
    </Card>
  )
}

export default UsersList
