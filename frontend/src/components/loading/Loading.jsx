import React from "react";
import "./loading.css";

const Loading = ({ message = "Preparing your lesson...", iconType = "spinner" }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        {iconType === "spinner" ? (
          <div className="spinner" />
        ) : (
          <div className="book-turning"></div> 
        )}
        <p className="loading-text">{message}</p>
      </div>
    </div>
  );
};

export default Loading;




