import React, { useEffect, useRef, useState } from "react";
import "./ticket.css";
import axios from "axios";
import NavBar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
// import { useReactToPrint } from "react-to-print";
const Ticket = () => {
  const { user } = React.useContext(AuthContext);
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();
  const componentPDF = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Ticket Details",
  });

  const handlePrintTicket = () => {
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
      }
    });
  };

  useEffect(() => {
    if (user?._id) {
      const getBooking = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8800/api/book?userId=${user?._id}`
          );
          if (response.data.length > 0) {
            setBooking(response.data[0]);
          } else {
            console.log("No bookings found for the user.");
          }
        } catch (error) {
          console.error("Error fetching booking data: ", error);
        }
      };
      getBooking();
    }
  }, [user?._id]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="wrapper" ref={componentPDF}>
        <div className="ticket-container">
          <h1 className="company-name">
            <img src="logo2.jpg" alt="" className="logos" />
            {booking.name}
          </h1>
          <p className="company-address">{booking.companyAddress}</p>
        </div>
        <button className="print-ticket" onClick={handlePrintTicket}>
          Print Ticket
        </button>
      </div>
    </>
  );
};

export default Ticket;
{
  /* <div className="wrapper">
        <div className="ticket-container">
          <h1 className="company-name">
            <img src="logo2.jpg" alt="" className="logos" />
            {ticketInfo.companyName}
          </h1>
          <p className="company-address">{ticketInfo.companyAddress}</p>
          <p className="company-ph-no">{ticketInfo.companynumber}</p>
          <div className="ticket-info">
            <div className="table">
              <table className="tableis">
                <tr>
                  <td>
                    <div className="details1">
                      <p className="passenger-name">
                        <td> Name: </td>
                        <td>{ticketInfo.passengerName}</td>
                      </p>
                      <p className="bus-no">
                        Bus Number: {ticketInfo.busNumber}
                      </p>
                      <p className="boarding-point">
                        Boarding Point: {ticketInfo.boardingPoint}
                      </p>
                      <p className="departure-time">
                        Departure Time: {ticketInfo.departureTime}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="details2">
                      <p className="phone-no">
                        <td>Phone Number: </td>
                        <td>{ticketInfo.phoneNumber}</td>
                      </p>
                      <p className="seat-no">
                        Seat Number: {ticketInfo.seatNumber}
                      </p>
                      <p className="destination">
                        Destination Point: {ticketInfo.destinationPoint}
                      </p>
                      <p className="date">Date: {ticketInfo.date}</p>
                      <p className="bus-type">Bus Type: {ticketInfo.busType}</p>
                    </div>
                  </td>
                </tr>
              </table>
              <p className="price">Ticket Price: Rs {ticketInfo.ticketPrice}</p>
            </div>
          </div>
        </div>
        <button className="print-ticket">Print Ticket</button>
      </div> */
}
