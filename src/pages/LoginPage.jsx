import React from 'react'
import UserCreation from "../innercomponents/UserCreation"
import "./App.css";
import Header from '../components/Header'
import UserLogin from "../innercomponents/UserLogin"
import image1 from "../images/WhatsApp Image 2024-01-23 at 19.19 1.png"
const RegisterPage = () => {
  return (
   <>
    <Header />
      <div className='row main'>
        <div className='col-sm-6'>
          <img src={image1} alt='' />
        </div>
        <div className='col-sm-6'>
        <UserLogin />
        </div>
      </div>
        
   </>
  )
}

export default RegisterPage