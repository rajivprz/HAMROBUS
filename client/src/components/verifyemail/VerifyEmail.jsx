import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { id } = useParams();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // console.log("ID", id);
    axios
      .get(`/auth/verify/${id}`)
      .then((response) => {
        if (response.status === 200) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      })
      .catch((error) => {
        console.error("Error verifying email:", error);
        setIsVerified(false);
      });
  }, [id]);

  return (
    <div className="verify-email">
      {isVerified ? (
        <>
          <h2>Email Verified</h2>
          <p>Your email has been successfully verified.</p>
          <p>
            You can now proceed to the <Link to="/login">login page</Link>.
          </p>
        </>
      ) : (
        <>
          <h2>Email Verification Failed</h2>
          <p>Sorry, we couldn't verify your email.</p>
          <p>Please check the verification link or contact support.</p>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
