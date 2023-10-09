import "./newBus.css";
import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { busInputs } from "../../formSource";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const NewBus = () => {
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleAddConfirmation = () => {
    Swal.fire({
      title: "Confirm Add Bus",
      text: "Are you sure you want to add this bus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Add Bus",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleAddBus();
      }
    });
  };

  const handleAddBus = async () => {
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "project");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dnuomhfwl/image/upload",
            data
          );

          const { url } = uploadRes.data;

          return url;
        })
      );

      const newBus = {
        ...info,
        photos: list,
      };

      await axios.post("/bus", newBus);

      Swal.fire({
        icon: "success",
        title: "Bus Added",
        text: "The bus has been added successfully.",
      }).then(() => {
        setFiles([]);
        setInfo({});
        navigate("/bus");
      });
    } catch (error) {
      console.error("Error:", error);

      Swal.fire({
        icon: "error",
        title: "Add Bus Failed",
        text: "Bus addition failed. Please try again later.",
      });
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>New Bus</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files.length
                  ? URL.createObjectURL(files[0])
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
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {busInputs &&
                busInputs.map((input) => (
                  <div className="formInput" key={input.id}>
                    <label>{input.label}</label>
                    <input
                      id={input.id}
                      onChange={handleChange}
                      type={input.type}
                      placeholder={input.placeholder}
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

export default NewBus;
