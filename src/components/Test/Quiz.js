import React, { useState } from "react";
import "../../App.css";
import TopBar from "../TopBar";
import SingleSubject from "./SingleSubject/SingleSubject";
import SelectSubject from "./SelectSubject/SelectSubject";
import AllSubject from "./AllSubject/AllSubject";
import RoundButton from "./RoundButton";
import firebase from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import DataFetching from "./DataFetching";
import DemoTest from "./DemoTest";
import ReactPlayer from "react-player";

toast.configure();

function Quiz(props) {
  const [id, setId] = useState(0);
  const [selector, setSelector] = useState(true);
  const [game, setGame] = useState(false);
  const [animation,setAnimation] = useState('');

  // if (!firebase.getCurrentUsername()) {
    // not logged in
  //   toast.error("You need to be logged in", {
  //     position: toast.POSITION.BOTTOM_RIGHT,
  //   });
  //   props.history.replace("/login");
  //   return null;
  // }

  const goBack = () => {
    setAnimation('w3-animate-right')
    window.scrollTo(0, 0);
    setId(0);
    setGame(false);
    setSelector(true);
  };
  const setSingleSubject = () => {
    window.scrollTo(0, 0);
    setId(1);
    setSelector(false);
  };

  const setSingleSubjectWithGame = () => {
    setGame(true);
    window.scrollTo(0, 0);
    setId(1);
    setSelector(false);
  };

  const setSingleSubjectWithDemo = () => {
    setId(4);
    window.scrollTo(0, 0);
    setSelector(false);
  };

  const setSelectSubject = () => {
    window.scrollTo(0, 0);
    setId(2);
    setSelector(false);
  };

  const setAllSubject = () => {
    window.scrollTo(0, 0);
    setId(3);
    setSelector(false);
  };

  if (selector) {
    return (
      <>
      <Helmet>
          <title>Students-mitra Test</title>
          <meta
            name="description"
            content="students-mitra testpage. give test for single subject, selected subjects and for all active subjects. there is also a game mode."
          />
        </Helmet>
      <div className={`${animation}`}>
        <TopBar txt="Test" bool={false} />
        <div className="mtop"></div>
        {firebase.getCurrentUsername() && (
          <div>
            <div className="w3-row-padding ">
              <div style={{ width: "33.3%" }} className="w3-col">
                <RoundButton click={setSingleSubject} txt="Single Subject" />
              </div>

              <div style={{ width: "33.3%" }} className="w3-col">
                <RoundButton click={setSelectSubject} txt="Select Subject" />
              </div>

              <div style={{ width: "33.3%" }} className="w3-col">
                <RoundButton click={setAllSubject} txt="Active Subjects" />
              </div>
            </div>
            <div style={{ height: "10px" }}></div>
            <div
              style={{ marginLeft: "33%", marginRight: "33%" }}
              className="w3-padding"
            >
              <RoundButton
                tag={true}
                click={setSingleSubjectWithGame}
                txt="Play With Friends"
              />
            </div>
            {firebase.isUserVerified()&&<div style = {{marginTop:window.innerHeight/2-120}} className="w3-padding-large w3-right">
              <Link
                to="/feedback"
                className="w3-border-red w3-button w3-round-large w3-border"
              >
                Feedback/Report Bug
              </Link>
            </div>}
          </div>
        )}
        {!firebase.getCurrentUsername() && (
          <div>
            <h1>Demo Test</h1>
            <div
              style={{ marginLeft: "33%", marginRight: "33%" }}
              className="w3-padding"
            >
              <RoundButton
                click={setSingleSubjectWithDemo}
                txt="Start Demo Test"
              />
            </div>
            <h1>
              <i>Sign Up for Full Feature</i>
            </h1>
            <div
              style={{
                width: "50%",
                margin: "0 auto",
              }}
              className="w3-hide-small w3-hide-medium w3-text-center"
            >
              <br></br><br></br>
              <h2>Watch how it works!😀</h2>
              <ReactPlayer
                height={400}
                width={720}
                controls
                url="https://youtu.be/tsfKferlvRY"
              />
            </div>
            <div className="w3-hide-large">
              <h1>Watch how it works!</h1>
              <ReactPlayer
                light
                height={160}
                width={300}
                controls
                url="https://youtu.be/tsfKferlvRY"
              />
            </div>
          </div>
        )}
        <div className="c-box-min"></div>
      </div>
      </>
    );
  } else {
    if (id === 1) {
      return <SingleSubject game={game} click={goBack} id={1} />;
    } else if (id === 2) {
      return <SelectSubject click={goBack} id={2} />;
    } else if (id === 4) {
      return <DemoTest click={goBack} />;
    } else {
      return <AllSubject click={goBack} id={3} />;
    }
  }
}

export default Quiz;
