import React, { useState, useEffect } from 'react'
import { MedicalRecordById } from '../apis/Apis'
import AppHeader from '../components/AppHeader'

function MedicalRecord() {

    const [records, setRecords] = useState([])

    const fnGetRecords = async () => {

        let res = await MedicalRecordById(sessionStorage.getItem("profileId"))
        console.log(res)
        setRecords(res.data)
    }

    useEffect(() => {
        fnGetRecords()
    }, [])


    return (
        <>
            <AppHeader />
            <div className='mt-5' style={{ width: "80%", margin: 'auto' }}>
                <h1 className='text-center'>Medical Record</h1>

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
                                    <th scope="row">{id+1}</th>
                                    <td>{record.problem}</td>
                                    <td>{record.drugs}</td>
                                    <td>{record.diagnosis}</td>
                                    <td>{record.date}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </>
    )
}

export default MedicalRecord