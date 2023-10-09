import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../../context/Authcontext";
import MenuIcon from "@mui/icons-material/Menu";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const { user, dispatch } = useContext(AuthContext);
  const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setClick(!click);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "LOGOUT" });
        Swal.fire(
          "Logout Successful",
          "You have been logged out.And Directed to Home Page",
          "success"
        );
        navigate("/");
      }
    });
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img src="./../logo1.jpg" alt="" className="logo" />
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink to={`/profile/${user._id}`} className="nav-linkss">
                    {user.username}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/booking" className="nav-links">
                    View Booking
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/register"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/login"
                    activeClassName="active"
                    className="nav-links"
                    onClick={handleClick}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
