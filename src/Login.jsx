import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./index.css";

function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });

  let [forgotPassword, setForgotPassword] = useState(false);

  const navigate = useNavigate();

  function inputEvent(eve) {
    let { name, value } = eve.target;

    //This syntax creates a new object with duplicate keys, which is not allowed in JavaScript.
    //{ email: "example@gmail.com", email: "example@gmail.com" }
    //Since the object has duplicate keys, this will result in a syntax error
    setcredentials({ ...credentials, [name]: value });
  }
  const PostLogData = async () => {
    try {
      let { email, password } = credentials;

      let response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      //let Finaldata = await res.json();

      if (response.ok) {
        // Success code here
        console.log(response);
        navigate("/blog");
      } else {
        // Error handling code here
        console.log(response);
        const errorMsg = await response.json();
        let { msg } = errorMsg;
        window.alert(msg);
        if (msg == "Incorrect Password") {
          setForgotPassword(true);
        } else if (msg === "user not found") {
          window.alert("sign in to proceed");
          navigate("/signup");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = () => {
    console.log("forgot password", forgotPassword);
    navigate("/reset-password");
    setForgotPassword(false);
  };

  return (
    <div className="main_div">
      <div className="inner_div">
        <h1>Log In</h1>
        <input
          type="text"
          id="joininput"
          name="email"
          onChange={inputEvent}
          value={credentials.email}
          placeholder="Enter Your Email"
        />
        <input
          type="text"
          id="joininput"
          name="password"
          onChange={inputEvent}
          value={credentials.password}
          placeholder="Enter Your Password"
        />
        <button className="lgn_btn" onClick={PostLogData}>
          Log in
        </button>
        <br />
        {forgotPassword ? (
          <button className="forgot_btn" onClick={resetPassword}>
            Forgot Password
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default Login;
