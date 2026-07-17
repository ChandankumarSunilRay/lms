import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <h1 className="hero__title">
            🚀 Unlock <span>Your Potential</span>
          </h1>
          <p className="hero__subtitle">
            Learn Anytime, Anywhere & Grow Smarter
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="hero__btn common-btn"
          >
            Get Started
          </button>
        </div>

        {/* Floating Dots Animation */}
        <div className="hero__animation">
          <span className="hero__dot"></span>
          <span className="hero__dot"></span>
          <span className="hero__dot"></span>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="features__title">Why Choose Us?</h2>
        <div className="features__grid">
          <div className="feature__card">
            <h3>📚 Expert-Led Courses</h3>
            <p>Learn from industry experts with real-world experience.</p>
          </div>
          <div className="feature__card">
            <h3>🌍 Flexible Learning</h3>
            <p>Access content anytime, anywhere at your own pace.</p>
          </div>
          <div className="feature__card">
            <h3>💡 Practical Knowledge</h3>
            <p>Hands-on projects to boost your skills and confidence.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Home;
