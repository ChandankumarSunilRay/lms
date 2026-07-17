import React from "react";
import { CourseData } from "../../context/CourseContext";
import CourseCard from "../../components/coursecard/CourseCard";
import "./courses.css";

const Courses = () => {
  const { courses } = CourseData();

  return (
    <section className="courses">
      <h2 className="courses-title">Available Courses</h2>

      <div className="course-container">
        {courses && courses.length > 0 ? (
          courses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p className="no-courses">No Courses Yet!</p>
        )}
      </div>
    </section>
  );
};

export default Courses;