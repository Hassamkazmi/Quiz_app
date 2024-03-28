import Cookies from 'js-cookie'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const InnerHeader = () => {
    const navigate = useNavigate();

    const { data: getRoomAccess, status } = useSelector(
      (state) => state.getRoomAccess
    );
  
    const { success, error, loading, userdata } = useSelector(
      (state) => state.postUserCreation
    );
  
    const RoomData = getRoomAccess ? getRoomAccess : userdata;

  const token = Cookies.get("userToken")
  useEffect(() => {
    if(!token){
      navigate("/")
    }
  },[])
    const handleLogout = () => {
        Cookies.remove("userToken")
        navigate("/")
    }
  return (
    <div className='inner-header'>
        <div className='inner-header-css'>
        <h4>{RoomData?.User1?.Detail?.Name }</h4>
        <h3>❤</h3>
        <h4>{RoomData?.User2?.Detail?.Name }</h4>
        </div>
        <p className="heading-txt" style={{color:"#fff"}}>Perfect Pair</p>

        <button onClick={() => handleLogout()}>Logout</button>
    </div>
  )
}

export default InnerHeader