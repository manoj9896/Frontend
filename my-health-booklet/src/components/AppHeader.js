import React from 'react'

export default function AppHeader() {
    const role = sessionStorage.getItem("role")

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid justify-content-start">

                <a className="navbar-brand" href="/home">
                    Health Digitalization System
                </a>

                <div className="" style={{ flex: '1' }}>
                    <ul className="navbar-nav flex-row justify-content-start align-items-center me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <a className="nav-link" href="/home">
                                Home
                            </a>
                        </li>

                        {
                            role === "Patient" && (
                                <>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            href="/newAppointment"
                                        >
                                            Registration
                                        </a>
                                    </li>

                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            href="/medicalHistory"
                                        >
                                            Medical Record
                                        </a>
                                    </li>
                                </>
                            )
                        }

                        {
                            role === "Doctor" && (
                                <li className="nav-item">
                                    <a
                                        className="nav-link"
                                        href="/medicalHistory"
                                    >
                                        Student Medical History
                                    </a>
                                </li>
                            )
                        }

                        <li className="nav-item" style={{ marginLeft: 'auto' }}>
                            <a
                                className="nav-link"
                                href="/profile"
                            >
                                My Profile
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="/login"
                                onClick={() => {
                                    sessionStorage.clear()
                                    window.location.reload()
                                }}
                            >
                                Logout
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>

    )
}
