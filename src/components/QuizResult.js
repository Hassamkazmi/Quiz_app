import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllQuizResult } from "../redux/Slices/getAllResult";
import ResultChart from "./ResultChartComponent";
import ResultChartPieComponent from "./ResultChartPieComponent";
import InnerHeader from "./InnerHeader";
import Heart from "react-heart";
import { fetchAllQuizQuestionsreset } from "../redux/Slices/getAllQuestion";

function QuizResult() {
  const { data: AllQuizResult, status } = useSelector(
    (state) => state.AllQuizResult
  );
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  useEffect(() => {
    dispatch(fetchAllQuizResult());
    dispatch(fetchAllQuizQuestionsreset())
  }, []);

  return (
    <div className="container111">
      <div id="particles-js" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
      <InnerHeader />

      {AllQuizResult?.length == 0 ? (
        <h2 style={{ textAlign: "center" }}>
          Waiting for your Partner to Enter Data
        </h2>
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
