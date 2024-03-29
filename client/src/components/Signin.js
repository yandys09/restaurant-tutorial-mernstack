import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { showErrorMsg } from "../helpers/message";
import { showLoading } from "./../helpers/loading";
import { setAuthentication, isAuthenticated } from "./../helpers/auth";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { signin } from "../api/auth";

const Signin = () => {
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      navigate("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      navigate("/user/dashboard");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "yandys03@naver.com",
    password: "abcdef",
    errorMsg: false,
    loading: false,
  });

  const { email, password, errorMsg, loading } = formData;

  /******************************
   *  Event Handlers
   *****************************/

  const handleChange = (evt) => {
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
    if (isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid email",
      });
    } else {
      const { email, password } = formData;
      const data = { email, password };

      setFormData({ ...formData, loading: true });

      signin(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);
          const redirect = location.search.split("=")[1];

          if (isAuthenticated() && isAuthenticated().role === 1) {
            console.log("Redirecting to admin dashboard~");
            navigate("/admin/dashboard");
          } else if (
            isAuthenticated() &&
            isAuthenticated().role === 0 &&
            !redirect
          ) {
            console.log("Redirecting to user dashboard~");
            navigate("/user/dashboard");
          } else {
            console.log("Redirecting to shipping ");
            navigate("/shipping");
          }
        })
        .catch((err) => {
          console.log("signin api function error: ", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  /******************************
   *  VIEWS
   *****************************/
  const showSigninForm = () => (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
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

      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Signin
        </button>
      </div>

      {/* already have account */}
      <p className="text-center text-white">
        Don't have a account?<Link to="/signup">Register here</Link>
      </p>
    </form>
  );
  return (
    <div className="container">
      <div className="signin-container">
        <div className="row px-3 vh-100">
          <div className="col-md-5 mx-auto align-self-center">
            {errorMsg && showErrorMsg(errorMsg)}
            {loading && (
              <div className="text-center pb-4"> {showLoading()}</div>
            )}
            {showSigninForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
