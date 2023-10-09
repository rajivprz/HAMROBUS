import React from "react";
import "./toptravelled.css";
import { useNavigate } from "react-router-dom";

const Toptravelled = () => {
  const navigate = useNavigate();
  const mostTravelledPlaces = [
    {
      name: "mustang",
      image:
        "Mustang.jpeg",
    },
    {
      name: "pokhara",
      image:
        "Pokhara.jpeg",
    },
    {
      name: "kathmandu",
      image:
        "Kathmandu.jpeg",
    },
  ];

  return (
    <div className="toptravelled">
      <>
        {mostTravelledPlaces.map((place) => {
          return (
            <div
              className="toptravelledItem"
              onClick={() =>
                navigate("/bus", {
                  state: {
                    sourceCity: "",
                    destinationCity: place.name,
                    date: "",
                  },
                })
              }
            >
              <img src={place.image} alt="" className="toptravelledImg" />
              <div className="toptravelledTitles">
                <h2>{place.name.toUpperCase()}</h2>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default Toptravelled;
