import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Display a confirmation dialog using SweetAlert2
    Swal.fire({
      icon: "question",
      title: "Confirm Logout",
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform any logout logic here if necessary
        // For demonstration purposes, simulate a logout delay
        setTimeout(() => {
          // Display a success message
          Swal.fire({
            icon: "success",
            title: "Logout Successful",
            text: "You have been successfully logged out.",
          });

          // Redirect to the login page
          navigate("/login");
        }, 1500); // Adjust the delay time as needed
      }
    });
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src="logo1.jpg" alt="" className="logo" />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          {/* <p className="title">MAIN</p> */}
          {/* <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li> */}
          {/* <p className="title">LISTS</p> */}
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/bus" style={{ textDecoration: "none" }}>
            <li>
              <DirectionsBusIcon className="icon" />
              <span>Bus</span>
            </li>
          </Link>
          <Link to="/book" style={{ textDecoration: "none" }}>
            <li>
              <BookOnlineIcon className="icon" />
              <span>Bookings</span>
            </li>
          </Link>
          {/* <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">ADMIN</p>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
