import React, { useState } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faCalendarDays,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { startCase } from "lodash";
import axios from "axios";

const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [sourceCity, setSourceCity] = useState([]);
  const [destinationCity, setDestinationCity] = useState("");
  const [date, setDate] = useState(new Date());
  const [destinations, setDestinations] = useState([]);
  const [startCities, setStartCities] = useState([]);
  const [buses, setBuses] = useState([]);

  React.useEffect(() => {
    const getStartAndDestinations = async () => {
      const { data } = await axios.get(`http://localhost:8800/api/bus/cities`);
      setDestinations(data.destinations);
      setStartCities(data.startcities);
    };
    getStartAndDestinations();
  }, []);

  React.useEffect(() => {
    const fetchBus = async () => {
      const buses = await axios.get(
        `http://localhost:8800/api/bus/buses?startCity=${
          sourceCity || ""
        }&destinationCity=${destinationCity || ""}`
      );
      setBuses(buses.data);
    };
    fetchBus();
  }, [sourceCity, destinationCity]);

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!sourceCity || !destinationCity) {
      alert("Please select both source and destination cities.");
    } else {
      navigate("/bus", { state: { sourceCity, destinationCity, date } });
    }
  };

  const handleDateChange = (newDate) => {
    // Prevent selecting a previous date
    const currentDate = new Date();
    if (newDate >= currentDate) {
      setDate(newDate);
    }
  };

  return (
    <div className="header">
      <div className="headerList">
        {type !== "list" && (
          <div>
            <div className="write">
              <h1>Book your journey now with the bus platform Hamro Bus</h1>
            </div>
            {/* <div className="headerListItem">
              <FontAwesomeIcon icon={faBus} />
            </div> */}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  headerIcon
                  className="headerIcon"
                  style={{ color: "red" }}
                  // style={{ color: "red" }}
                />
                <Form.Group>
                  <Typeahead
                    id="basic-typeahead-single"
                    labelKey="name"
                    onChange={setSourceCity}
                    options={startCities.map((s) => startCase(s)) || []}
                    placeholder="Source city..."
                    selected={sourceCity}
                  />
                </Form.Group>
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="headerIcon"
                  style={{ color: "red" }}
                />
                {/* <FontAwesomeIcon icon={faLocationDot} className="headerIcon" /> */}
                <FontAwesomeIcon
                  // icon={faLocationDot}
                  className="headerIcon"
                  style={{ color: "red" }}
                />

                <Form.Group>
                  <Typeahead
                    id="basic-typeahead-single"
                    labelKey="name"
                    onChange={setDestinationCity}
                    options={destinations.map((d) => startCase(d)) || []}
                    placeholder="Destination City"
                    selected={destinationCity}
                  />
                </Form.Group>
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  // icon={faCalendarDays}
                  className="headerIcon"
                  style={{ color: "red" }}
                />
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="headerIcon"
                  style={{ color: "red" }}
                />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {`${format(date, "MM/dd/yyyy")}`}
                </span>

                {openDate && (
                  <Calendar
                    onChange={handleDateChange}
                    value={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <button
                  className="headerbtn"
                  onClick={handleSearch}
                  disabled={!sourceCity || !destinationCity}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

{
  /* <div>
          {buses.length > 0 &&
            buses.map((bus) => {
              return (
                <div key={bus.id}>
                  <p>{bus.name}</p>
                </div>
              );
            })}
        </div> */
}
