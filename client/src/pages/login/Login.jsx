import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import "./login.css";
import Footer from "../../components/footer/Footer";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const queryParams = new URLSearchParams(window.location.search);
  const busId = queryParams.get("busId");
  const selectedSeats = queryParams.get("selectedSeats");
  const date = queryParams.get("date");

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("auth/login", credentials);
      if (!res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in",
        });

        navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "You are not allowed to log in.",
        });
        dispatch({ type: "LOGIN_FAILURE", payload: null });
      }
      if (busId) {
        navigate(`/bus/${busId}?selectedSeats=${selectedSeats}&date=${date}`);
      } else {
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Login failed. Please try again.",
      });
    }
  };

  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        dispatch({ type: "LOGIN_FAILURE", payload: null });
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [error, dispatch]);

  return (
    <>
      <NavBar />
      <div className="login">
        <div className="lContainer">
          <h2 className="logins">LOGIN</h2>
          <input
            type="text"
            placeholder="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="lInput"
          />
          <button disabled={loading} onClick={handleClick} className="lButton">
            Login
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
