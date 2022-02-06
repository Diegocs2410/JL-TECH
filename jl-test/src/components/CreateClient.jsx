import React from 'react'

const CreateClient = () => {
  const handleSubmit = e => {
    console.log('submit')
  }

  return (
    <div className='container mt-3'>
      <form onSubmit={handleSubmit}>
        <h1 className='display-4 text-center'>Crear Cliente</h1>
        <fieldset>
          <div className='card w-50 mx-auto p-5'>
            <div className='form-floating mb-3'>
              <input
                type='email'
                className='form-control'
                id='floatingInput'
                placeholder='name@example.com'
              />
              <label htmlFor='floatingInput'>Email address</label>
            </div>
            <div className='form-floating'>
              <input
                type='password'
                className='form-control'
                id='floatingPassword'
                placeholder='Password'
              />
              <label htmlFor='floatingPassword'>Password</label>
            </div>
            <button className='btn btn-primary mt-3'>Crear</button>
          </div>
        </fieldset>
      </form>
      {/* Table */}
      <table class='table table-dark table-striped'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>First</th>
            <th scope='col'>Last</th>
            <th scope='col'>Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope='row'>1</th>
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
