import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import "./coursestudy.css";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
      navigate("/");
    } else {
      fetchCourse(params.id);
    }
  }, [params.id]);

  return (
    <section className="course-study">
      {course && (
        <div className="study-card">
          <img
            src={`${server}/${course.image}`}
            alt={course.title}
            className="study-image"
          />

          <div className="study-info">
            <h2 className="study-title">{course.title}</h2>
            <p className="study-description">{course.description}</p>
            <p className="study-meta">By: {course.createdBy}</p>
            <p className="study-meta">Duration: {course.duration} weeks</p>

            <div className="study-actions">
              <Link to={`/lectures/${course._id}`} className="study-link">
                Go to Lectures →
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CourseStudy;