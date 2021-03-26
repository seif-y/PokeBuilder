const path = require("path");
const express = require("express");
const app = express();
const port = 3001;

if (process.env.NODE_ENV == "production") {
  console.log("Running in production environment");

  app.use(express.static(path.join(__dirname, "../../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Listening at *:${port}`);
});
