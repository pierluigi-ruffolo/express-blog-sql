/* INDEX */
function index(req, res) {
  res.send("ciao");
}

/* OGGETTO CHE ESPORTIAMO CON LE OPERAZIONI CRUD */
const controller = {
  index,
};

export default controller;
