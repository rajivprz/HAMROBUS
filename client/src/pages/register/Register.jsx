import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/Navbar";
import "./register.css";
import Footer from "../../components/footer/Footer";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    img: "",
  });
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { loading, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    document.getElementById("photo").click();
  };

  const uploadImageToCloudinary = async () => {
    if (!selectedFile) {
      return "";
    }

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "project");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnuomhfwl/image/upload",
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return "";
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START" });

    if (
      !credentials.username ||
      !credentials.email ||
      !credentials.password ||
      !credentials.phone
    ) {
      Swal.fire({
        icon: "error",
        title: "Fill in All Fields",
        text: "Please fill in all fields.",
      });
      return;
    }

    try {
      const imageUrl = await uploadImageToCloudinary();
      credentials.img = imageUrl;

      const res = await axios.post("/auth/register", credentials);

      if (res.data.error) {
        if (res.data.error.includes("Email is not unique.")) {
          Swal.fire({
            icon: "error",
            title: "Email Not Unique",
            text: "Email is not unique.",
          });
        } else {
          dispatch({ type: "REGISTER_FAILURE", payload: res.data.error });
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: "Registration failed. Please try again.",
          });
        }
      } else {
        dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });

        // Show the "Please verify your email" message
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          html: "<strong>Please verify your email before logging in.</strong>",
        });

        navigate("/login");
      }
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Registration failed. Please try again.",
      });
    }
  };

  useEffect(() => {
    let timer;
    if (registrationStatus === "error") {
      timer = setTimeout(() => {
        setRegistrationStatus(null);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [registrationStatus]);

  return (
    <>
      <NavBar />
      <div className="register">
        <div className="rContainer">
          <h2 className="logins">Register</h2>
          <div className="profile-picture-container">
            <div className="profile-picture" onClick={handleUploadClick}>
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Profile Preview"
                  className="profile-image"
                />
              ) : (
                <i className="fas fa-camera"></i>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              id="photo"
              onChange={handleFileChange}
              className="profile-picture-input"
            />
          </div>
          <input
            type="text"
            placeholder="username"
            id="username"
            value={credentials.username}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="email"
            placeholder="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            className="rInput"
          />
          <input
            type="number"
            placeholder="phone"
            id="phone"
            value={credentials.phone}
            onChange={handleChange}
            className="rInput"
          />
          <button disabled={loading} onClick={handleClick} className="rButton">
            Register
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
