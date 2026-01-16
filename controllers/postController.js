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

/* OGGETTO CHE ESPORTIAMO CON LE OPERAZIONI CRUD */
const controller = {
  index,
};

export default controller;
