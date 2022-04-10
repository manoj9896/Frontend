import React from 'react'
import AppHeader from '../components/AppHeader'

export default function Register() {
  
  return (
    <>
      <AppHeader />
      <div className='m-5'>
        <h2 className='text-center mb-4'>NEW APPOINTMENT</h2>
        <form>
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <input type="text" placeholder="First Name" className="form-control" />
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input type="text" placeholder="Last Name" id="form3Example2" className="form-control" />
              </div>
            </div>
          </div>
          {/* Student email*/}
          <div className="form-outline mb-4">
            <input type="email" placeholder="Email Address" id="form3Example3" className="form-control" />
          </div>
          {/* Student ID */}
          <div className="form-outline mb-4">
            <input type="ID" placeholder="ID no." id="form3Example4" className="form-control" />
          </div>
          {/* Medical issue */}
          <div className="form-outline mb-4">
            <label className="form-label" htmlFor="form4Example3">
              Medical Problem
            </label>
            <textarea
              className="form-control"
              id="form4Example3"
              rows={4}
              defaultValue={""}
            />
          </div>
          {/* Submit button */}
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Book Appointment
          </button>
        </form>
      </div>
    </>
  )
}
