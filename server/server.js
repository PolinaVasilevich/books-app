const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const bookRouter = require("./routers/bookRouter");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/books", bookRouter);

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

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
