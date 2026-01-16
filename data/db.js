import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "blog_db",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Connected to Mysql");
});

export default connection;
