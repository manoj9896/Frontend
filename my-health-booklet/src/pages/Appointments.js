import React, { useEffect, useState } from 'react'
import { GetAppointments, GetAppointmentsOfDoctor, GetAppointmentsOfPatient, GetDoctors, ProfileDetailsApi, UpdateAppointment } from '../apis/Apis';

export default function Appointments() {

    const role = sessionStorage.getItem("role")
    const [patientAppointments, setPatientAppointments] = useState([])
    const [recepAppointments, setRecepAppointments] = useState([])
    const [docpAppointments, setDocAppointments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [doc_option, setDocOption] = useState("")

    const fnApplyJS = () => {
        let question = document.querySelectorAll(".question");
        console.log(question)

        question.forEach(question => {
            question.addEventListener("click", event => {
                const active = document.querySelector(".question.active");
                if (active && active !== question) {
                    active.classList.toggle("active");
                    active.nextElementSibling.style.maxHeight = 0;
                }
                question.classList.toggle("active");
                const answer = question.nextElementSibling;
                if (question.classList.contains("active")) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                } else {
                    answer.style.maxHeight = 0;
                }
            })
        })

        console.log("fnApplyJs")

    }

    const fnPatientAppointments = async () => {
        let res = await GetAppointmentsOfPatient()
        console.log(res)

        let arr = res.data.data;
        console.log(arr)
        let appointments = []

        for (let i = 0; i < arr.length; i++) {
            let date = new Date(arr[i].date)
            date = date.toISOString().slice(0, 19).replace('T', ' ');
            let obj = {
                title: arr[i].subject,
                desc: arr[i].problem,
                date: date
            }
            if (arr[i].status !== 2)
                appointments.push(obj)
        }
        console.log(appointments)

        setPatientAppointments(appointments.reverse())
    }

    const fnGetPatientDetaisl = async (pid) => {
        let res = await ProfileDetailsApi(pid)
        return res.data
    }

    const fnGetDoctors = async () => {
        let res = await GetDoctors()
        setDoctors(res.data.data)
    }

    const fnRecptionistAppointments = async () => {
        let res = await GetAppointments()
        let arr = res.data.data;

        let appointments = []

        for (let i = 0; i < arr.length; i++) {
            let date = new Date(arr[i].date)
            date = date.toISOString().slice(0, 19).replace('T', ' ');
            let obj = {
                title: "Appointment No. " + (i + 1),
                desc: arr[i].problem,
                date: date,
                patient: await fnGetPatientDetaisl(arr[i].patient_id),
                mr_no: arr[i].mr_no
            }
            if (arr[i].status === 0)
                appointments.push(obj)
        }
        console.log(appointments)
        fnGetDoctors()
        setRecepAppointments(appointments.reverse())
    }

    const fnUpdateRegistration = async (num) => {
        let res = await UpdateAppointment(num, 1, doc_option)
        console.log(res)
        fnRecptionistAppointments()
    }

    const fnDoctorAppointments = async () => {
        let res = await GetAppointmentsOfDoctor()
        let arr = res.data.data;
        console.log("arr res", arr)
        let appointments = []

        for (let i = 0; i < arr.length; i++) {
            let date = new Date(arr[i].date)
            date = date.toISOString().slice(0, 19).replace('T', ' ');
            let obj = {
                title: arr[i].subject,
                desc: arr[i].problem,
                date: date,
                patient: await fnGetPatientDetaisl(arr[i].patient_id)
            }
            if (arr[i].status === 1)
                appointments.push(obj)
        }
        console.log("doc appointments", appointments)

        setDocAppointments(appointments.reverse())
    }

    useEffect(() => {
        if (role === "Patient")
            fnPatientAppointments()
        else if (role === "Doctor") fnDoctorAppointments()
        else fnRecptionistAppointments()
        setTimeout(() => {
            fnApplyJS()
        }, 1000);
    }, [])

    return (
        <div className='m-5 text-center'>

            <h1>Upcoming Appointment</h1>

            {
                role === "Patient" && (
                    <>
                        <div className="wrapper">
                            {
                                patientAppointments.map((appointment, id) => (
                                    <div className="container" key={id}>
                                        <div className="question d-flex justify-content-between">
                                            {appointment.title}
                                            <div>{appointment.date}</div>
                                        </div>
                                        <div className="answercont">
                                            <div className="answer">
                                                {appointment.desc}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </>
                )
            }
            {
                role === "Receptionist" && (
                    <>
                        <div className="wrapper">
                            {
                                recepAppointments.map((appointment, id) => (
                                    <div className="container" key={id}>
                                        <div className="question">
                                            {appointment.title}
                                        </div>
                                        <div className="answercont">
                                            <div className="answer">
                                                <p style={{ fontWeight: 'bold' }}>Name : {appointment.patient.name}</p>
                                                <p style={{ fontWeight: 'bold' }}>Email : {appointment.patient.email}</p>
                                                <p style={{ fontWeight: 'bold' }}>Problem : {appointment.desc}</p>
                                            </div>

                                            <div className='mb-3 d-flex justify-content-around'>
                                                <div>
                                                    <select
                                                        onChange={(e) => {
                                                            setDocOption(e.target.value)
                                                        }}
                                                        className="form-select"
                                                        aria-label="Default select example">
                                                        <option defaultValue={2}>Assign a Doctor</option>
                                                        {
                                                            doctors.map((doc, id) => (
                                                                <option value={doc.doctor_id} key={id}>{doc.doctor_name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                {
                                                    doc_option === ""
                                                        ?
                                                        <button className='btn btn-primary' disabled>Assign Doctor</button>
                                                        :
                                                        <button
                                                            onClick={() => {
                                                                fnUpdateRegistration(appointment.mr_no)
                                                                setDocOption("")
                                                            }}
                                                            className='btn btn-primary'
                                                        >Assign Doctor</button>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </>
                )
            }
            {
                role === "Doctor" && (
                    <>
                        <div className="wrapper">
                            {
                                docpAppointments.map((appointment, id) => (
                                    <div className="container" key={id}>
                                        <div className="question">
                                            {appointment.title}
                                        </div>
                                        <div className="answercont">
                                            <div className="answer">
                                                <p style={{ fontWeight: 'bold' }}>Name : {appointment.patient.name}</p>
                                                <p style={{ fontWeight: 'bold' }}>Email : {appointment.patient.email}</p>
                                                <p style={{ fontWeight: 'bold' }}>Problem : {appointment.desc}</p>
                                            </div>
                                            <div className="answer">
                                                All medical information such as: name, id, Phone number, doctor name, status, disease.
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </>
                )
            }

        </div>

    )
}
