import React, { useEffect, useState } from "react";
import ChartComponent from "./ChartComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllQuizQuestions } from "../redux/Slices/getAllQuestion";
import { postSubmitQuestion, clearData } from "../redux/postReducer/postSubmitAnswer";
import InnerHeader from "./InnerHeader";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import aggree from "../images/aggree.jpeg";
import disagree from "../images/disaggree.jpeg";
import sagress from "../images/saggree.jpeg";
import sdisgree from "../images/sdisaggree.jpeg";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { data: AllQuizQuestions } = useSelector(
    (state) => state.AllQuizQuestions
  );

  const { error, success } = useSelector((state) => state.postSubmitQuestion);

  const navigate = useNavigate();
  const [clickedOption, setClickedOption] = useState(0);
  const [imageSrc, setimageSrc] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuizQuestions());
  }, []);

  useEffect(() => {
    if (AllQuizQuestions?.data && AllQuizQuestions?.data?.length === 0) {
      navigate("/quizresult");
    }
  }, [AllQuizQuestions?.data]);

  useEffect(() => {
    if (success) {
      toast(success);
      dispatch(clearData());

      if (currentQuestion < AllQuizQuestions?.data?.length - 1) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        setClickedOption(0);
      } else {
        setShowResult(true);
        navigate("/quizresult");
      }
    }

    if (error) {
      toast(error);
      dispatch(clearData());
    }
  }, [success, error, currentQuestion, AllQuizQuestions?.data, dispatch, navigate]);

  const handleOptionClick = (optionId) => {
    setClickedOption(optionId);

    // Array of image sources
    const images = [
      aggree,
      sdisgree,
      sagress,
      disagree,
      
      
    ];

    // Select a random image source
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImageSrc = images[randomIndex];
    setimageSrc(randomImageSrc);
  };

  const handleSkip = () => {
    if (currentQuestion < AllQuizQuestions?.data?.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setShowResult(true);
      navigate("/quizresult");
    }
  };

  const handleChangeQuestion = async () => {
    const Data = {
      QuestionId: AllQuizQuestions?.data[currentQuestion]?._id,
      AnswerId: clickedOption,
    };
    await dispatch(postSubmitQuestion({ Data }));
  };

  const handleResetAll = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setClickedOption(0);
    setimageSrc(null);
    Cookies.remove("userToken");
  };

  return (
    <div>
      <InnerHeader />
      <div className="quiz-app-css">
        <div className="container1">
          <div className="question">
            <span id="question-number">
              {AllQuizQuestions?.data && AllQuizQuestions?.data[currentQuestion]?.QuestionNo}
            </span>
            <span id="question-txt">
              {AllQuizQuestions?.data && AllQuizQuestions?.data[currentQuestion]?.Question}
            </span>
          </div>
          <div className="option-container">
            {AllQuizQuestions?.data && AllQuizQuestions?.data[currentQuestion]?.QuestionOptions?.map((option, i) => (
              <button
                className={`option-btn ${clickedOption === option?.OptionData?._id ? "checked" : ""}`}
                key={i}
                onClick={() => handleOptionClick(option?.OptionData?._id)}
              >
                {option?.OptionData?.Name}
              </button>
            ))}
          </div>
        </div>
        <div className="quiz-app-right">
          <ChartComponent 
            optionSelections={AllQuizQuestions?.data && AllQuizQuestions?.data[currentQuestion]?.QuestionOptions} 
            clickedOption={clickedOption} 
          /> 
          <div className="btn-quiz">
            {showResult ? (
              <button id="next-button" onClick={handleResetAll}>Try Again</button>
            ) : (
              <>
                <input
                  type="button"
                  value="Next"
                  id="next-button"
                  disabled={!clickedOption}
                  onClick={() => {
                    handleChangeQuestion();
                  }}
                />
              </>
            )}
          </div>
        </div>
        <div className="imge-12">
          {imageSrc && <img src={imageSrc} alt="" />}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
