import React, { useState } from 'react'
import { AddAppointmentApi } from '../apis/Apis'
import AppHeader from '../components/AppHeader'

export default function Register() {

  const [problem, setProblem] = useState("")
  const [subject, setSubject] = useState("")

  const fnAddAppointment = async () => {

    let p = problem.trim()
    let s = subject.trim()
    if (p === "" || s==="") {
      alert("Medical Problem and Subject should not be empty")
      return
    }
    let res = await AddAppointmentApi(p,s)
    console.log(res)
    if (res.data.message) alert(res.data.message)

    setProblem("")
    setSubject("")

  }

  return (
    <>
      <AppHeader />
      <div className='mt-5' style={{ width: "60%", margin: 'auto' }}>
        <h2 className='text-center mb-4'>NEW APPOINTMENT</h2>
        <form onSubmit={(e) => {
          e.preventDefault()
          fnAddAppointment()
        }}>
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <input type="text" placeholder="Name" className="form-control" disabled value={sessionStorage.getItem("name")} />
              </div>
            </div>
          </div>

          <div className="form-outline mb-4">
            <input type="email" placeholder="Email Address" id="form3Example3" className="form-control" disabled value={sessionStorage.getItem("email")} />
          </div>

          <div className="form-outline mb-4">
            <input type="text" placeholder="Title" id="form3Example3" className="form-control" value={subject}
              onChange={(e) => {
                setSubject(e.target.value)
              }} required/>
          </div>

          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form4Example3">
              Medical Problem Description
            </label>
            <textarea
              className="form-control"
              id="form4Example3"
              rows={4}
              value={problem}
              onChange={(e) => {
                setProblem(e.target.value)
              }}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">
            Book Appointment
          </button>
        </form>
      </div>
    </>
  )
}
