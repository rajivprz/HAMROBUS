import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    // Display a confirmation dialog using SweetAlert2
    Swal.fire({
      icon: "question",
      title: "Confirm Delete",
      text: "Are you sure you want to delete this item?",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "No, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/${path}/${id}`);
          setList(list.filter((item) => item._id !== id));

          // Show a success SweetAlert2 when the item is deleted successfully
          Swal.fire({
            icon: "success",
            title: "Delete Successful",
            text: "The item has been deleted successfully.",
          });
        } catch (error) {
          // Handle error here
          console.error("Delete failed:", error);
          // Show an error SweetAlert2 if deletion fails
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: "Deletion failed. Please try again later.",
          });
        }
      }
    });
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        if (path === "bus" || path === "book") {
          return (
            <div className="cellAction">
              <div className="editButton">
                <Link to={`/${path}/edit/${params.row._id}`}>Edit</Link>
              </div>
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
              >
                Delete
              </div>
            </div>
          );
        } else {
          return (
            <div className="cellAction">
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id)}
              >
                Delete
              </div>
            </div>
          );
        }
      },
    },
  ];

  const renderAddNewButton = (path === "users" || path === "bus") && (
    <Link to={`/${path}/new`} className="link">
      Add New
    </Link>
  );
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        {renderAddNewButton}
      </div>
      {list && (
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
    </div>
  );
};

export default Datatable;
