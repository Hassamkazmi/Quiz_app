// Quiz.js
import React, { useEffect, useState } from "react";
import QuizResult from "./QuizResult";
import ChartComponent from "./ChartComponent"; // Import the new ChartComponent
import imagedata from "../images/aaa.jpg";
import aggree from "../images/aggree.jpeg";
import disagree from "../images/disaggree.jpeg";
import sagress from "../images/saggree.jpeg";
import sdisgree from "../images/sdisaggree.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuizQuestions } from "../redux/Slices/getAllQuestion";
import Cookies from "js-cookie";
import { postSubmitQuestion , clearData } from "../redux/postReducer/postSubmitAnswer";
import InnerHeader from "./InnerHeader";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { data: AllQuizQuestions, status } = useSelector(
    (state) => state.AllQuizQuestions
  );

  const {error , success , loading } = useSelector((state) => state.postSubmitQuestion)

  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const [percentageCalculate, setpercentageCalculate] = useState(1);
  const [clickedOption, setClickedOption] = useState(0);
  const [imageSrc, setimageSrc] = useState(imagedata);
  const [showResult, setShowResult] = useState(false);
  const [optionSelections, setOptionSelections] = useState([0, 0, 0, 0]);

  const optionsData = [
    "Agreed",
    "Strongly Agreed",
    "Disagree",
    "Strongly Disagree",
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllQuizQuestions());
  }, []);
  useEffect(() => {
    if (clickedOption > 0 && clickedOption <= 4) {
      const newOptionSelections = Array(4).fill(0); // Initialize array with zeros
      newOptionSelections[clickedOption - 1] = 1; // Set the selected option count to 1
      setOptionSelections(newOptionSelections);
    }
    if(clickedOption == 1) {
      setpercentageCalculate(1)
    }
    if(clickedOption == 2) {
      setpercentageCalculate(0.75)
    }
    if(clickedOption == 3) {
      setpercentageCalculate(0.5)
    }
    if(clickedOption == 4) {
      setpercentageCalculate(0.25)
    }
    
  }, [clickedOption]);


  useEffect(() => {
    if(success){
      toast(success)
      dispatch(clearData())
      setOptionSelections([0, 0, 0, 0]);

      if (currentQuestion < AllQuizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setClickedOption(0);
        
      } else {
        setShowResult(true);
        navigate("/quizresult")

      }
    }
    if(error){
      toast(error)
      dispatch(clearData())

    }
  },[success, error])

  const Skip = () =>{
    if (currentQuestion < AllQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);      
    }
    else{
      setShowResult(true);

      navigate("/quizresult")
    }
  }

  const changeQuestion = async () => {
    setIsOptionSelected(false)
    let Data = {
      QuestionId: AllQuizQuestions[currentQuestion]?._id,
      AnswerId: clickedOption,
    };
    await dispatch(postSubmitQuestion({ Data }));
   
  };

  const resetAll = () => {
    setShowResult(false);
    setIsOptionSelected(false)

    setCurrentQuestion(0);
    setClickedOption(0);
    setScore(0);
    setOptionSelections([0, 0, 0, 0]);
    Cookies.remove("userToken")
  };

  useEffect(() => {
    switch (clickedOption) {
      case 1:
        setimageSrc(aggree);
        setIsOptionSelected(true)

        break;
      case 2:
        setimageSrc(sagress);
        setIsOptionSelected(true)

        break;
      case 3:
        setimageSrc(disagree);
        setIsOptionSelected(true)

        break;
      case 4:
        setimageSrc(sdisgree);
        setIsOptionSelected(true)

        break;
      default:
        setimageSrc(imagedata);
        setIsOptionSelected(true)

        break;
    }
  }, [clickedOption]);

 

  return (
    <div>
         <InnerHeader />

      <div className="quiz-app-css">
        <div className="container1">
        <>
              <div className="question">
                <span id="question-number">
                  {AllQuizQuestions &&
                    AllQuizQuestions[currentQuestion]?.QuestionNo}
                </span>
                <span id="question-txt">
                  {AllQuizQuestions &&
                    AllQuizQuestions[currentQuestion]?.Question}
                </span>
              </div>
              <div className="option-container">
                {AllQuizQuestions[currentQuestion]?.QuestionOptions?.map((option, i) => {
                  return (
                    <button
                      className={`option-btn ${
                        clickedOption === option?.OptionData?._id ? "checked" : null
                      }`}
                      key={i}
                      onClick={() => setClickedOption(option?.OptionData?._id)}
                    >
                      {option?.OptionData?.Name}
                    </button>
                  );
                })}
                           </div>
            </>
        </div>
        <div className="quiz-app-right">
          {/* <img src={imageSrc} alt="" /> */}
          <ChartComponent 
                  optionSelections={AllQuizQuestions[currentQuestion]?.QuestionOptions} 
                  clickedOption={clickedOption} 
                /> 
          <div className="btn-quiz">
            {
              showResult ?     <button id="next-button" onClick={resetAll}>Try Again</button>
              :  <>
              <input
              type="button"
              value="Next"
              id="next-button"
              disabled={!isOptionSelected}

              onClick={changeQuestion}
            />
                       <button onClick={Skip} className="skip-btn">skip</button>

              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
