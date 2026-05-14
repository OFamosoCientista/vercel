const express = require("express");
const cors = require("cors");
const sql = require("mssql"); // 👈 AQUI

const app = express();

app.use(cors());
app.use(express.json());

const config = {
  user: "seu_usuario",
  password: "sua_senha",
  server: "localhost",
  database: "sistema",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

sql.connect(config)
  .then(() => console.log("Conectado ao SQL Server"))
  .catch(err => console.log(err));