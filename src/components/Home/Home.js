import React from "react";
import "../../App.css";
import Graph from "./Graph";
import TopBar from "../TopBar";
import firebase from "../firebase";

function Home(props) {

  if(!firebase.getCurrentUsername()) {
		// not logged in
		//alert('Please login first')
		props.history.replace('/login')
		return null
  }
  return (
    <>
    <TopBar txt={"Welcome "+firebase.getCurrentUsername()}/>
        <Graph/>    
    </>
  );
}

export default Home;
