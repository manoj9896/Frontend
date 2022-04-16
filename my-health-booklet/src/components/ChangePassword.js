import React, { useState } from 'react'
import { UpdatePassword } from '../apis/Apis'

function ChangePassword() {

    const [changePassword, setchangePassword] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const fnUpdatePassword = async () => {
        if (newPassword.length < 8) {
            alert("Password should have more than 8 letters or digits !!")
            setNewPassword("")
            setConfirmPassword("")
            return
        }

        if (newPassword !== confirmPassword) {
            alert("New Password and Confirm Password are not matching")
            setNewPassword("")
            setConfirmPassword("")
            return
        }

        let res = await UpdatePassword(newPassword)
        alert(res.data.message)
        setNewPassword("")
        setConfirmPassword("")
        return
    }

    return (
        <div className='m-5'>


            {
                !changePassword
                    ?
                    (
                        <>
                            <div className="row align-items-center">
                                <label htmlFor="userPassword" className="col-sm-2">
                                    Password
                                </label>
                                <div className="col-sm-4">
                                    <input
                                        type="password"
                                        value={JSON.parse(sessionStorage.getItem("user")).password}
                                        className="form-control"
                                        id="userPassword"
                                        placeholder="Password"
                                        disabled
                                    />
                                </div>
                                <div className="col-auto">
                                    <div className="custom-control custom-checkbox d-flex align-items-center">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customControlAutosizing"
                                            style={{ marginRight: '3px', zoom: '2' }}
                                            onClick={() => {
                                                let userPassword = document.getElementById("userPassword")
                                                if (userPassword.type === "password") {
                                                    userPassword.type = "text";
                                                } else {
                                                    userPassword.type = "password";
                                                }
                                            }}
                                        />
                                        <label className="custom-control-label" htmlFor="customControlAutosizing">
                                            Show Password
                                        </label>
                                    </div>
                                </div>

                            </div>

                            <div>
                                <button className='btn btn-success' onClick={() => {
                                    setchangePassword(true)
                                }}>Change Password</button>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <div className="row align-items-center">
                                <div className='m-2 row align-items-center'>
                                    <label htmlFor="cahngePassword" className="col-sm-2">
                                        New Password
                                    </label>
                                    <div className="col-sm-4">
                                        <input
                                            type="password"
                                            value={newPassword}
                                            className="form-control"
                                            id="cahngePassword"
                                            placeholder="New Password"
                                            onChange={(e) => {
                                                setNewPassword(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='m-2 row align-items-center'>
                                    <label htmlFor="confirmPassword" className="col-sm-2">
                                        Confirm Password
                                    </label>
                                    <div className="col-sm-4">
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={confirmPassword}
                                            id="confirmPassword"
                                            placeholder="Confirm Password"
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='m-2'>

                                <button className='btn btn-success' onClick={() => {
                                    fnUpdatePassword()
                                }}>Update Password</button>

                                <button className='btn btn-warning' style={{ marginLeft: "10px" }} onClick={() => {
                                    setchangePassword(false)
                                }}>Go Back</button>
                                
                            </div>
                        </>
                    )
            }


        </div>
    )
}

export default ChangePassword