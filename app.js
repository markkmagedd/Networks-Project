const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const databaseUrl = "mongodb://localhost:27017";
const flash = require("connect-flash");
const MongoClient = require("mongodb").MongoClient;
let db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

(async () => {
  try {
    const client = await MongoClient.connect(databaseUrl);
    console.log("Connected to MongoDB!");
    db = client.db("myDB");
    console.log("Connected to database: myDB");
    app.listen(3000, () => {
      console.log("Connected to port 3000");
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
  }
})();
app.use(
  session({
    secret: "key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  next();
});

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect("/login");
}

app.get("/", (req, res) => {
  res.redirect("login");
});

app.get("/registration", (req, res) => {
  res.render("registration", { error: null });
});

app.post("/registration", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.render("registration", {
      error: "Username and Passwords are required",
    });
  }

  const existingUser = await db
    .collection("myCollection")
    .findOne({ username });
  if (existingUser) {
    return res.render("registration", {
      error: "User already exists Please try again",
    });
  }
  await db.collection("myCollection").insertOne({ username, password });
  req.flash("success", "User Registered Successfully");
  res.redirect("/login");
});

app.use(express.static("public"));

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await db.collection("myCollection").findOne({ username });
  const userPass = await db.collection("myCollection").findOne({ password });
  if (!user || !userPass) {
    return res.render("login", { error: "Invalid username or password." });
  }
  req.session.user = { username: user.username };
  res.redirect("/home");
});

app.get("/hiking", isAuthenticated, (req, res) => res.render("hiking"));
app.post("/inca-addition", async (req, res) => {
  const username = req.session.user.username;
  const destination = await db
    .collection("myCollection")
    .findOne({ user: username, destination: "inca" });
  if (destination) {
    return res.render("inca", {
      error: "inca is already in your Want-to-Go List.",
    });
  }
  await db
    .collection("myCollection")
    .insertOne({ user: username, destination: "inca" });
  return res.render("inca", {
    error: "inca has been added to your Want-to-Go List!",
  });
});
app.get("/cities", isAuthenticated, (req, res) => res.render("cities"));
app.get("/islands", isAuthenticated, (req, res) => res.render("islands"));
app.get("/annapurna", isAuthenticated, (req, res) => {
  res.render("annapurna", { error: null });
});
app.post("/annapurna-addition", async (req, res) => {
  const username = req.session.user.username;
  const destination = await db
    .collection("myCollection")
    .findOne({ user: username, destination: "annapurna" });
  if (destination) {
    return res.render("annapurna", {
      error: "annapurna is already in your Want-to-Go List.",
    });
  }
  await db
    .collection("myCollection")
    .insertOne({ user: username, destination: "annapurna" });
  return res.render("annapurna", {
    error: "annapurna has been added to your Want-to-Go List!",
  });
});
app.get("/bali", isAuthenticated, (req, res) => {
  res.render("bali", { error: null });
});
app.post("/bali-addition", async (req, res) => {
  const username = req.session.user.username;
  const destination = await db
    .collection("myCollection")
    .findOne({ user: username, destination: "bali" });
  if (destination) {
    return res.render("bali", {
      error: "bali is already in your Want-to-Go List.",
    });
  }
  await db
    .collection("myCollection")
    .insertOne({ user: username, destination: "bali" });
  return res.render("bali", {
    error: "bali has been added to your Want-to-Go List!",
  });
});
app.get("/inca", isAuthenticated, (req, res) => {
  res.render("inca", { error: null });
});
app.get("/paris", isAuthenticated, (req, res) => {
  res.render("paris", { error: null });
});
app.post("/paris-addition", async (req, res) => {
  const username = req.session.user.username;
  const destination = await db
    .collection("myCollection")
    .findOne({ user: username, destination: "paris" });
  if (destination) {
    return res.render("paris", {
      error: "paris is already in your Want-to-Go List.",
    });
  }
  await db
    .collection("myCollection")
    .insertOne({ user: username, destination: "paris" });
  return res.render("paris", {
    error: "paris has been added to your Want-to-Go List!",
  });
});
app.get("/rome", isAuthenticated, (req, res) => {
  res.render("rome", { error: null });
});
app.post("/rome-addition", async (req, res) => {
  const username = req.session.user.username;
  const destination = await db
    .collection("myCollection")
    .findOne({ user: username, destination: "rome" });
  if (destination) {
    return res.render("rome", {
      error: "rome is already in your Want-to-Go List.",
    });
  }
  await db
    .collection("myCollection")
    .insertOne({ user: username, destination: "rome" });
  return res.render("rome", {
    error: "rome has been added to your Want-to-Go List!",
  });
});
app.get("/santorini", isAuthenticated, (req, res) => {
  res.render("santorini", { error: null });
});
app.post("/santorini-addition", async (req, res) => {
  const username = req.session.user.username;
  const destination = await db
    .collection("myCollection")
    .findOne({ user: username, destination: "santorini" });
  if (destination) {
    return res.render("santorini", {
      error: "santorini is already in your Want-to-Go List.",
    });
  }
  await db
    .collection("myCollection")
    .insertOne({ user: username, destination: "santorini" });
  return res.render("santorini", {
    error: "santorini has been added to your Want-to-Go List!",
  });
});

app.get("/wanttogo", isAuthenticated, (req, res) => res.render("wanttogo"));

app.get("/list", isAuthenticated, async (req, res) => {
  const username = req.session.user.username;
  const destinations = await db
    .collection("myCollection")
    .find({ user: username })
    .toArray();
  res.render("wanttogo", { destinations });
});

app.get("/home", isAuthenticated, (req, res) => res.render("home"));
app.get("/searchresults", isAuthenticated, (req, res) =>
  res.render("searchresults")
);
app.post("/search", async (req, res) => {
  const { Search } = req.body;
  const destinations = [
    "inca",
    "paris",
    "annapurna",
    "bali",
    "rome",
    "santorini",
  ];
  const matches = destinations.filter((dest) =>
    dest.includes(Search.toLowerCase())
  );
  res.render("searchresults", { matches });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
