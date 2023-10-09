import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./searchitem.css";
import * as moment from "moment-timezone";

export function parseDate(dateString) {
  if (typeof dateString === "object") {
    dateString = moment(dateString).format("DD/MM/YYYY").toString();
  }
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  return null;
}
const Searchitem = ({ item }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setSelectedPhotoIndex(0);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "ArrowRight" &&
      selectedPhotoIndex < item.photos.length - 1
    ) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    } else if (event.key === "ArrowLeft" && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    } else if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, selectedPhotoIndex]);

  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt={`Image 0`}
        className="sImg"
        onClick={openModal}
      />
      <div className="sDetails">
        <ul className="detailsList">
          <li className="sDesc">Name: {item.name}</li>
          <li className="sType">Type: {item.busType}</li>
          <li className="sDeparture">Departure City: {item.startCity}</li>
          <li className="sFeature">Destination City: {item.destinationCity}</li>
          <li className="sTime">Time: {item.time}</li>
          <li className="sPrice">Price: Rs.{item.pricePerSeat}</li>
        </ul>
      </div>
      <Link
        to={`/bus/${item._id}?date=${moment(
          item.departureDate
        ).toISOString()}&busId=${item._id}`}
      >
        <button className="siCheckButton">Reserve a Seat</button>
      </Link>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <img
              src={item.photos[selectedPhotoIndex]}
              alt={`Image ${selectedPhotoIndex}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchitem;
