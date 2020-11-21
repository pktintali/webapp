import React from "react";
import { Doughnut } from "react-chartjs-2";

function ResultPage(props) {
  const questions = props.qData;
  const userAnswers = props.userAns;
  const tOrNot = [];
  var c = 0;
  var ic = 0;
  var na = 0;
  var to = 0;

  for (let q in userAnswers) {
    //alert(userAnswers[q])
    if (questions[q][6] === userAnswers[q]) {
      c++;
    } else if (userAnswers[q] === " ") {
      na++;
    } else if (userAnswers[q] == "timeout") {
      to++;
    } else {
      ic++;
    }
  }

  const ansData = {
    labels: ["Correct", "Incorrect", "Time Out", "Not Attempted"],
    datasets: [
      {
        data: [c, ic, to, na],
        backgroundColor: ["#32CD32", "#d10a0a", "#FFD700", "#00BFFF"],
        hoverBackgroundColor: ["#32EE32", "#ff3030", "#FFFF00", "#00FFFF"],
      },
    ],
  };

  const handleProps = () => {
    props.closeAns();
    props.click();
  };
  var i = 0;
  var j = 0;

  for (let i in questions) {
    if (questions[i][6] === userAnswers[i]) {
      tOrNot.push("correct");
    } else if (userAnswers[i] === " ") {
      tOrNot.push("skip");
    } else if (userAnswers[i] === "timeout") {
      tOrNot.push("timeout");
    } else {
      tOrNot.push("incorrect");
    }
  }

  return (
    <>
    <h2 style={{marginTop:'-50px'}}>Review Your Results</h2>
    <div style = {{position:'fixed'}} className='w3-hide-small w3-hide-medium w3-half'>
      <Doughnut
      
        data={ansData}
        width={80}
        height={60}
        options={{
          maintainAspectRatio: true,
        }}
      />
    </div>
    <div className='w3-hide-large w3-half'>
      <Doughnut
      
        data={ansData}
        width={80}
        height={60}
        options={{
          maintainAspectRatio: true,
        }}
      />
    </div>
    <div className='w3-right w3-half'>
      <br></br>
      {questions.map((q) => (
        <div className="w3-container">
          <div
            className={`w3-padding w3-card ${
              tOrNot[j] === "correct" && "w3-pale-green"
            } ${tOrNot[j] === "incorrect" && "w3-pale-red"} ${
              tOrNot[j] === "skip" && "w3-pale-blue"
            } ${tOrNot[j] === "timeout" && "w3-pale-yellow"} `}
          >
            <h4 className="w3-left-align">
              <b>{++i}- </b>
              {q[1]}
            </h4>
            {tOrNot[j] === "skip" && (
              <h5 className="w3-left-align">
                <b>Not Attempted</b>
              </h5>
            )}
            {tOrNot[j] === "timeout" && (
              <h5 className="w3-left-align">
                <b>TimeOut</b>
              </h5>
            )}
            {tOrNot[j] === "incorrect" && (
              <p className="w3-left-align">
                <b>You Selected - </b>
                {userAnswers[j]}
              </p>
            )}
            <h5 className="w3-left-align">
              <b>Correct Ans - </b>
              {q[6]}
            </h5>
            {q[7]&& (
              <a
                className="w3-text-blue w3-hover-white w3-btn"
                href={q[7]}
                target="blank"
              >
                Learn more about this ↗
              </a>
            )}
          </div>
          <br></br>
          <span className="w3-hide">{j++}</span>
        </div>
      ))}
      <button className="w3-button w3-red" onClick={handleProps}>
        Close
      </button>
      <div className="c-box-min"></div>
      </div>
      <div className="c-box-min"></div>
      
    </>
  );
}

export default ResultPage;
