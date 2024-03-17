import React from 'react'
import UserCreation from "../components/UserCreation"
import UserLogin from "../components/UserLogin"
import Header from '../components/Header'
const RegisterPage = () => {
  return (
   <>
    <Header />
    <div div className='mainpage'>
        <UserCreation />
        <UserLogin />
    </div>
   </>
  )
}

export default RegisterPage