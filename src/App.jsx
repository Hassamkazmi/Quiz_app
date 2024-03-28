import React from "react";
import RoomSelection from "./innercomponents/RoomSelection";
import UserLogin from "./pages/LoginPage";
import Quiz from "./innercomponents/Quiz";
import MianScreen from "./pages/RegisterPage";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from "./pages/HomePage"
import 'bootstrap/dist/css/bootstrap.min.css';
import QuizResult from "./innercomponents/QuizResult";
import { characterCursor } from "cursor-effects"; // Corrected import
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();
new characterCursor({ 
  element: document.querySelector("#character"), 
  characters: ["h", "e", "l", "l", "o"],
  font: "15px serif",
  colors: [
      "#6622CC",
      "#A755C2",
      "#B07C9E",
      "#B59194",
      "#D2A1B8",
  ],
  characterLifeSpanFunction: function() {
      return Math.floor(Math.random() * 60 + 80);
  },
  initialCharacterVelocityFunction: function() {
      return {
          x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5,
          y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5,
      }
  },
  characterVelocityChangeFunctions: {
    x_func: function(age, lifeSpan) {
      return (Math.random() < 0.5 ? -1 : 1)/30;
    },
    y_func: function(age, lifeSpan) {
      return (Math.random() < 0.5 ? -1 : 1)/ 15;
    },
  },
  characterScalingFunction: function(age, lifeSpan) {
      let lifeLeft = lifeSpan - age;
      return Math.max(lifeLeft / lifeSpan * 2, 0);
  },
  characterNewRotationDegreesFunction: function(age, lifeSpan) {
      let lifeLeft = lifeSpan - age;
      console.log(age, lifeSpan);
      return lifeLeft / 5;
  }
});




function App() {

  
  return (
    <Provider store={store}>
      <ToastContainer
position="top-right"
autoClose={1}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss={false}
draggable
pauseOnHover
theme="light"
/>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<MianScreen />} />
        <Route exact path="/logincode" element={<UserLogin />} />
        <Route exact path="/roomselection/:id" element={<RoomSelection />} />
        <Route exact path="/quiz" element={<Quiz />} />
        <Route exact path="/quizresult" element={<QuizResult />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
