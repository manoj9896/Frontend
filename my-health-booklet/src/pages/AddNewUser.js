import React, { useState } from 'react'
import { AddNewUserApi } from '../apis/Apis'

function AddNewUser() {

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Patient",
  })

  const fnAddUser = async () => {
    console.log(newUser)
    let res = await AddNewUserApi(newUser)
    alert(res.data.message)
    setNewUser({
      name: "",
      email: "",
      role: "Patient",
    })
  }

  return (
    <div className='mt-5' style={{ width: "60%", margin: 'auto' }}>
      <h1 className='text-center'>Add New User</h1>
      <div>
        <form onSubmit={(e)=>{
          e.preventDefault()
          console.log(newUser)
          fnAddUser()
        }}>
          <div className="row align-items-center margin-auto">

            <div className='m-3 row align-items-center margin-auto'>
              <label htmlFor="name" className="col-sm-2 text-end">
                Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  placeholder="Name"
                  required
                  onChange={(e) => {
                    setNewUser({ ...newUser, [e.target.name]: e.target.value })
                  }}
                  
                />
              </div>
            </div>

            <div className='m-3 row align-items-center margin-auto'>
              <label htmlFor="email" className="col-sm-2 text-end">
                Email
              </label>
              <div className="col-sm-8">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  pattern=".+@iitk.ac.in"
                  required
                  onChange={(e) => {
                    setNewUser({ ...newUser, [e.target.name]: e.target.value })
                  }}
                />
              </div>
            </div>

            <div className='m-3 row align-items-center margin-auto'>
              <label htmlFor="role" className="col-sm-2 text-end">
                User Type
              </label>
              <div className="col-sm-8">
                <select
                  onChange={(e) => {
                    console.log(e.target.value)
                    setNewUser({ ...newUser, [e.target.name]: e.target.value })
                  }}
                  name="role"
                  className="form-select"
                  aria-label="Default select example"
                  id='role'
                >
                  <option value={"Patient"}> Patient </option>
                  <option value={"Doctor"}> Doctor </option>
                  <option value={"Receptionist"}> Receptionist </option>                 

                </select>
              </div>
            </div>

            <div className='m-2 d-flex justify-content-center'>
              <button type='submit' className='btn btn-success col-sm-4'>Add User</button>
            </div>

          </div>

        </form>
      </div>
    </div>
  )
}

export default AddNewUser