import React from "react";
import "../../app.scss";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing">
      <div className="content">
        <span>
          Welcome to our gallery! Every click tells a story. Explore captivating
          images from our vibrant community, where creativity knows no bounds.
          Start your journey now and discover the beauty within each frame.
        </span>
        <div className="buttons">
          <Link to="/register">
            <button className="register">Register</button>
          </Link>
          <Link to="/login">
            <button className="login">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
