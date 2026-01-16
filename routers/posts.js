import express from "express";
import postController from "../controllers/postController.js";
const router = express.Router();
/* INDEX */
router.get("/", postController.index);
/* SHOW */
router.get("/:id", postController.show);
/* DESTROY */
router.delete("/:id", postController.destroy);

export default router;
