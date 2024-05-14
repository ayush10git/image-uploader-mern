import { useState } from "react";
import { useUploadImageMutation } from "../../redux/api/imageAPI";
import toast from "react-hot-toast";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [upload] = useUploadImageMutation();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadHandler = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      await upload(formData);
      toast.success("You've made a post");
    } catch (error) {
      toast.error("Failed to post");
    }
  };

  return (
    <div>
      <div className="post" style={{ width: "950px" }}>
        <div className="post-inputs">
          <label>Add a Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="post-inputs">
          <label>Add a description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your Image"
          />
        </div>
        <div className="post-inputs">
          <label>Choose your image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="image-preview"
              style={{ width: "200px" }}
            />
          )}
        </div>
        <button onClick={uploadHandler}>Post</button>
      </div>
    </div>
  );
};

export default PostForm;
