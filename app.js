import express from "express";
import routerPosts from "./routers/posts.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/posts", routerPosts);

app.listen(port, () => {
  console.log("Server avviato sulla porta " + port);
});
