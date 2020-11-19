import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import TopBar from "./TopBar";
import firebase from "./firebase";
import { Link } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";
import cameraPlaceholder from "../camera-placeholder.png";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const Profile = (props) => {
  const [profileInfo, setProfileInfo] = useState();
  const [activeSubjects, setActiveSubjects] = useState();
  const [image, setImage] = useState(null);
  const [dpImage, setDpImage] = useState();
  const [editMode, setEditMode] = useState(false);
  const [c, setC] = useState(0);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [sec, setSec] = useState("");
  const [branch, setBranch] = useState("");
  const [college, setCollege] = useState("");
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  async function setUser() {
    firebase.getDpImage().then(setDpImage);
    dpImage && window.sessionStorage.setItem("dpmin", dpImage);
    firebase.addField({dp:true})

  }
  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image) {
      firebase.setProfileImage(image);
      window.sessionStorage.removeItem("dpmin");
      setUser();
    } else {
      // alert("Select Some Image");
      toast.error('Select Image First',{position:toast.POSITION.BOTTOM_LEFT});
    }
  };
  const handleImageUpload = (e) => {
    handleFile(e);
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const usermini = window.sessionStorage.getItem("dpmin");

  const profileData = {
    name: name?name:"",
    state: state?state:"",
    country: country?country:"",
    mobile: mobile?mobile:"",
    email: email?email:"",
    dob: dob?dob:"",
    address: address?address:"",
    sec: sec?sec:"",
    branch: branch?branch:"",
    college: college?college:"",
  };

  async function doSignOut() {
    await firebase.logout();
    window.sessionStorage.setItem("dpmin", undefined);
  }

  async function updateUserProfile() {
    try {
      await firebase.updateProfile(profileData);
      // alert("Profile Updated Successfully");
      toast.success("Profile Updated Successfully",{position:toast.POSITION.BOTTOM_RIGHT,autoClose:4000})
      setEditMode(false);
    } catch (e) {
      toast.error("Something Went Wrong",{position:toast.POSITION.BOTTOM_RIGHT,autoClose:4000})
    }
  }

  useEffect(() => {
    // firebase.getDpImage().then(setDpImage);
    firebase.getCurrentUsername() &&
      firebase.getField("activeSubject").then(setActiveSubjects);
    firebase.getCurrentUsername() && firebase.getProfile().then(setProfileInfo);

    if (profileInfo) {
      setName(profileInfo.name);
      setMobile(profileInfo.mobile);
      setAddress(profileInfo.address);
      setCountry(profileInfo.country);
      setDob(profileInfo.dob);
      setState(profileInfo.state);
      setEmail(profileInfo.email);
      setBranch(profileInfo.branch);
      setCollege(profileInfo.college);
      setSec(profileInfo.sec);
    }
    // if(activeSubjects){
    //   setAc(activeSubjects);
    // }
  }, [editMode, c]);

  if (!firebase.getCurrentUsername()) {
    props.history.replace("/login");
    return null;
  }
  const toogleEdit = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  };

  async function removeSubject(sub) {
    const index = activeSubjects.indexOf(sub);
    activeSubjects.splice(index, 1);
    await firebase.updateActiveSubjects(activeSubjects);
    setC(c + 1);
  }

  return !editMode ? (
    <>
      <TopBar bool={true} profile={true} txt="Profile" />
      <div className="mtop"></div>
      <h2 className="w3-hide-small">Your Profile Info</h2>
      {profileInfo ? (
        <div className="w3-animate-right">
          <div className="w3-half">
            {!usermini && <FaUserCircle className="w3-text-green" size={150} />}
            {usermini && <img className="dpcircle" src={usermini} />}
            <br></br>
            <br></br>
            <b>{firebase.getCurrentUsername()}</b>
            <br></br>
            <br></br>
            <Link to="/login">
              <button
                onClick={doSignOut}
                className="w3-hide-large w3-red w3-button"
              >
                LogOut
              </button>
            </Link>
            <button
              onClick={toogleEdit}
              className="w3-green w3-button w3-margin"
            >
              Edit Profile
            </button>
          </div>
          <div className="w3-half">
            <table style={{ maxWidth: "500px" }} className="w3-table">
              <tbody>
              <tr className="w3-border">
                <td>
                  <b>Name</b>
                </td>
                {<td>{profileInfo.name}</td>}
              </tr>
              <tr className="w3-border">
                <td>
                  <b>Section</b>
                </td>
                {<td>{profileInfo.sec}</td>}
              </tr>
              <tr className="w3-border">
                <td>
                  <b>Branch</b>
                </td>
                {<td>{profileInfo.branch}</td>}
              </tr>
              <tr className="w3-border">
                <td>
                  <b>College</b>
                </td>
                {<td>{profileInfo.college}</td>}
              </tr>
              <tr className="w3-border">
                <td>
                  <b>Mobile</b>
                </td>
                {<td>{profileInfo.mobile}</td>}
              </tr>
              <tr className="w3-border">
                <td>
                  <b>Email</b>
                </td>
                {<td>{profileInfo.email}</td>}
              </tr>
              <tr className="w3-border">
                <td>
                  <b>DOB</b>
                </td>
                {<td>{profileInfo.dob}</td>}
              </tr>
              <tr className="w3-border">
                <td>
                  <b>Address</b>
                </td>
                {<td>{profileInfo.address}</td>}
              </tr>
              <tr className="w3-border">
                <td>
                  <b>State</b>
                </td>
                {<td>{profileInfo.state}</td>}
              </tr>
              <tr className="w3-border">
                <td>
                  <b>Country</b>
                </td>
                {<td>{profileInfo.country}</td>}
              </tr>
              </tbody>
            </table>
            <div className="c-box-min"></div>
          </div>
          <h2>Active Subjects</h2>

          <ul className="w3-ul">
            {activeSubjects &&
              activeSubjects.map((ac) => {
                return (
                  <li key ={ac}>
                    {ac}
                    <span
                      style={{ marginLeft: "50%" }}
                      onClick={() => removeSubject(ac)}
                      className="w3-btn"
                    >
                      Remove
                    </span>
                  </li>
                );
              })}
          </ul>
          <div className="c-box-min"></div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  ) : (
    <>
      <TopBar bool={true} profile={true} txt="Profile" />
      <div className="mtop"></div>
      <h2>Update Your Profile</h2>
      {profileInfo ? (
        <div className="w3-animate-left">
          <div className="w3-half">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageUploader}
                style={{
                  display: "none",
                }}
              />
              <div
                style={{
                  height: "150px",
                  width: "150px",
                  border: "1px dashed black",
                  borderRadius:'50%'
                }}
                onClick={() => imageUploader.current.click()}
              >
                <img
                  src={cameraPlaceholder}
                  ref={uploadedImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius:'50%'
                  }}
                />
              </div>
              <br></br>
              <button onClick={handleUpload}>Upload</button>
            </div>
            {/* {!usermini&& <FaUserCircle className="w3-text-green" size={150} /> }
            {usermini&&<img className='dpcircle' src = {usermini}/>}
            <br></br> <br></br>
            <input onChange={handleFile} type="file" /> */}
            {/* <button onClick={handleUpload}>Upload</button> */}
            <br></br>
            <br></br>
            <b>{firebase.getCurrentUsername()}</b>
            <br></br>
            <br></br>
            <button onClick={toogleEdit} className="w3-red w3-button w3-margin">
              Cancel
            </button>
            <button
              onClick={updateUserProfile}
              className="w3-green w3-button w3-margin"
            >
              Save
            </button>
          </div>
          <div className="w3-half">
            <table style={{ maxWidth: "500px" }} className="w3-table">
              <tbody>
              <tr className="w3-border">
                <td>
                  <b>Name:</b>
                </td>
                {
                  <td>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </td>
                }
              </tr>
              <tr className="w3-border">
                <td>
                  <b>Section</b>
                </td>
                {
                  <td>
                    <input
                      type="text"
                      value={sec}
                      onChange={(e) => setSec(e.target.value)}
                    />
                  </td>
                }
              </tr>
              <tr className="w3-border">
                <td>
                  <b>Branch</b>
                </td>
                {
                  <td>
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                    />
                  </td>
                }
              </tr>
              <tr className="w3-border">
                <td>
                  <b>College</b>
                </td>
                {
                  <td>
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                    />
                  </td>
                }
              </tr>
              <tr className="w3-border">
                <td>
                  <b>Mobile</b>
                </td>
                {
                  <td>
                    <input
                      type="number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </td>
                }
              </tr>

              <tr className="w3-border">
                <td>
                  <b>DOB</b>
                </td>
                {
                  <td>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                  </td>
                }
              </tr>
              <tr className="w3-border">
                <td>
                  <b>Address</b>
                </td>
                {
                  <td>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </td>
                }
              </tr>
              <tr className="w3-border">
                <td>
                  <b>State</b>
                </td>
                {
                  <td>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </td>
                }
              </tr>
              <tr className="w3-border">
                <td>
                  <b>Country</b>
                </td>
                {
                  <td>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </td>
                }
              </tr>
              </tbody>
            </table>
            <div className="c-box-min"></div>
          </div>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default Profile;
