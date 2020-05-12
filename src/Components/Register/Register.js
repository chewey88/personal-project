import React, { useState } from "react";
import axios from "axios";
// import {Link} from 'react-router-dom'
import { loginUser } from "../../ducks/reducer";
import { connect } from "react-redux";
import "./register.css";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const body = {
      username: username,
      password: password,
    };
    axios
      .post("/auth/register", body)
      .then((res) => {
        props.loginUser(res.data);
        props.history.push("/");
      })
      .catch((err) => alert("Could not Register"));
  };

  return (
    <div className="reg-body">
      <div className="input-container">
        Register
        <p>
          Username:
          <input
            className="user-input"
            maxLength="50"
            placeholder="Enter Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </p>
        <p>
          Password:
          <input
            className="pass-input"
            maxLength="100"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </p>
        <button
          className="reg-button"
          onClick={() => {
            handleRegister();
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default connect(null, { loginUser })(Register);
