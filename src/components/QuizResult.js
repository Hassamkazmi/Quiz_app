import React, { useEffect } from 'react'
import { UseSelector , useDispatch, useSelector } from 'react-redux'
import { fetchAllQuizResult } from '../redux/Slices/getAllResult';
import ResultChart from "./ResultChartComponent"

function QuizResult(props) {
  const {data: AllQuizResult , status} = useSelector((state) => state.AllQuizResult)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuizResult())
  },[])

  return (
    <>
    <div className=''>
        {/* Your Score:{props.score}<br/>
        Total Score:{props.totalScore} */}
        <ResultChart resultdata={AllQuizResult} />
    </div>
   <div>
   <table>
      <thead>
        <tr>
          <th>Question No</th>
          <th>Question Percentage</th>
          <th>Percentage</th>
          <th>Answer Percentage</th>
          <th>Total Answer Percent</th>
        </tr>
      </thead>
      <tbody>
        {AllQuizResult.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.QuestionPercentage}</td>
            <td>{item.Percentage}</td>
            <td>{item.AnswerPercentage}</td>
            <td>{item.TotalAnswerPercent}</td>
          </tr>
        ))}
      </tbody>
    </table>
   </div>
    </>
  )
}

export default QuizResult