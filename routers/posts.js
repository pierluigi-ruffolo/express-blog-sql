import express from "express";
import postController from "../controllers/postController.js";
const router = express.Router();
/* INDEX */
router.get("/", postController.index);
/* SHOW */

/* DESTROY */

export default router;
