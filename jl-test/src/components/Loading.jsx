import { Spin } from 'antd'
const Loading = () => {
  return (
    <div className='min-vh-100 d-grid justify-content-center align-content-center'>
      <Spin size='large' />
    </div>
  )
}

export default Loading
