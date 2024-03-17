import { combineReducers } from "@reduxjs/toolkit";
import getAllQuestion from "./Slices/getAllQuestion"
import postSubmitAnswer from "./postReducer/postSubmitAnswer";
import getGender from "./Slices/getGender";
import postUserCreation from "./postReducer/postCreateuUser";
import getRoomAccess from "./Slices/getRoomAccess";
import getAllResult from "./Slices/getAllResult";

const rootReducer = combineReducers({
    AllQuizQuestions:getAllQuestion,
    getGender:getGender,
    postSubmitQuestion:postSubmitAnswer,
    postUserCreation:postUserCreation,
    getRoomAccess:getRoomAccess,
    AllQuizResult:getAllResult
})

export default rootReducer;

