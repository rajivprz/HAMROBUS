import React from "react";
import "./busfeatures.css";
import { Link, NavLink } from "react-router-dom";
const Busfeatures = () => {
  return (
    <div className="bList">
      <div className="bListItem">
        <NavLink to="/about">
          <img
            src="https://bussewa.com/customer/bussewaUpload/namaste_kapilvastu_1575875010943_1582133227319.jpg"
            alt=""
            className="bListImg"
          />
        </NavLink>
        <div className="bListTitles">
          <h1>AC Deluxe</h1>
        </div>
      </div>
      <div className="bListItem">
        <NavLink to="/about">
          <img
            src="https://bussewa.com/customer/bussewaUpload/viber_image_2023-04-19_15-20-30-514_1681897514702.jpg"
            alt=""
            className="bListImg"
          />
        </NavLink>
        <div className="bListTitles">
          <h1>Premium Sofa Seater Bus</h1>
        </div>
      </div>
      <div className="bListItem">
        <NavLink to="/about">
          <img
            src="https://bussewa.com/customer/bussewaUpload/viber_image_2023-04-19_15-20-30-514_1681897255434.jpg"
            alt=""
            className="bListImg"
          />
        </NavLink>
        <div className="bListTitles">
          <h1>Toyota Coaster</h1>
        </div>
      </div>
    </div>
  );
};
export default Busfeatures;
