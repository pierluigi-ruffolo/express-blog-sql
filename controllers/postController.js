import connection from "../data/db.js";

/* INDEX */
function index(req, res) {
  const sql = "SELECT * FROM posts";
  connection.query(sql, (error, resalts) => {
    if (error) {
      return res.status(500).json({
        message: "server error 500",
      });
    }
    res.json({
      resalt: resalts,
    });
  });
}
/* show */
function show(req, res) {
  const id = req.params.id;
  const sql =
    "SELECT  posts.*, tags.id AS `tags_id`, tags.label  FROM posts INNER JOIN post_tag ON post_tag.post_id = posts.id INNER JOIN tags ON tags.id = post_tag.tag_id where posts.id = ?";

  connection.query(sql, [id], (error, resalts) => {
    if (error) {
      return res.status(500).json({
        message: "server error 500",
      });
    }
    if (resalts.length === 0) {
      return res.status(404).json({
        message: "Risorsa non trovata",
      });
    }
    console.log(resalts);
    const mapLabel = resalts.map((obj) => {
      return { id: obj.tags_id, label: obj.label };
    });

    const resalt = {
      id: resalts[0].id,
      title: resalts[0].title,
      content: resalts[0].content,
      tags: mapLabel,
    };

    res.json(resalt);
  });
  /* const sql = "SELECT * FROM posts WHERE id = ?";
  connection.query(sql, [id], (error, resalts) => {
    if (error) {
      return res.status(500).json({
        message: "server error 500",
      });
    }
    if (resalts.length === 0) {
      return res.status(404).json({
        message: "Risorsa non trovata",
      });
    } else {
      const sqlTags =
        "SELECT tags.label, tags.id FROM  tags INNER JOIN post_tag ON tags.id = post_tag.tag_id where post_tag.post_id = ?";
      connection.query(sqlTags, [id], (error, resaltTags) => {
        if (error) {
          return res.status(500).json({
            message: "server error 500",
          });
        }
        const post = {
          ...resalts[0],
          tags: resaltTags,
        };

        res.json(post);
      });
    }
  }); */
}

/* STORE */

function store(req, res) {
  const { title, content, image } = req.body;

  const sql = "INSERT INTO posts (title, content, image) VALUES(?,?,?)";
  connection.query(sql, [title, content, image], (error, resalt) => {
    if (error) {
      return res.status(500).json({
        error: "error Server 500",
      });
    }
    res.status(201).json({
      posts: "Posts Creato con successo",
    });
  });
}

/* DESTROY */
function destroy(req, res) {
  const id = req.params.id;
  const sql = "DELETE FROM `posts` WHERE `id` = ?";
  connection.query(sql, [id], (error) => {
    if (error) {
      return res.status(500).json({
        message: "server error 500",
      });
    }
    res.sendStatus(204);
  });
}

/* OGGETTO CHE ESPORTIAMO CON LE OPERAZIONI CRUD */
const controller = {
  index,
  destroy,
  show,
  store,
};

export default controller;
