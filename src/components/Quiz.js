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

  console.log(error , success , loading)

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
      }
    }
    if(error){
      toast(error)
      dispatch(clearData())

    }
  },[success, error])


  const changeQuestion = async () => {
    setIsOptionSelected(false)
    let Data = {
      QuestionId: AllQuizQuestions[currentQuestion]?._id,
      AnswerPercentage: percentageCalculate,
      QuestionPercentage: AllQuizQuestions[currentQuestion]?.QuestionPercentage,
      Percentage: percentageCalculate * AllQuizQuestions[currentQuestion]?.QuestionPercentage,
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
        <div className="container">
          {showResult ? (
            <QuizResult
              score={score}
              totalScore={AllQuizQuestions.length}
              tryAgain={resetAll}
            />
          ) : (
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
                {optionsData?.map((option, i) => {
                  return (
                    <button
                      className={`option-btn ${
                        clickedOption === i + 1 ? "checked" : null
                      }`}
                      key={i}
                      onClick={() => setClickedOption(i + 1)}
                    >
                      {option}
                    </button>
                  );
                })}
                <ChartComponent optionSelections={optionSelections} />{" "}
                {/* Render the chart component */}
              </div>
            </>
          )}
        </div>
        <div className="quiz-app-right">
          <img src={imageSrc} alt="" />

          <div className="btn-quiz">
            {
              showResult ?     <button id="next-button" onClick={resetAll}>Try Again</button>
              :  <input
              type="button"
              value="Next"
              id="next-button"
              disabled={!isOptionSelected}

              onClick={changeQuestion}
            />
            }
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
