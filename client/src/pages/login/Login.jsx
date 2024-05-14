import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser, useLoginMutation } from "../../redux/api/userAPI";
import { userExist } from "../../redux/reducer/userReducer";
import "../register/register.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      if (data) {
        const { accessToken, refreshToken } = data.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        // dispatch(userExist(data.data.user));

        const user = await getUser(accessToken);
        dispatch(userExist(user));

        navigate("/feed");
        toast.success("Login Successful");
      } else {
        toast.error(data.data.message);
      }
    } catch (error) {
      toast.error("Login Failed");
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
        <h1>Login Here</h1>
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
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>{" "}
          </span>
        </div>
      </main>
    </section>
  );
};

export default Login;
