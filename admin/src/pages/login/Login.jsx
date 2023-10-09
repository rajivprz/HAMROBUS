import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import "./login.scss";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully logged in as an admin.",
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
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Login failed. Please try again.",
      });
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <div className="login">
      <div className="lContainer">
        <h2 className="admin_text">ADMIN LOGIN</h2>
        <input
          type="text"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
