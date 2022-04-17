import React, { useState } from 'react'
import { GetPatientDetails, MedicalRecordById } from '../apis/Apis'
import AppHeader from '../components/AppHeader'

export default function StudentMedicalHistory() {

  const [patientId, setPatientId] = useState([])
  const [records, setRecords] = useState([])

  const fnGetDetails = async () => {
    let res = await GetPatientDetails(patientId)
    console.log(res)

    if (res.data.message) {
      alert(res.data.message)
      return
    }
    let res1 = await MedicalRecordById(res.data.profileId)
    console.log(res1)
    setRecords(res1.data)
  }


  return (
    <>
      <AppHeader />
      <div className='mt-5' style={{ width: "60%", margin: 'auto' }}>
        <div className='text-center'>
          <h1>Student Medical History</h1>

          <form className='m-3 row align-items-center justify-content-center' onSubmit={(e) => {
            e.preventDefault()
            fnGetDetails()
          }}>
            <label htmlFor="role" className="col-sm-2 text-center">
              User Type
            </label>
            <div className="col-sm-4">
              <input
                type="text"
                name="name"
                value={patientId}
                className="form-control"
                id="name"
                placeholder="Name"
                onChange={(e) => {
                  setPatientId(e.target.value)
                }}
                required
              />
            </div>
            <button className='btn btn-primary col-sm-2'
            >Search</button>
          </form>

          {
            records.length !== 0 ? (
              <table className="table table-dark">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Problem</th>
                    <th scope="col">Diagnosis</th>
                    <th scope="col">Medicines</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>

                  {
                    records.map((record, id) => (
                      <tr key={id}>
                        <th scope="row">{id + 1}</th>
                        <td>{record.problem}</td>
                        <td>{record.drugs}</td>
                        <td>{record.diagnosis}</td>
                        <td>{record.date}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            )
            :
            <h3>
              Not Found
            </h3>
          }

        </div>
      </div>
    </>
  )
}
