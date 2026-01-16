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

  const sql = "SELECT * FROM posts WHERE id = ?";
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
};

export default controller;
