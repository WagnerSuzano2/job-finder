const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const path = require("path");
const db = require("./db/connection");
const bodyParser = require("body-parser");

const PORT = 3000;

app.listen(PORT, function () {
  console.log(`O Express está rodando na porta ${PORT}`);
});

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//handle bars
app.set("view", path.join(__dirname, "views"));

//db connection
db.authenticate()
  .then(() => {
    console.log("Conectou ao Banco com sucesso");
  })
  .catch((err) => {
    console.log("Ocorreu um erro ao conectar com banco", err);
  });

//routes
app.get("/", (req, res) => {
  res.send("Está funcionado ");
});

//jobs routes
app.use("/jobs", require("./routes/jobs.js"));
