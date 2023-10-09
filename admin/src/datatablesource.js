export const userColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];
export const busColumns = [
  // { field: "_id", headerName: "ID", width: 250 },
  // {
  //   field: "bus",
  //   headerName: "Bus",
  //   width: 230,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         {params.row.photos.map((photoUrl, index) => (
  //           <img
  //             key={index}
  //             className="cellImg"
  //             src={photoUrl || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
  //             alt={`Photo ${index + 1}`}
  //           />
  //         ))}
  //       </div>
  //     );
  //   },
  // },

  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "busType",
    headerName: "Type",
    width: 100,
  },
  {
    field: "busNumber",
    headerName: "BusNumber",
    width: 150,
  },
  {
    field: "startCity",
    headerName: "Start City",
    width: 100,
  },
  {
    field: "destinationCity",
    headerName: " Destination City",
    width: 150,
  },
  {
    field: "totalSeats",
    headerName: "Total Seats",
    width: 90,
  },

  {
    field: "pricePerSeat",
    headerName: "Price",
    width: 50,
  },
  // {
  //   field: "phonenum",
  //   headerName: "Phone Number",
  //   width: 150,
  // },

  // {
  //   field: "features",
  //   headerName: "Features",
  //   width: 150,cc
  // },
  {
    field: "boardingPoints",
    headerName: "Boarding Points",
    width: 150,
  },
  {
    field: "time",
    headerName: "Departure",
    width: 100,
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
  },
  {
    field: "unavailableDates",
    headerName: "Unavailable Date",
    width: 100,
  },
];
export const bookingColumns = [
  // { field: "userId", headerName: "UserId", width: 250 },
  // { field: "busId", headerName: "BusId", width: 250 },
  {
    field: "name",
    headerName: "Bus Name",
    width: 150,
  },
  {
    field: "nameOfPassenger",
    headerName: "Name of Passenger",
    width: 150,
  },
  {
    field: "startCity",
    headerName: "Start City",
    width: 100,
  },
  {
    field: "destinationCity",
    headerName: "Destination City",
    width: 150,
  },
  {
    field: "boardingPoint",
    headerName: "Boarding Point",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phonenumber",
    headerName: "Phone Number",
    width: 150,
  },
  {
    field: "seats",
    headerName: "Seats booked",
    width: 200,
  },
  {
    field: "price",
    headerName: "Total Price",
    width: 100,
  },
  {
    field: "time",
    headerName: "Time",
    width: 100,
  },
  {
    field: "date",
    headerName: "Date",
    width: 120,
  },
];
