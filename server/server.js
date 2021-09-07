const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRouter = require("./routers/bookRouter");
const authRouter = require("./routers/authRouter");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/books", bookRouter);
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:admin@cluster0.sjcnx.mongodb.net/books-app?retryWrites=true&w=majority`,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        connectTimeoutMS: 10000,
        poolSize: 10,
        writeConcern: {
          j: true,
        },
      }
    );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
