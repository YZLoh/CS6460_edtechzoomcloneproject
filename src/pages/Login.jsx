import "./login.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/login/loginActions";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("heralding2@gmail.com");
  const [password, setPassword] = useState("axbx1234");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can remove the dispatch(login(name, password)) and navigate("/") lines
    // as we are not performing authentication in this version.

    // If you still want to perform some action, you can add it here.

    // Example: Perform some action and then navigate to another page
    // performSomeAction();
    navigate("/classes");
  };

  return (
    <div>
      <div className="login__centered__container">
        <div className="login__container">
          <div className="welcome__message__container">
            <h1 className="welcome__message">Welcome to Zoom Clone!</h1>
            <p className="welcome__text">
              Please enter your details to get started
            </p>
          </div>
          <div className="login__input__container">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="input__text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <input
                type="password"
                className="input__password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button type="submit" className="login__button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
