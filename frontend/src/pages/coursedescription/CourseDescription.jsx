import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CourseData } from "../../context/CourseContext";
import { UserData } from "../../context/UserContext";
import { server } from "../../main";
import Loading from "../../components/loading/Loading";
import "./coursedescription.css";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  const checkoutHandler = async () => {
  const token = localStorage.getItem("token");
  setLoading(true);

  // Disable scrolling on body when Razorpay modal opens
  document.body.style.overflow = "hidden";

  try {
    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      { headers: { token } }
    );

    const options = {
      key:"rzp_test_TDKbsqWCFGCpOg",
      amount: order.id,
      currency: "INR",
      name: "THE VIRTUAL CAMPUS",
      description: "Learn with us",
      order_id: order.id,
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            { razorpay_order_id, razorpay_payment_id, razorpay_signature },
            { headers: { token } }
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Payment verification failed"
          );
        } finally {
          setLoading(false);
          // Re-enable scrolling after payment completes
          document.body.style.overflow = "auto";
        }
      },
      theme: { color: "#8a4baf" },

      // Add ondismiss callback to re-enable scrolling if user closes modal
      modal: {
        ondismiss: function () {
          setLoading(false);
          document.body.style.overflow = "auto";
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
    setLoading(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling on error
  }
};


  if (loading) return <Loading />;

  return (
    <section className="course-page-wrapper">
      <section className="course-description">
        {course && (
          <>
            {/* Header */}
            <div className="course-header">
              <img
                src={`${server}/${course.image}`}
                alt={course.title}
                className="course-image"
              />
              <div className="course-info">
                <h2 className="course-title">{course.title}</h2>
                <p className="course-meta">Instructor: {course.createdBy}</p>
                <p className="course-meta">Duration: {course.duration} weeks</p>
              </div>
            </div>

            {/* Description */}
            <div className="course-body">
              <p className="course-text">{course.description}</p>
              <p className="course-price">
                Only <strong>₹{course.price}</strong>
              </p>
            </div>

            {/* Actions */}
            <div className="course-actions">
              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <button onClick={checkoutHandler} className="common-btn">
                  Buy Now
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </section>
  );
};

export default CourseDescription;

