import React, { useState } from "react";
import NavBar from "../../components/navbar/Navbar";
import axios from "axios";
import { AuthContext } from "../../context/Authcontext";
import "./BookingPage.css"; // Import the CSS file
import FileDownload from "js-file-download";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function BookingPage() {
  const { user } = React.useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (user?._id) {
      const getBooking = async () => {
        const booking = await axios.get(
          `http://localhost:8800/api/book?userId=${user?._id || ""}`
        );
        setBookings(booking.data);
      };
      getBooking();
    }
  }, [user?._id]);

  const visibleBookings = bookings.slice(0, 15);

  const handlePrintTicket = (e, bookingId) => {
    e.preventDefault();
    axios({
      url: `http://localhost:8800/api/book/${bookingId}/ticket`,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      FileDownload(res.data, "downloaded.png");
      navigate(`/ticket/${bookingId}`);
    });
  };
  console.log(bookings);

  return (
    <div>
      <NavBar />
      <div className="booking-container">
        <table className="booking-table">
          <thead>
            <tr>
              <th>Bus Type</th>
              <th>Bus Number</th>
              <th>Seat No</th>
              <th>Date</th>
              <th>Start City</th>
              <th>Destination City</th>
              <th>Boarding Time</th>
              <th>Boarding Point</th>
              <th>Fare</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {visibleBookings?.length > 0 &&
              visibleBookings.map((booking) => {
                const formattedDate = new Date(booking.date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }
                );

                return (
                  <tr key={booking._id}>
                    <td>{booking.name}</td>
                    <td>{booking.busNumber}</td>
                    <td>{booking.seats.join(", ")}</td>
                    <td>{formattedDate}</td>
                    <td>{booking.startCity}</td>
                    <td>{booking.destinationCity}</td>
                    <td>{booking.time}</td>
                    <td>{booking.boardingPoint}</td>
                    <td>{booking.price}</td>
                    <td>
                      <Link to={`/ticket/${booking._id}`}>
                        <button className="print-button">Print Ticket</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
