import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { postsModel } from "./models/posts.model.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port ${PORT}");
});

// GET/ POSTS
app.get("/posts", async (req, res) => {
  try {
    const posts = await postsModel.findAll();
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al obtener los posts" });
  }
});

// POST
app.post("/posts", async (req, res) => {
  const newPost = {
    titulo: req.body.titulo,
    img: req.body.url,
    descripcion: req.body.descripcion,
  };
  try {
    const post = await postsModel.create(newPost);
    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al crear el post" });
  }
});
