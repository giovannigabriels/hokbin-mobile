if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { mongoConnect } = require("./config");
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 4001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

app.use(errorHandler);

mongoConnect().then((db) => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
