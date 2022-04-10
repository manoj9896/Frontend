import React from 'react'

export default function AppHeader() {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid justify-content-start">

                <a className="navbar-brand" href="/home">
                    Navbar
                </a>

                <div className="" style={{ flex: '1' }}>
                    <ul className="navbar-nav flex-row justify-content-start align-items-center me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <a className="nav-link" href="/home">
                                Home
                            </a>
                        </li>

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
                                href="/newAppointment"
                            >
                                Medical Record
                            </a>
                        </li>

                        <li className="nav-item" style={{ marginLeft: 'auto' }}>
                            <a
                                className="nav-link"
                                href="#"
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
