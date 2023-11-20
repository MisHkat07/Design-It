const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
dotenv.config();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "./client/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, './', 'client', 'dist', 'index.html'))
    })
}

const dbConnect = async () => {
  try {
    if (process.env.NODE_ENV === "local") {
      await mongoose.connect(process.env.LOCAL_DB_URI);
      console.log("🎯 Local DB Connected");
    } else {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("🎯 Production DB Connected");
    }
  } catch (error) {
    console.log("DB Failed :", error);
  }
};
dbConnect();

if (process.env.NODE_ENV === "local") {
  app.use(
    cors({
      origin: "http://localhost:5173/",
      credentials: true,
    })
  );
} else {
  app.use(
    cors({
      credentials: true,
    })
  );
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
