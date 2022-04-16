const functions = require("./functions");
const express = require("express");
const app = express();
const router = express.Router();
const path = __dirname;

app.set("view engine", "ejs");
app.set("views", path);
app.use("/", router);

router.get("/api/simplify", async function (req, res) {
  const sentence = req.query.sentence;
  const simplifiedSentence = await functions.substitute(sentence);
  res.send(simplifiedSentence);
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));
