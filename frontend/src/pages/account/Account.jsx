import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./account.css";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <section className="account">
      <div className="account-card">
        {/* Header */}
        <header className="account-header">
          <div className="avatar-placeholder">{user.name?.charAt(0)}</div>
          <h2 className="account-title">My Profile</h2>
        </header>

        {/* Info */}
        <div className="account-info">
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">{user.name}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{user.email}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="account-actions">
          <button
            onClick={() => navigate(`/${user._id}/dashboard`)}
            className="account-btn"
          >
            <MdDashboard /> Dashboard
          </button>

          {user.role === "admin" && (
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="account-btn"
            >
              <MdDashboard /> Admin Dashboard
            </button>
          )}

          <button onClick={logoutHandler} className="account-btn logout">
            <IoMdLogOut /> Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Account;