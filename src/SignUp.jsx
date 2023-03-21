import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import "./index.css";

function SignUp() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    title: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function inputEvent(e) {
    let { name, value } = e.target;
    console.log(data);
    setData({ ...data, [name]: value });
  }

  //login page => Home Page
  //credential not match ? navigate('/signup') : welcome page
  const PostData = async () => {
    let { fname, lname, title, email, password } = data;

    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fname, lname, title, email, password }),
    });

    if (response.ok) {
      // Success code here
      navigate("/");
    } else {
      // Error handling code here
      const { status, msg } = await response.json();
      window.alert(`Error: ${status} - ${msg}`);
    }
  };

  return (
    <>
      <div className="JoinPage">
        <div className="JoinContainer">
          <h1>Sign In</h1>
          <input
            onChange={inputEvent}
            value={data.fname}
            name="fname"
            type="text"
            id="joininput"
            placeholder="Enter Your First Name"
          />
          <input
            onChange={inputEvent}
            name="lname"
            value={data.lname}
            type="text"
            id="joininput"
            placeholder="Enter Your Last Name"
          />
          <input
            onChange={inputEvent}
            name="title"
            value={data.title}
            type="text"
            id="joininput"
            placeholder="Enter Your Title"
          />
          <input
            onChange={inputEvent}
            name="email"
            value={data.email}
            type="text"
            id="joininput"
            placeholder="Enter Your Email"
          />
          <input
            onChange={inputEvent}
            name="password"
            value={data.password}
            type="text"
            id="joininput"
            placeholder="Enter Your Password"
          />
          <button className="joinbtn" onClick={PostData}>
            Register
          </button>
          {/* <NavLink
          onClick={(e) => !name ? e.preventDefault() : null}
          to="/chat"
        >
          
        </NavLink> */}
        </div>
      </div>
    </>
  );
}

export default SignUp;
