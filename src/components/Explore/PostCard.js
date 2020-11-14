import React, { useState } from "react";
import "../../App.css";
import PostCardDetail from "./PostCardDetails";
import { FaRegThumbsUp, FaRegComment, FaShare } from "react-icons/fa";
function PostCard() {
  const [detail, openDetail] = useState(false);
  const openCardDetail = () => {
    openDetail(true);
  };

  if (!detail) {
    return (
      <>
        <div className="w3-third">
          <div className="w3-padding  w3-panel w3-card w3-pale-blue">
            <div>
              <img
                alt = 'user logo'
                className="w3-left"
                style={{ borderRadius: "50%", width: "10%" }}
                src="https://pktintali.github.io/tdevelopersindia/images/logomain.jpg"
              />
              <b className="w3">TDevelopers</b>
              <i className="w3-small w3-right">1 Hour Ago</i>
            </div>
            <br></br>
            <p></p>
            <div className="touch" onClick={openCardDetail}>
              <p className="w3-left-align">
                Studay Analyzer is the best tool for students. Specially for
                those students who are confused about what to study.
              </p>
              <img
                alt = 'post image'
                style={{ width: "100%", maxwidth: "300px" }}
                className=""
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTRP5pe1nBk5FwcOrvfIgwJUgIbQ7TpemUilg&usqp=CAU"
                a
              />
            </div>
            <br></br>
            <div className="w3-text-grey w3-margin w3-display-container w3-padding">
              <div
                style={{ width: "33.3%" }}
                className="w3-display-left w3-button"
              >
                <FaRegThumbsUp size={"25px"} />
                <br></br>
                <span>5M</span>
              </div>
              <div
                style={{ width: "33.3%" }}
                className="w3-button w3-display-middle"
              >
                <FaRegComment size={"25px"} />
                <br></br>
                <span>1M</span>
              </div>
              <div
                style={{ width: "33.3%" }}
                className="w3-button w3-display-right"
              >
                <FaShare size={"25px"} />
                <br></br>
                <span>200K</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <PostCardDetail />;
  }
}

export default PostCard;
