import { Router } from "express";
import {
  deleteImage,
  getAllImages,
  getMyImages,
  uploadImage,
  viewCounter,
} from "../controller/image.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/upload").post(
  verifyJWT,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  uploadImage
);

router.route("/get-all").get(getAllImages);
router.route("/get").get(verifyJWT, getMyImages);
router.route("/view/:id").post(viewCounter);
router.route("/delete/:id").delete(verifyJWT, deleteImage);

export default router;
