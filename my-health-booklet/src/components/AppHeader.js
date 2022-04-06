import React from 'react'

export default function AppHeader() {
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">

                <a className="navbar-brand" href="#">
                    Navbar
                </a>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Link
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                                tabIndex={-1}
                                aria-disabled="true"
                            >
                                Disabled
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
        
    )
}
