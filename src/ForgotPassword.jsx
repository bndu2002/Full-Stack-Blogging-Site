import React, { useState } from "react";

function ForgotPassword() {
  let [email, setEmail] = useState("");

  function inputEvent(eve) {
    setEmail(eve.target.value);
  }

  const sendLink = async () => {
    try {
      let response = await fetch("/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        window.alert("sent");
      } else {
        let errorMsg = await response.json();
        let { msg } = errorMsg;
        window.alert(msg);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="main_div">
      <div className="inner_div">
        <h1>Forgot Password</h1>
        <input
          type="text"
          id="joininput"
          value={email}
          onChange={inputEvent}
          placeholder="Enter Your Email"
        />
        <button className="send_btn" onClick={sendLink}>
          send
        </button>
        <br />
      </div>
    </div>
  );
}

export default ForgotPassword;
