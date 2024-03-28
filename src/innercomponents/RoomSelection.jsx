import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchgetRoomAccess } from "../redux/Slices/getRoomAccess";
import { Card } from "antd";
import Cookies from "js-cookie";
import InnerHeader from "./InnerHeader";
import { toast } from "react-toastify";
import "./App.css";

const RoomSelection = () => {
  const { data: getRoomAccess, status } = useSelector(
    (state) => state.getRoomAccess
  );

  const { success, error, loading, userdata } = useSelector(
    (state) => state.postUserCreation
  );

  const { id } = useParams();

  const RoomData = getRoomAccess ? getRoomAccess : userdata;

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchgetRoomAccess({ id }));
    localStorage.setItem("id",id)
  }, [dispatch]);

  const handleuser = (token) => {
    Cookies.set("userToken", token);
    navigate("/quiz");
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(id)
      .then(() => {
        toast('Copied to clipboard');
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
      });
  };
  useEffect(() => {
    const handleTouchStart = () => {
      // Your touchstart event handling logic here
    };

    document.body.addEventListener('touchstart', handleTouchStart);

    return () => {
      document.body.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);
  return (
    <div className="RoomSelection-main">
       
       <div className="clipboard">
       <p>{id}</p>
      <button onClick={handleCopyClick}>Copy to Clipboard</button>
       </div>
      
      <div className="RoomSelection">
     
        <div className="RoomSelection_left">
          <Card title="Partner 1" style={{ width: 300, margin: "20px auto" , textAlign:"center"}}>
            <p>
              <strong>Name:</strong> {RoomData?.User1?.Detail?.Name}
            </p>
            <p>
              <strong>Email:</strong> {RoomData?.User1?.Detail?.email}
            </p>
            <p>
              <strong>Age:</strong> {RoomData?.User1?.Detail?.Age}
            </p>
            {/* <p><strong>Gender:</strong> {getRoomAccess?.User1?.Detail?.Gender}</p> */}
            <p>
              <strong>About You:</strong> {RoomData?.User1?.Detail?.AboutYou}
            </p>
            <button className="btn-css" onClick={() => handleuser(RoomData?.User1?.Token)}>
              Select
            </button>
          </Card>
        </div>
        <div className="heart"></div>

        <div className="RoomSelection_rigth">
          <h3>
            <Card title="Partner 2" style={{ width: 300, margin: "20px auto" , textAlign:"center" }}>
              <p>
                <strong>Name:</strong> {getRoomAccess?.User2?.Detail?.Name}
              </p>
              <p>
                <strong>Email:</strong> {getRoomAccess?.User2?.Detail?.email}
              </p>
              <p>
                <strong>Age:</strong> {getRoomAccess?.User2?.Detail?.Age}
              </p>
              {/* <p><strong>Gender:</strong> {getRoomAccess?.User2?.Detail?.Gender}</p> */}
              <p>
                <strong>About You:</strong>{" "}
                {getRoomAccess?.User2?.Detail?.AboutYou}
              </p>
              <button className="btn-css" onClick={() => handleuser(getRoomAccess?.User2?.Token)}>
                Select
              </button>
            </Card>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default RoomSelection;
