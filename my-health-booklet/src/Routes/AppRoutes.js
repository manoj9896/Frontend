import React,{useState} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Profile from '../pages/Profile';
import Register from '../pages/Register';

function setToken() {
    sessionStorage.setItem('token', JSON.stringify(true));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log(userToken)
    return userToken ? true : false
}

function AppRoutes() {
    const islog = true
    const [loggedIN, setloggedIN] = useState(true)
    console.log(islog)

    if (!islog) {
        return (
            <Router>
                <Route path={"/"}>
                    <Redirect to={'/login'} />
                </Route>
                <Route>
                    <LoginPage setToken={setToken} setloggedIN={setloggedIN} />
                </Route>
            </Router>
        )
    }
    console.log(sessionStorage.getItem("profileId"))
    return (

        <Router> 
            <Route exact path="/">
                <Redirect to={"/home"}/>
            </Route>

            <Route exact path = "/home">
                <HomePage />
            </Route>

            <Route exact path = "/newAppointment">
                <Register />
            </Route>

            <Route exact path = "/profile">
                <Profile />
            </Route>

        </Router>

    )
}

export default AppRoutes;


