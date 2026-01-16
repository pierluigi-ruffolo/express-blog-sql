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
/* SHOW */
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
    }
    res.json({
      resalt: resalts[0],
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
};

export default controller;
