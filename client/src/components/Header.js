import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../helpers/auth";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);

  const handleLogout = () => {
    logout(() => {
      navigate("/signin");
    });
  };

  // VIEWS
  const showNavigation = () => (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Logo
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {!isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fas fa-home"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/shop">
                    <i className="fas fa-shopping-bag"></i> Shop
                  </Link>
                </li>
                <li className="nav-item mr-2" style={{ position: "relative" }}>
                  <Link className="nav-link" to="/cart">
                    <i className="fas fa-shopping-cart"></i> Cart
                    <span
                      className="badge badge-danger"
                      style={{ position: "absolute", top: "0px" }}
                    >
                      {" "}
                      {cart.length}
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    <i className="fas fa-edit"></i> Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    <i className="fas fa-sign-in-alt"></i> Signin
                  </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().role === 0 && (
              <Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/user/dashboard">
                    <i className="fas fa-user-cog"></i> Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fas fa-home"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/shop">
                    <i className="fas fa-shopping-bag"></i> Shop
                  </Link>
                </li>
                <li className="nav-item mr-2" style={{ position: "relative" }}>
                  <Link className="nav-link" to="/cart">
                    <i className="fas fa-shopping-cart"></i> Cart
                    <span
                      className="badge badge-danger"
                      style={{ position: "absolute", top: "0px" }}
                    >
                      {" "}
                      {cart.length}
                    </span>
                  </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().role === 1 && (
              <Fragment>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/dashboard">
                    <i className="fas fa-user-cog"></i> Dashboard
                  </Link>
                </li>
              </Fragment>
            )}

            {isAuthenticated() && (
              <Fragment>
                <li className="nav-item">
                  <button
                    className="btn btn-link text-secondary text-decoration-none pl-0"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt"></i> logout
                  </button>
                </li>
              </Fragment>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
  // render
  return <header>{showNavigation()}</header>;
};

export default Header;
