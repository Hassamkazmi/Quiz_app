import React, { useEffect } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { fetchAllQuizResult } from "../redux/Slices/getAllResult";
import ResultChart from "./ResultChartComponent";
import InnerHeader from "./InnerHeader";

function QuizResult() {
  const { data: AllQuizResult, status } = useSelector(
    (state) => state.AllQuizResult
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuizResult());
  }, []);

  console.log();
  return (
    <>
    <InnerHeader />

<div className="row result">
  <h2>Result</h2>
  <div className="col-sm-6 user1">
  <hr />
    <div className="row">
      <div className="col-sm-4">Name : {AllQuizResult?.User1Detail?.Name}</div>
      <div className="col-sm-4">Age : {AllQuizResult?.User1Detail?.Age}</div>
      <div className="col-sm-4">Email : {AllQuizResult?.User1Detail?.email}</div>
    </div>
    <hr />
    <table>
      <thead>
        <th>Question</th>
        <th>Optained</th>
      </thead>
      <tbody>
        {AllQuizResult?.User1Data?.map((item, i) => {
          return (
            <tr>
              <td>{item?.QuestionData?.Question}</td>
              <td>
                {item?.QuestionData?.QuestionPercentageAchieved / 10} %
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <ResultChart resultdata={AllQuizResult?.User1Data}/>
  </div>
  <div className="col-sm-6 user2">
  <hr />
    <div className="row">
      <div className="col-sm-4">Name : {AllQuizResult?.User2Detail?.Name}</div>
      <div className="col-sm-4">Age : {AllQuizResult?.User2Detail?.Age}</div>
      <div className="col-sm-4">Email : {AllQuizResult?.User2Detail?.email}</div>
    </div>
    <hr />
    <table>
      <thead>
        <th>Question</th>
        <th>Optained</th>
      </thead>
      <tbody>
        {AllQuizResult?.User2Data?.map((item, i) => {
          return (
            <tr>
              <td>{item?.QuestionData?.Question}</td>
              <td>
                {item?.QuestionData?.QuestionPercentageAchieved / 10} %
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <ResultChart resultdata={AllQuizResult?.User2Data}/>

  </div>
</div>
    </>
  );
}

export default QuizResult;
