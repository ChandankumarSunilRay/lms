import React from "react";
import { FaStar } from "react-icons/fa";
import "./testimonials.css";

const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    position: "Web Development Student",
    message:
      "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
    initials: "JD",
    color: "#6366f1",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Data Science Student",
    message:
      "I've learned more here than anywhere else. The interactive lessons and quizzes make learning enjoyable.",
    initials: "JS",
    color: "#8b5cf6",
  },
  {
    id: 3,
    name: "Alex Kumar",
    position: "App Development Student",
    message:
      "The structured curriculum and hands-on projects gave me the confidence to build real applications.",
    initials: "AK",
    color: "#3b82f6",
  },
  {
    id: 4,
    name: "Priya Sharma",
    position: "AI & ML Student",
    message:
      "Flexible learning at my own pace was a game-changer. I could balance work and upskilling seamlessly.",
    initials: "PS",
    color: "#a855f7",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Students Say</h2>
      <p className="testimonials__subtitle">
        Real feedback from learners who transformed their skills with us.
      </p>
      <div className="testimonials-cards">
        {testimonialsData.map((e) => (
          <div className="testimonial-card" key={e.id}>
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="message">&ldquo;{e.message}&rdquo;</p>
            <div className="testimonial-author">
              <div
                className="avatar"
                style={{ background: `linear-gradient(135deg, ${e.color}, ${e.color}99)` }}
              >
                {e.initials}
              </div>
              <div className="info">
                <p className="name">{e.name}</p>
                <p className="position">{e.position}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
