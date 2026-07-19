import React from "react";
import "./dashbord.css";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";

const Dashbord = () => {
  const { mycourse } = CourseData();

  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1>📚 My Learning Dashboard</h1>
        <p>Here are the courses you're currently enrolled in. Continue learning and growing!</p>
      </div>

      <section className="dashboard-section">
        <h2 className="section-title">Enrolled Courses</h2>
        {mycourse && mycourse.length > 0 ? (
          <div className="dashboard-courses-grid">
            {mycourse.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <p className="no-courses-msg">You haven't enrolled in any courses yet.</p>
        )}
      </section>
    </div>
  );
};

export default Dashbord;
