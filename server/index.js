require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const authCtrl = require("./controllers/authController");
const commentCtrl = require("./controllers/commentsController");
const trailCtrl = require("./controllers/trailController");
// const searchCtrl = require('./controllers/searchController')
const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const path = require("path");

const app = express();

app.use(express.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
    secret: SESSION_SECRET,
  })
);

app.post("/auth/login", authCtrl.login);
app.post("/auth/register", authCtrl.register);
app.delete("/auth/logout", authCtrl.logout);
app.get("/auth/user", authCtrl.getUser);

app.get("/api/comments", commentCtrl.getComments);
app.post("/api/comments", commentCtrl.addComment);
app.put("/api/comments/:comment_id", commentCtrl.editComment);
app.delete("/api/comments/:comment_id", commentCtrl.deleteComment);

app.get("/api/trails", trailCtrl.getTrails);
// app.get('/api/search', searchCtrl.getMinerals)

app.use(express.static(__dirname + "/../build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
}).then((dbInstance) => {
  app.set("db", dbInstance);
  console.log("db ready");
  app.listen(SERVER_PORT, () =>
    console.log(`Ready to collect on port ${SERVER_PORT}`)
  );
});
