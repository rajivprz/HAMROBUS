import React, { useState, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { editbusInputs } from "../../formSource";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditBus = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID:", id);
    axios
      .get(`http://localhost:8800/api/bus/find/${id}`)
      .then((result) => {
        console.log(result);
        const busData = result.data;

        const cloudinaryImageUrl = busData.photos && busData.photos[0];
        setFormData({ ...busData, image: cloudinaryImageUrl });

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "unavailableDates") {
      setFormData({ ...formData, [id]: [value] });
    }
    setFormData({ ...formData, [id]: value });
  };

  const handleEditConfirmation = () => {
    Swal.fire({
      title: "Confirm Edit",
      text: "Are you sure you want to edit this bus data?",
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

  const handleEdit = () => {
    axios
      .put(`http://localhost:8800/api/bus/${id}`, formData)
      .then((result) => {
        console.log(result);
        navigate("/bus");

        Swal.fire({
          icon: "success",
          title: "Bus Updated",
          text: "The bus data has been successfully updated.",
        });
      })
      .catch((err) => {
        console.log("Error Updating the data ", err);

        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Bus data update failed. Please try again later.",
        });
      });
  };

  return (
    <div>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />
          <div className="top">Edit Bus</div>
          <div className="bottom">
            <div className="left">
              <img
                src={
                  formData.image
                    ? formData.image
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            </div>

            <div className="right">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
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

                  {editbusInputs &&
                    editbusInputs.map((input) => (
                      <div className="formInput" key={input.id}>
                        <label>{input.label}</label>
                        <input
                          id={input.id}
                          type={input.type}
                          placeholder={input.placeholder}
                          value={formData[input.id] || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    ))}
                  <button type="button" onClick={handleEditConfirmation}>
                    Update
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBus;
