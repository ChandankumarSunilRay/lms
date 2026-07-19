import React from "react";
import "./common.css";
import { Link } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { UserData } from "../../context/UserContext";

const Sidebar = ({ open, onClose }) => {
  const { user } = UserData();

  return (
    <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <button
        type="button"
        className="sidebar-close"
        onClick={onClose}
        aria-label="Close menu"
      >
        <HiX />
      </button>

      <ul>
        <li>
          <Link to="/admin/dashboard" onClick={onClose}>
            <div className="icon">
              <AiFillHome />
            </div>
            <span>Home</span>
          </Link>
        </li>

        <li>
          <Link to="/admin/course" onClick={onClose}>
            <div className="icon">
              <FaBook />
            </div>
            <span>Courses</span>
          </Link>
        </li>

        {user && user.mainrole === "superadmin" && (
          <li>
            <Link to="/admin/users" onClick={onClose}>
              <div className="icon">
                <FaUserAlt />
              </div>
              <span>Users</span>
            </Link>
          </li>
        )}

        <li>
          <Link to="/account" onClick={onClose}>
            <div className="icon">
              <AiOutlineLogout />
            </div>
            <span>Account</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
