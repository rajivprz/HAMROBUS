import "./book.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React from "react";

const Book = () => {
  return (
    <div className="book">
      <Sidebar />
      <div className="bookContainer">
        <Navbar />
      </div>
    </div>
  );
};

export default Book;
