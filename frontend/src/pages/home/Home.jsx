import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaClock,
  FaLaptopCode,
  FaRocket,
  FaUsers,
  FaGraduationCap,
} from "react-icons/fa";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";

const features = [
  {
    icon: <FaBookOpen />,
    title: "Expert-Led Courses",
    desc: "Learn from industry experts with real-world experience and structured curricula.",
  },
  {
    icon: <FaClock />,
    title: "Flexible Learning",
    desc: "Access content anytime, anywhere, and learn at your own pace on any device.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Hands-On Projects",
    desc: "Build practical skills through projects that mirror real workplace challenges.",
  },
];

const stats = [
  { icon: <FaGraduationCap />, value: "50+", label: "Courses" },
  { icon: <FaUsers />, value: "10K+", label: "Students" },
  { icon: <FaRocket />, value: "95%", label: "Completion Rate" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__bg">
          <span className="hero__orb hero__orb--1" />
          <span className="hero__orb hero__orb--2" />
          <span className="hero__orb hero__orb--3" />
          <span className="hero__grid" />
        </div>

        <div className="hero__content">
          <p className="hero__badge">
            <FaRocket /> Welcome to THE VIRTUAL CAMPUS
          </p>
          <h1 className="hero__title">
            Unlock Your <span>Potential</span>
          </h1>
          <p className="hero__subtitle">
            Learn anytime, anywhere. Master in-demand skills with interactive
            courses built for the modern learner.
          </p>
          <div className="hero__actions">
            <button
              onClick={() => navigate("/courses")}
              className="hero__btn hero__btn--primary"
            >
              Explore Courses
            </button>
            <button
              onClick={() => navigate("/about")}
              className="hero__btn hero__btn--ghost"
            >
              Learn More
            </button>
          </div>
        </div>

        <div className="hero__scroll">
          <span />
        </div>
      </section>

      <section className="stats">
        {stats.map((item) => (
          <div className="stats__item" key={item.label}>
            <div className="stats__icon">{item.icon}</div>
            <p className="stats__value">{item.value}</p>
            <p className="stats__label">{item.label}</p>
          </div>
        ))}
      </section>

      <section className="features">
        <h2 className="features__title">Why Choose Us?</h2>
        <p className="features__subtitle">
          Everything you need to grow — in one place.
        </p>
        <div className="features__grid">
          {features.map((feature) => (
            <div className="feature__card" key={feature.title}>
              <div className="feature__icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="cta">
        <div className="cta__glow" />
        <h2>Ready to start learning?</h2>
        <p>Join thousands of students already growing with us.</p>
        <button
          onClick={() => navigate("/courses")}
          className="hero__btn hero__btn--primary"
        >
          Get Started Today
        </button>
      </section>
    </div>
  );
};

export default Home;
