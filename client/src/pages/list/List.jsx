import React, { useState } from "react";
import "./list.css";
import NavBar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Searchitem, { parseDate } from "../../components/searchitem/Searchitem";
import useFetch from "../../hooks/useFetch";
import moment from "moment-timezone";

const List = () => {
  const location = useLocation();
  const [startCity, setStartCity] = useState(location.state?.sourceCity || "");
  const [destinationCity, setDestinationCity] = useState(
    location.state?.destinationCity || ""
  );
  const [date, setDate] = useState(
    moment(location.state?.date || new Date()).format("DD/MM/YYYY") ||
      moment(new Date()).format("DD/MM/YYYY")
  );
  console.log(moment(location.state?.date).format("DD/MM/YYYY"));
  console.log("loc", location.state?.date);
  const [openDate, setOpenDate] = useState(false);

  const { data, loading, reFetch } = useFetch(
    `/bus/buses?startCity=${startCity}&destinationCity=${destinationCity}&travelDate=${date}`
  );
  const handleClick = () => {
    reFetch();
  };

  const handleStartCity = (e) => {
    e.preventDefault();
    setStartCity(e.target.value || "");
  };

  const handleDestinationCity = (e) => {
    e.preventDefault();
    setDestinationCity(e.target.value || "");
  };

  return (
    <div id="root">
      <NavBar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listsearch">
            <div className="lsItem">
              <label>Source City</label>
              <input
                type="text"
                placeholder={startCity}
                value={startCity}
                onChange={handleStartCity}
              />
            </div>
            <div className="lsItem">
              <label> Destination City</label>
              <input
                type="text"
                placeholder={destinationCity}
                value={destinationCity}
                onChange={handleDestinationCity}
              />
            </div>
            <div className="lsItem">
              <label>Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${moment(
                parseDate(date)
              ).format("DD/MM/YYYY")}`}</span>
              {openDate && (
                <Calendar
                  onChange={(date) =>
                    setDate(moment(date).format("DD/MM/YYYY"))
                  }
                  minDate={new Date()}
                />
              )}
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listresult">
            {loading ? (
              "Loading..."
            ) : (
              <>
                {data.length > 0 ? (
                  data.map((item) => (
                    <Searchitem
                      item={{ ...item, departureDate: date }}
                      key={item._id}
                    />
                  ))
                ) : (
                  <p>No buses found</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
