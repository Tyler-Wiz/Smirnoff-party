const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const { errorHandler } = require("./utils/errorHandler");
const PORT = process.env.PORT;

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Auth = require("./routes/auth");
const Users = require("./routes/users");
app.use("/auth", Auth);
app.use("/users", Users);

// Error handling middleware –
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

app.get("/", (req, res, next) => {
  res.send("welcome to the API ");
});
