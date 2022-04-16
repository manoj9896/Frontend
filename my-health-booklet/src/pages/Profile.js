import React, { useState ,useEffect} from 'react'
import { ProfileDetailsApi } from '../apis/Apis'
import AppHeader from '../components/AppHeader'
import ChangePassword from '../components/ChangePassword'

function Profile() {

    const [editProfile, seteditProfile] = useState(true)
    const [profileDetails, setProfileDetails] = useState({
        "loginId": "",
        "name": "",
        "phoneNo": "",
        "email": "",
        "department": "",
        "address": "",
        "rollNo": ""
    })
    useEffect(() => {
        fnGetProfileDetails()
    }, [])

    const fnGetProfileDetails = async ()=>{
        let res = await ProfileDetailsApi(sessionStorage.getItem("profileId"))
        console.log(res.data)
        setProfileDetails(res.data)
    }
    
    return (
        <>
            <AppHeader />
            {
                editProfile && (
                    <div className='m-5'>
                        <form className="needs-validation" noValidate="">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationCustom01" style={{ fontSize: '20px' }}>First name</label>
                                    <input
                                        type="text"
                                        value={profileDetails.name}
                                        className="form-control"
                                        id="validationCustom01"
                                        placeholder="First name"
                                        disabled
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationCustomUsername" style={{ fontSize: '20px' }}>Username</label>
                                    <input
                                        type="text"
                                        value={profileDetails.loginId}
                                        className="form-control"
                                        id="validationCustomUsername"
                                        placeholder="Username"
                                        disabled
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="validationCustomUsername" style={{ fontSize: '20px' }}>Roll No</label>
                                    <input
                                        type="text"
                                        value={profileDetails.rollNo}
                                        className="form-control"
                                        id="validationCustomUsername"
                                        placeholder="Roll No"
                                        disabled
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="validationCustomUsername" style={{ fontSize: '20px' }}>Email</label>
                                    <input
                                        type="email"
                                        value={profileDetails.email}
                                        className="form-control"
                                        id="validationCustomUsername"
                                        placeholder="email"
                                        disabled
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="validationCustomUsername" style={{ fontSize: '20px' }}>Department</label>
                                    <input
                                        type="text"
                                        value={profileDetails.department}
                                        className="form-control"
                                        id="validationCustomUsername"
                                        placeholder="Department"
                                        disabled
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="validationCustomUsername" style={{ fontSize: '20px' }}>Address</label>
                                    <input
                                        type="text"
                                        value={profileDetails.address}
                                        className="form-control"
                                        id="validationCustomUsername"
                                        placeholder="Address"
                                        disabled
                                    />
                                </div>
                            </div>
                        </form>
                        <div>
                            <button className='btn btn-primary' onClick={()=>{
                                seteditProfile(false)
                            }}>Edit Profile</button>
                        </div>
                    </div>
                )
            }
            {
                !editProfile && (
                    <div className='m-5'>
                        <form className="needs-validation" noValidate="">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationCustom01" style={{ fontSize: '20px' }}>First name</label>
                                    <input
                                        type="text"
                                        value={profileDetails.name}
                                        className="form-control"
                                        id="validationCustom01"
                                        placeholder="First name"
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationCustomUsername" style={{ fontSize: '20px' }}>Username</label>
                                    <input
                                        type="text"
                                        value={profileDetails.loginId}
                                        className="form-control"
                                        id="validationCustomUsername"
                                        placeholder="Username"
                                        disabled
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="validationCustomUsername" style={{ fontSize: '20px' }}>Roll No</label>
                                    <input
                                        type="text"
                                        value={profileDetails.rollNo}
                                        className="form-control"
                                        id="validationCustomUsername"
                                        placeholder="Roll No"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="validationCustomUsername" style={{ fontSize: '20px' }}>Email</label>
                                    <input
                                        type="email"
                                        value={profileDetails.email}
                                        className="form-control"
                                        id="validationCustomUsername"
                                        placeholder="email"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="validationCustomUsername" style={{ fontSize: '20px' }}>Department</label>
                                    <input
                                        type="text"
                                        value={profileDetails.department}
                                        className="form-control"
                                        id="validationCustomUsername"
                                        placeholder="Department"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="validationCustomUsername" style={{ fontSize: '20px' }}>Address</label>
                                    <input
                                        type="text"
                                        value={profileDetails.address}
                                        className="form-control"
                                        id="validationCustomUsername"
                                        placeholder="Address"
                                    />
                                </div>
                            </div>
                        </form>
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-success' onClick={()=>{
                                seteditProfile(true)
                            }}>Update Profile</button>
                        </div>
                    </div>
                )
            }

            <hr />
            <ChangePassword />
        </>
    )
}

export default Profile