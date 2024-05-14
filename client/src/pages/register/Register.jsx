import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/userAPI";
import "./register.scss";

const Register = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Password Mismatch");
        throw new Error("Password Mismatch");
      }
      const res = await registerUser(formData);
      console.log(res.data);
      if ("data" in res) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { status, data } = error.response;
        if (status === 400) {
          toast.error(data.error || "Bad Request");
        } else if (status === 409) {
          toast.error(data.error || "User already exists");
        } else if (status === 500) {
          toast.error(data.error || "Internal Server Error");
        } else {
          toast.error("An unexpected error occurred");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <section>
      <main className="tagline">
        <h2>
          <p>Join the Gallery: </p> <p>Where Every Click Tells a Story</p>
        </h2>
      </main>
      <main className="input">
        <h1>Register Yourself</h1>
        <div className="input-field">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Register</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>{" "}
          </span>
        </div>
      </main>
    </section>
  );
};

export default Register;
