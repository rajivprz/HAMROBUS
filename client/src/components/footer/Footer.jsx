import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">All rights reserved &copy; Hamro Bus</h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>
      </p>
    </div>
  );
};

export default Footer;
