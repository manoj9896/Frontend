import React from 'react'
import AppHeader from '../components/AppHeader'
import AddNewUser from './AddNewUser'
import Appointments from "./Appointments"

function HomePage() {

  const role = sessionStorage.getItem("role")

  if(role === "Admin"){
    return (
      <>
        <AppHeader />
        <AddNewUser />
      </>
    )
  }
  return (
    <>
        <AppHeader />
        <Appointments />
    </>
  )
}

export default HomePage