const express = require("express");
const app = express();
const port = 3000;
const fetch = require("node-fetch");
const _ = require("lodash");
const blogstatsRoutes = require('./routes/blogStats')
const blogSearchRoutes = require('./routes/blogSearch')

app.get("/", (req, res) => {
  res.send("express JS is running");
});




app.use("/api", blogstatsRoutes)
app.use("/api", blogSearchRoutes)


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
