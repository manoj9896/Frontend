import axios from 'axios'
const backEndServer = "http://localhost:8000/"

export async function LoginApi(userId, password) {
    let url = backEndServer + "checkLogin"

    let params = {
        userId: userId,
        password: password
    }
    let res = await axios.get(url, { params })
    return res;
}

export async function ProfileDetailsApi(id) {

    let url = backEndServer + "profileDetails"
    let params = {
        profileId: id
    }
    let res = await axios.get(url, { params })
    return res;

}

export async function AddAppointmentApi(problem,subject) {

    let url = backEndServer + "addAppointment"
    let date = new Date()
    date = date.toISOString().slice(0, 19).replace('T', ' ');
    let params = {
        patientId: sessionStorage.getItem('profileId'),
        problem: problem,
        status: 0,
        date: date,
        subject : subject
    }
    let res = await axios.get(url, { params })
    return res;

}

export async function GetAppointments() {

    let url = backEndServer + "getAppointments"
    let res = await axios.get(url)
    return res;

}

export async function GetAppointmentsOfPatient() {

    let url = backEndServer + "getAppointmentsByPatientId"
    let params = {
        patientId: sessionStorage.getItem('profileId'),
    }
    let res = await axios.get(url, { params })
    return res;

}

export async function GetAppointmentsOfDoctor() {

    let url = backEndServer + "getAppointmentsByDoctorId"
    let params = {
        doctorId: sessionStorage.getItem('profileId'),
    }
    let res = await axios.get(url, { params })
    return res;

}

export async function GetDoctors() {

    let url = backEndServer + "getDoctors"
    let res = await axios.get(url)
    return res;
}

export async function MedicalRecordById(patient_id) {

    let url = backEndServer + "getMedicalRecordById"

    let params = {
        patientId : patient_id
    }
    let res = await axios.get(url,{params})
    return res;
}

export async function GetDoctorsById(doc_id) {

    let url = backEndServer + "getDoctorsById"

    let params = {
        doctorId : doc_id
    }
    let res = await axios.get(url,{params})
    return res;
}

export async function GetPatientDetails(userId) {

    let url = backEndServer + "getProfileId"

    let params = {
        userId : userId
    }
    let res = await axios.get(url,{params})
    return res;
}

export async function SendNotification(message,email) {

    let url = backEndServer + "sendNotificationOfAppointment"

    let params = {
        message:message,
        email : email
    }
    let res = await axios.get(url,{params})
    return res;
}

export async function UpdateAppointment(mrNo,status,doctorId) {

    let url = backEndServer + "updateAppointment"
    let date = new Date()
    date = date.toISOString().slice(0, 19).replace('T', ' ');

    let params = {
        mrNo: mrNo,
        status: status,
        doctorId: doctorId,
        date: date
    }
    console.log(params)
    let res = await axios.get(url,{params})
    return res;
}

export async function UpdatePassword(new_pass) {

    let url = backEndServer + "changePassword"
    let params = {
        newPassword : new_pass,
        profileId : sessionStorage.getItem("profileId")
    }
    let res = await axios.get(url,{params})
    return res;
}

export async function AddNewUserApi(user) {

    let url = backEndServer + "addNewUser"

    let params = {
        name : user.name.trim(), 
        email : user.email.trim(), 
        role : user.role.trim()
    }
    
    let res = await axios.get(url,{params})
    return res;
}

export async function AddToMedicalRecord(diagnosis,medicines,patientId,problem) {

    let url = backEndServer + "addToMedicalRecord"
    let date = new Date()
    date = date.toISOString().slice(0, 19).replace('T', ' ');

    let params = {
        problem : problem,
        medicines : medicines,
        diagnosis : diagnosis,
        patientId : patientId,
        doctorId : sessionStorage.getItem("profileId"),
        date : date
    }
    
    let res = await axios.get(url,{params})
    return res;
}

