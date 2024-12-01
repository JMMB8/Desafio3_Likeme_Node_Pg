import { Pool } from "../database/conection.js";

const findAll = async () => {
  const { rows } = await Pool.query("SELECT * FROM posts");
  return rows;
};

const create = async (post) => {
  const query =
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3,$4)RETURNING *";

  const { rows } = await Pool.query(query,[post.titulo, post.img, post.descripcion, post.likes]);
  return rows[0];
};

export const postsModel = { findAll, create };
