import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { editbookInputs } from "../../formSource";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const EditBus = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8800/api/book/${id}`)
      .then((result) => {
        console.log(result);
        setFormData(result.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleEditConfirmation = () => {
    Swal.fire({
      title: "Confirm Edit",
      text: "Are you sure you want to edit this book data?",
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
      .put(`http://localhost:8800/api/book/${id}`, formData)
      .then((result) => {
        console.log(result);
        navigate("/book");

        Swal.fire({
          icon: "success",
          title: "Bookings Updated",
          text: "The book data has been successfully updated.",
        });
      })
      .catch((err) => {
        console.log("Error Updating the data ", err);

        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Book data update failed. Please try again later.",
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
            <div className="right">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <form>
                  {editbookInputs &&
                    editbookInputs.map((input) => (
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
