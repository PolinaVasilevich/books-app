const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRouter = require("./routers/bookRouter");
const authRouter = require("./routers/authRouter");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/books", bookRouter);
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:admin@cluster0.sjcnx.mongodb.net/books-app?retryWrites=true&w=majority`
    );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
    console.log(1);
  }
};

start();
