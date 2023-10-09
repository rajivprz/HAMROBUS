import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAddConfirmation = () => {
    // Show a confirmation SweetAlert2 before adding a new user
    Swal.fire({
      title: "Confirm Add User",
      text: "Are you sure you want to add this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Add User",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAddUser();
      }
    });
  };

  const handleAddUser = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "project"); // Replace with your actual upload preset name

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dnuomhfwl/image/upload",
        data
      );

      console.log("Upload Response:", uploadRes.data);

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);

      Swal.fire({
        icon: "success",
        title: "User Added",
        text: "The user has been added successfully.",
      }).then(() => {
        setFile("");
        setInfo({});
        navigate("/users");
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Add User Failed",
        text: "User addition failed. Please try again later.",
      });
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddConfirmation}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
