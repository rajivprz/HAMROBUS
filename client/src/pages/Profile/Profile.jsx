import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { AuthContext } from "../../context/Authcontext";
import "./Profile.scss";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("ID:", id);

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/users/${id}`
        );

        setUserData(response.data);
        setName(response.data.username);
        setEmail(response.data.email);
        setPhone(response.data.phone);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Function to handle the user profile edit confirmation
  const handleEditConfirmation = () => {
    Swal.fire({
      title: "Confirm Edit",
      text: "Are you sure you want to edit your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Edit",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleEdit();
      }
    });
  };

  const handleEdit = async () => {
    console.log("Updating user data:", userData);

    // Check if any of the fields are empty
    if (!name || !email || !phone) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Please fill in all fields before updating your profile.",
      });
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8800/api/users/${id}`,
        userData
      );
      console.log(response);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been successfully updated.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Profile update failed. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Error updating the data: ", error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Profile update failed. Please try again later.",
      });
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <div className="wrapper">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <form className="shadow-lg">
              <h1 className="mt-2 mb-5">User Profile</h1>

              <div className="form-group">
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img
                        className="rounded-circle avatar-image"
                        alt="Avatar Preview"
                        src={userData.img}
                      />
                    </figure>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="imput-gara"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setUserData({ ...userData, username: e.target.value });
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="imput-gara"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setUserData({ ...userData, email: e.target.value });
                  }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone_field">Phone</label>
                <input
                  type="text"
                  id="phone_field"
                  className="imput-gara"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setUserData({ ...userData, phone: e.target.value });
                  }}
                />
              </div>
              <button
                type="button"
                className="button"
                onClick={handleEditConfirmation}
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
