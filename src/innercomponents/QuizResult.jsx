import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllQuizResult , STATUSES } from "../redux/Slices/getAllResult";
import ResultChart from "./ResultChartComponent";
import ResultChartPieComponent from "./ResultChartPieComponent";
import InnerHeader from "./InnerHeader";
import { fetchAllQuizQuestionsreset } from "../redux/Slices/getAllQuestion";
import { toast } from "react-toastify";

function QuizResult() {
  const { data: AllQuizResult, status, error } = useSelector(
    (state) => state.AllQuizResult
  );

  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  console.log(AllQuizResult, status)
  useEffect(() => {
    dispatch(fetchAllQuizResult());
    dispatch(fetchAllQuizQuestionsreset())
  }, []);

  const id = localStorage.getItem("id")

  const handleCopyClick = () => {
    navigator.clipboard.writeText(id)
      .then(() => {
        toast('Copied to clipboard');
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
      });
  };

  return (
    <div className="container111">
      <div id="particles-js" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
      <InnerHeader />

      {status === STATUSES.ERROR && error === "Unauthorized" ? (
        <div>
          <h2 style={{ textAlign: "center" }}>
          Waiting for your Partner to Enter Data
        </h2>
        <div className="clipboard">
       <p>{id}</p>
      <button onClick={handleCopyClick}>Copy Code to Clipboard</button>
       </div>
          </div>
      ) : (
        <div className="row result ">
          {/* <Heart
            isActive={active}
            onClick={() => setActive(!active)}
            animationTrigger="both"
            inactiveColor="rgba(255,125,125,.75)"
            activeColor="brown"
            style={{ marginTop: "1rem" }}
            animationDuration={0.1}
          /> */}
          <h3 style={{textAlign:"center" , color:"brown"}}>Result Anounced</h3>
          <div className="ResultChart">
            <ResultChartPieComponent resultdata={AllQuizResult?.User1Data} />
            <ResultChartPieComponent resultdata={AllQuizResult?.User2Data} />
            <div className="heartContainer">
              <h3 className="CompatiblePercentage">{AllQuizResult?.CompatiblePercentage}%</h3>
            </div>
          </div>
          <ResultChart resultdata={AllQuizResult} />
        </div>
      )}
    </div>
  );
}

export default QuizResult;
