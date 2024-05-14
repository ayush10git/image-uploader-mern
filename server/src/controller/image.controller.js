import { Image } from "../models/image.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { myCache } from "../app.js";

const uploadImage = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    throw new ApiError(400, "Give a title to your Image");
  }
  if (!description) {
    throw new ApiError(400, "Add a description to your Image");
  }

  const imageLocalPath = req.files?.image[0]?.path;

  if (!imageLocalPath) throw new ApiError(400, "Image is required");

  const image = await uploadOnCloudinary(imageLocalPath);

  const uploadedImage = await Image.create({
    title,
    description,
    image: image.url,
    views: 0,
    owner: req.user,
  });

  if (!uploadedImage)
    throw new ApiError(500, "Something went wrong while uploading the image");

  const uploadedImageData = await Image.findById(uploadedImage._id);

  return res
    .status(201)
    .json(
      new ApiResponse(200, uploadedImageData, "Image uploaded successfully")
    );
});

const getAllImages = asyncHandler(async (req, res) => {
  const images = await Image.find({})
    .populate("owner", "_id username")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, images, "Images fetched successfully"));
});

const viewCounter = asyncHandler(async (req, res) => {
  const imageId = req.params.id;

  if (!imageId) throw new ApiError(400, "Enter a valid id");

  const image = await Image.findById(imageId);

  if (!image) throw new ApiError(404, "Image not found");

  image.views += 1;
  await image.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "View Count updated successfully"));
});

const deleteImage = asyncHandler(async (req, res) => {
  const imageId = req.params.id;
  const userId = req.user._id;

  if (!imageId) throw new ApiError(400, "Enter a valid id");

  const image = await Image.findById(imageId);

  if (!image) {
    throw new ApiError(404, "Image not found");
  }

  if (image.owner.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this image");
  }

  await Image.findByIdAndDelete(imageId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Image deleted successfully"));
});

const getMyImages = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) throw new ApiError(404, "user not found");

  const images = await Image.find({ owner: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, images, "Your Images fetched successfully"));
});

export { deleteImage, getAllImages, getMyImages, uploadImage, viewCounter };
