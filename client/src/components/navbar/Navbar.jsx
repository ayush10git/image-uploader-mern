import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import "./navbar.scss";
import { useLogoutMutation } from "../../redux/api/userAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userNotExist } from "../../redux/reducer/userReducer";

const Navbar = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      await logout(accessToken);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      dispatch(userNotExist());
      toast.success("Logged Out Successfully");
      navigate("/login");
    } catch (error) {
      toast.error("error loggin out");
    }
  };
  return (
    <nav>
      <div className="logo">
        <Link to="/feed">Logo</Link>
      </div>
      <div className="links">
        <Link to="/my-posts">My Posts</Link>
        <button onClick={handleLogout}>
          <IoIosLogOut />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
