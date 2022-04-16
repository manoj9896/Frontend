import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { LoginApi } from '../apis/Apis'

function LoginPage(props) {
    const history = useHistory()
    console.log(history)

    const { setToken, setloggedIN } = props

    const [userName, setuserName] = useState("")
    const [password, setpassword] = useState("")

    const fnCheckLogin = async () => {
        console.log(userName, password)
        let res = await LoginApi(userName, password)
        console.log(res)

        if (res.data.message) {
            alert(res.data.message)
            return
        }

        let myObj = res.data

        sessionStorage.setItem('profileId', myObj.profileId)
        sessionStorage.setItem("name", myObj.name)
        sessionStorage.setItem("email", myObj.email)
        sessionStorage.setItem("role", myObj.role)
        sessionStorage.setItem("user", JSON.stringify(myObj))
        history.replace("/home")
        setloggedIN(true)
        setToken()
        window.location.reload()
    }

    return (
        <div className='main-container'>
            <div className="login-page">
                <h1 className='text-center' style={{fontWeight:'bold'}}>Health Digitalization System</h1>
                <div className="login-container">
                    <form className="login-form" onSubmit={(e) => {
                        e.preventDefault()
                        fnCheckLogin()
                    }}>
                        <input type="text" placeholder="username" onChange={(e) => {
                            setuserName(e.target.value)
                        }} />
                        <input type="password" placeholder="password" onChange={(e) => {
                            setpassword(e.target.value)
                        }} />
                        <button>login</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default LoginPage