import React from "react";
import { Link, useParams } from "react-router-dom";
import "./paymentsuccess.css";

const PaymentSuccess = ({ user }) => {
  const { id } = useParams();

  if (!user) return null;

  return (
    <section className="payment-success">
      <div className="payment-success__card">
        <div className="payment-success__status-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="check-icon"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="payment-success__title">Payment Successful</h1>
        <p className="payment-success__text">
          Your course subscription has been <strong>activated</strong>.
        </p>
        <p className="payment-success__ref">
          Transaction Reference: <code>{id}</code>
        </p>
        <Link
          to={`/${user._id}/dashboard`}
          className="payment-success__button"
        >
          Go to Dashboard
        </Link>
      </div>
    </section>
  );
};

export default PaymentSuccess;


