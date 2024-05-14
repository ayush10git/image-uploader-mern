import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./app.scss";
import Feed from "./pages/feed/Feed";
import LandingPage from "./pages/landing/LandingPage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MyPosts from "./pages/myPosts/MyPosts";

function App() {
  const { user, loading } = useSelector(
    (state) => state.userReducer
  );
  return (
    <Router>
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={!user ? <Login /> : <Feed/>} path="/login" />
        <Route element={<Feed />} path="/feed" />
        <Route element={<MyPosts />} path="/my-posts" />
      </Routes>
      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;
