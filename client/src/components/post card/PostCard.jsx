import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  useDeleteImageMutation,
  useViewImageMutation,
} from "../../redux/api/imageAPI";
import { getUserIdFromToken } from "../../utils";
import "./postcard.scss";

const PostCard = ({ images, showDelete, username }) => {
  const {
    _id: imageId,
    image,
    title,
    description,
    views,
    createdAt,
    owner,
  } = images;
  const [deleteImage] = useDeleteImageMutation();
  const [viewImage] = useViewImageMutation();

  const deleteHandler = async () => {
    try {
      await deleteImage(imageId);
      toast.success("Post deleted");
    } catch (error) {
      toast.error("Error deleting the post");
    }
  };

  const increaseViewCount = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = getUserIdFromToken(accessToken);
    if (userId !== owner) {
      try {
        await viewImage(imageId);
        console.log("View count incremented successfully");
      } catch (error) {
        console.error("Failed to increment view count:", error.message);
      }
    }
  };

  useEffect(() => {
    increaseViewCount();
  }, []);

  return (
    <>
      <div className="container">
        {showDelete && (
          <button onClick={deleteHandler}>
            <MdDelete className="delete-icon" />
          </button>
        )}
        <div className="image-container">
          <img src={image} alt={title} />
        </div>
        <div className="details">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span>
          ~by{" "}<span className="username">{username}</span>
        </span>

        <div className="footer">
          <span>{new Date(createdAt).toLocaleDateString()}</span>
          <span>
            <FaEye />{" "}
            {views}
          </span>
        </div>
      </div>
    </>
  );
};

export default PostCard;
