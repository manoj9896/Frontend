import React, { useEffect, useState } from 'react'
import { AddToMedicalRecord, GetAppointments, GetAppointmentsOfDoctor, GetAppointmentsOfPatient, GetDoctors, ProfileDetailsApi, UpdateAppointment } from '../apis/Apis';
import ResolveMedicalProblem from '../components/ResolveMedicalProblem';

export default function Appointments() {

    const role = sessionStorage.getItem("role")
    const [patientAppointments, setPatientAppointments] = useState([])
    const [recepAppointments, setRecepAppointments] = useState([])
    const [docpAppointments, setDocAppointments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [doc_option, setDocOption] = useState("")
    const [openModal, setModal] = useState(false)
    const [patientId, setpatientId] = useState("")
    const [problem, setproblem] = useState("")
    const [mr_no, setmr_no] = useState("")

    const toggleModal = () => setModal(!openModal)

    const fnApplyJS = () => {
        let question = document.querySelectorAll(".question");

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

        setPatientAppointments(appointments)
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
        setRecepAppointments(appointments)
    }

    const fnUpdateRegistration = async (num,doc_id) => {
        let res = await UpdateAppointment(num, 1, doc_id)
        console.log(res)
        
        window.location.reload()
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
                patient: await fnGetPatientDetaisl(arr[i].patient_id),
                mr_no: arr[i].mr_no
            }
            if (arr[i].status === 1)
                appointments.push(obj)
        }
        console.log("doc appointments", appointments)

        setDocAppointments(appointments)
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

    const fnAddToMedicalRecord = async (diagnosis, medicines) => {
        let res = await AddToMedicalRecord(diagnosis, medicines, patientId, problem)
        if (res.data.message) {
            alert(res.data.message)
        }
        let res2 = await UpdateAppointment(mr_no, 2, sessionStorage.getItem("profileId"))
        console.log(res2)
        toggleModal()
        window.location.reload()
    }

    return (
        <div className='m-5 text-center'>

            <ResolveMedicalProblem
                addPost={openModal}
                setaddPost={setModal}
                toggleAddPost={toggleModal}
                fnAddToMedicalRecord={fnAddToMedicalRecord}
            />

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

                                            <div className='mb-3 row'>
                                                <label htmlFor="selectDoctor" className="col-sm-4 mt-1">
                                                    Assign a Doctor
                                                </label>
                                                <div className='col-sm-4 '>
                                                    <select
                                                        id="selectDoctor"
                                                        className="form-select"
                                                        aria-label="Default select example">
                                                        {
                                                            doctors.map((doc, id) => (
                                                                <option value={doc.doctor_id} key={id}>{doc.doctor_name}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        let selectDoctor = document.getElementById("selectDoctor")
                                                        let doc_id = selectDoctor.value
                                                        console.log(doc_id)
                                                        fnUpdateRegistration(appointment.mr_no,doc_id)                                        
                                                    }}
                                                    className='btn btn-primary col-sm-4'
                                                >Assign Doctor</button>
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
                                        <div className="question d-flex justify-content-between">
                                            {appointment.title}
                                            <div>
                                                <button className='btn btn-info' onClick={() => {
                                                    setpatientId(appointment.patient.profileId)
                                                    setproblem(appointment.problem)
                                                    setmr_no(appointment.mr_no)
                                                    toggleModal()
                                                }}>Close the Issue</button>
                                            </div>
                                        </div>
                                        <div className="answercont">
                                            <div className="answer">
                                                <p style={{ fontWeight: 'bold' }}>Name : {appointment.patient.name}</p>
                                                <p style={{ fontWeight: 'bold' }}>Email : {appointment.patient.email}</p>
                                                <p style={{ fontWeight: 'bold' }}>Problem : {appointment.desc}</p>
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
