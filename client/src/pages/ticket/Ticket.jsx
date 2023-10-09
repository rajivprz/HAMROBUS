import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import "./ticket.css";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";

const Ticket = () => {
  const componentPDF = useRef();
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [isPrintButtonVisible, setIsPrintButtonVisible] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/book/${id}`
        );
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking data: ", error);
      }
    };

    fetchBooking();
  }, [id]);

  const formattedDate = new Date(booking?.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const handlePrint = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Ticket Details",
  });

  const handlePrintTicket = () => {
    setIsPrintButtonVisible(false);
    Swal.fire({
      title: "Print Ticket",
      text: "Are you sure you want to print this ticket?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, print it!",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handlePrint();
        navigate("/booking");
      } else {
        setIsPrintButtonVisible(true);
      }
    });
  };

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div ref={componentPDF} style={{ width: "100%" }}>
        <div className="wrapper">
          <div className="ticket-container">
            <h1 className="company-name">
              <img src="./../logo2.jpg" alt="" className="logos" />
              HAMRO BUS TICKET BOOKING PVT LTD
            </h1>
            <p className="company-address">MASBAR-7, POKHARA</p>
            <p className="company-ph-no">061-526527, 9826163997</p>
            <div className="ticket-info">
              <div className="table">
                <table className="tableis">
                  <tr>
                    <td>
                      <div className="details1">
                        <p className="passenger-name">
                          <td> Bus Name: </td>
                          <td>{booking.name}</td>
                        </p>
                        <p className="seat-no">
                          Seat Number: {booking.seats.join(", ")}
                        </p>
                        <p className="boarding-point">
                          Start City: {booking.startCity}
                        </p>
                        <p className="departure-time">
                          Departure Time: {booking.time}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="details2">
                        <p className="bus-no">
                          Bus Number: {booking.busNumber}
                        </p>
                        <p className="boarding-point">
                          Boarding Point: {booking.boardingPoint}
                        </p>
                        <p className="destination">
                          Destination Point: {booking.destinationCity}
                        </p>
                        {/* <p className="date">Date: {booking.date}</p> */}
                        <p className="bus-type">
                          Boarding Date: {formattedDate}
                        </p>
                      </div>
                    </td>
                  </tr>
                </table>
                <p className="price">Ticket Price: Rs {booking.price}</p>
              </div>
            </div>
          </div>
          {isPrintButtonVisible && (
            <button
              className="print-buttons"
              onClick={() => handlePrintTicket()}
            >
              Print Ticket
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Ticket;
