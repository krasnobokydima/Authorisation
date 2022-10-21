const express = require("express");

const app = express();

app.use(express.static(__dirname + "/dist/authorisation"));

app.get("/*", (_req, res) => {
  res.sendFile(__dirname + "/dist/authorisation/index.html");
});

app.listen(process.env.PORT || 4020);

app.listen(() => console.log('server work'))
