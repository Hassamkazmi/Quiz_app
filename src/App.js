import React, { useEffect } from "react";
import RoomSelection from "./components/RoomSelection";
import Quiz from "./components/Quiz";
import MianScreen from "./pages/RegisterPage";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";

function App() {

  
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<MianScreen />} />
        <Route exact path="/roomselection/:id" element={<RoomSelection />} />
        <Route exact path="/quiz" element={<Quiz />} />

        </Routes>
      </BrowserRouter>

      {/* <Quiz/> */}
    </Provider>
  );
}

export default App;
