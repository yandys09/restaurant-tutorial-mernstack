import React from "react";
import "./Signup.css";

const Signup = () => {
  const showSignupForm = () => (
    <form className="signup-form">
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i class="bi bi-person-fill"></i>
          </span>
        </div>
        <input
          name=""
          className="form-control"
          placeholder="UserName"
          type="text"
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i class="bi bi-envelope-fill"></i>
          </span>
        </div>
        <input
          name=""
          className="form-control"
          placeholder="Email address"
          type="email"
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i class="bi bi-lock-fill"></i>
          </span>
        </div>
        <input
          className="form-control"
          placeholder="Create password"
          type="password"
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i class="bi bi-unlock-fill"></i>
          </span>
        </div>
        <input
          className="form-control"
          placeholder="Confirm password"
          type="password"
        />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Signup
        </button>
      </div>

      {/* already have account */}
      <p className="text-center text-white">
        Have an account?<a href="#">Log In</a>
      </p>
    </form>
  );
  return (
    <div className="signup-container">
      <div className="row px-3 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          
          {showSignupForm()}
        </div>
      </div>
    </div>
  );
};
export default Signup;
