import React from "react";
import "./about.css";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import NavBar from "../../components/navbar/Navbar";

const Contact = () => {
  return (
    <>
      <NavBar />
      <div className="container about-container">
        <div title={"About Us"} className="about-section">
          <div className="row">
            <div className="col-md-6">
              <h1 className="about-heading">Welcome to Hamro Bus</h1>
              <p className="text-justify about-description">
              Welcome to HAMRO BUS, your reliable partner in hassle-free and convenient bus travel.
                 At HAMRO BUS, we understand the importance of a seamless journey, 
                 and we are dedicated to providing you with a superior ticket booking experience.

                 <h3 className="about-heading2">Our Mission</h3>
              <p className="text-justify about-description">At HAMRO BUS, our mission is to simplify your travel experience. We aim to redefine bus travel by offering seamless online booking, comfortable rides, and exceptional customer service. Whether you're a frequent traveler or embarking on a new adventure, we strive to make your journey with us memorable and stress-free.</p>

              <h3 className="about-heading2">Get On Board</h3>
              <p className="text-justify about-description">Join us on a journey of convenience, comfort, and reliability. Book your bus tickets with HAMRO BUS today and experience travel like never before. We look forward to serving you and being a part of your memorable journeys.
              </p>
              </p>
            </div>
            <div className="col-md-6 about-image1">
              <img src="./bus.jpg" alt="Bus Image" />
            </div>
          </div>
        </div> 
        <div title={"About Us"} className="about-section">
          <div className="row">
          <h1 className="about-heading1">Our Buses</h1>
            <div className="col-md-6">
              <h1 id="toyota" className="about-heading">Toyota Coaster</h1>
              <p className="text-justify about-description">
              The Toyota Coaster Bus embodies the perfect blend of elegance and functionality. Known for its reliability and exceptional performance, this bus offers a smooth and comfortable ride for passengers. With its spacious interior and ergonomic design, the Toyota Coaster ensures a pleasant journey for travelers, making it an ideal choice for group tours, corporate events, and long-distance travel.
              </p>
            </div>
            <div className="col-md-6 about-image">
              <img src="./toyotacoaster.jpg" alt="Bus Image" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h1 id="sofa" className="about-heading">Premium Sofa Seater Bus</h1>
              <p className="text-justify about-description">
              Our Premium Sofa Seater Bus redefines luxury travel with its plush seating and opulent amenities. This bus is meticulously designed to provide passengers with the ultimate in comfort and style. The sumptuous sofa seats offer ample legroom, and the interior is adorned with upscale finishes. Whether you're planning a special event, a corporate outing, or a leisure trip, our Premium Sofa Seater Bus guarantees a lavish travel experience that exceeds expectations.
              </p>
            </div>
            <div className="col-md-6 about-image">
              <img src="./premiumsofa.jpg" alt="Bus Image" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h1 id="ac" className="about-heading">AC Tourist Deluxe</h1>
              <p className="text-justify about-description">
              Step into the epitome of sophistication with our AC Tourist Deluxe Bus. This bus is equipped with state-of-the-art air conditioning systems, ensuring a cool and refreshing environment even during the hottest days. The interior is carefully crafted for both comfort and convenience, featuring reclining seats, ample luggage storage, and entertainment facilities. Whether you're embarking on a scenic tour or a long-haul journey, our AC Tourist Deluxe Bus provides a delightful travel experience that combines luxury with practicality.
              </p>
            </div>
            <div className="col-md-6 about-image">
              <img src="./actouristdelux.jpg" alt="Bus Image" />
            </div>
          </div>
        </div>
        <div className="contact-info">
          <h2 className="contact-heading">Contact Us</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="contact-card">
                <BiMailSend className="contact-icon" />
                <a className="contact-text" href = "mailto: info@hamrobus.com">info@hamrobus.com</a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="contact-card">
                <BiPhoneCall className="contact-icon" />
                <p className="contact-text">Phone: +977 9826163997</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;