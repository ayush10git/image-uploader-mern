import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import PostCard from "../../components/post card/PostCard";
import PostForm from "../../components/postForm/PostForm";
import { getAllImages } from "../../redux/api/imageAPI";
import "./feed.scss";

const Feed = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageData = await getAllImages();
        // console.log(imageData.data)
        setImages(imageData.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchImages();
  }, [images]);

  return (
    <>
      <Navbar />
      <div className="feed">
        <h2>Make a post</h2>
        <PostForm />
        <h2>See what others have posted</h2>
        <div className="show-posts">
          {images.map((image) => (
            <PostCard key={image._id} images={image} showDelete={false} username={image.owner.username}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default Feed;
