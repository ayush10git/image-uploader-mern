import { useEffect, useState } from "react";
import { getMyImages } from "../../redux/api/imageAPI";
import PostCard from "../../components/post card/PostCard";
import "./myPosts.scss";
import Navbar from "../../components/navbar/Navbar";
import { FadeLoader } from "react-spinners";

const MyPosts = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const accessToken = localStorage.getItem("accessToken");
      try {
        const imageData = await getMyImages(accessToken);
        // console.log(imageData.data)
        setImages(imageData.data);
        setLoading(false);
      } catch (error) {
        setErr(error.message);
        setLoading(false);
      }
    };

    fetchImages();
  }, [images]);

  return (
    <>
      <Navbar />
      {loading ? (
        <FadeLoader color="#786bb4"/>
      ) : (
        <div
          className="posts"
          style={images.length == 0 ? { height: "calc(100vh - 70px)" } : {height: "100%"}}
        >
          <h1>
            {images.length != 0 ? "Your Posts" : "You Haven't Posted Yet!"}
          </h1>
          <div className="my-posts">
            {images.map((image) => (
              <PostCard key={image._id} images={image} showDelete={true} username={image.owner.username} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyPosts;
