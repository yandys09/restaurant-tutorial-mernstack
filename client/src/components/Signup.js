import React, { useState, useEffect } from "react";

import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { showErrorMsg, showSuccessMsg } from "../helpers/message";
import { showLoading } from "../helpers/loading";

import { Link, useNavigate } from "react-router-dom";
import { signup } from "../api/auth";
import { isAuthenticated } from "./../helpers/auth";

const Signup = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      navigate("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      navigate("/user/dashboard");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    username: "yandys",
    email: "yadnys03@naver.com",
    password: "abcdef",
    password2: "abcdef",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });

  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;

  /******************************
   *  Event Handlers
   *****************************/

  const handleChange = (evt) => {
    // console.log(evt)
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    //client-side validation
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match!!",
      });
    } else {
      const { username, email, password } = formData;
      const data = { username, email, password };

      setFormData({ ...formData, loading: true });
      signup(data)
        .then((response) => {
          console.log("Axios signup success : ", response);
          setFormData({
            username: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("Axios signup error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  const showSignupForm = () => (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="bi bi-person-fill"></i>
          </span>
        </div>
        <input
          name="username"
          value={username}
          className="form-control"
          placeholder="UserName"
          type="text"
          onChange={handleChange}
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="bi bi-envelope-fill"></i>
          </span>
        </div>
        <input
          name="email"
          value={email}
          className="form-control"
          placeholder="Email address"
          type="email"
          onChange={handleChange}
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="bi bi-lock-fill"></i>
          </span>
        </div>
        <input
          name="password"
          value={password}
          className="form-control"
          placeholder="Create password"
          type="password"
          onChange={handleChange}
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="bi bi-unlock-fill"></i>
          </span>
        </div>
        <input
          name="password2"
          value={password2}
          className="form-control"
          placeholder="Confirm password"
          type="password"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Signup
        </button>
      </div>

      {/* already have account */}
      <p className="text-center text-white">
        Have an account?<Link to="/signin">Log In</Link>
      </p>
    </form>
  );

  return (
    <div className="container">
      <div className="signup-container">
        <div className="row px-3 vh-100">
          <div className="col-md-5 mx-auto align-self-center">
            {successMsg && showSuccessMsg(successMsg)}
            {errorMsg && showErrorMsg(errorMsg)}
            {loading && (
              <div className="text-center pb-4"> {showLoading()}</div>
            )}
            {showSignupForm()}

            {/* <p style={{ color: "red" }}>{JSON.stringify(formData)}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
