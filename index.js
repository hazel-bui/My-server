const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");  
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Welcome to Rebound Blog API");
  });

const DB_URI = "mongodb://localhost:27017/REBOUND"; 

// Kết nối MongoDB
mongoose.connect(DB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("MongoDB connected"));

// Mongoose Schema
const blogSchema = new mongoose.Schema({
    Blog_ID: { type: String, required: true, unique: true },
    Blog_Title: { type: String, required: true },
    Blog_Image: { type: String, required: true },  // Lưu URL ảnh
    Blog_Date: { type: Date, default: Date.now },
    Blog_shortDescription: { type: String, required: true },
    Blog_fullContent: { type: String, required: true },
    Blog_Category: { type: String, required: true },
  }, { timestamps: true });
  
  const Blog = mongoose.model('Blog', blogSchema, 'Blog');

  app.get("/blogs", async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (error) {
      console.error("❌ Error fetching blogs:", error);
      res.status(500).json({ message: 'Error fetching blogs', error: error.message });
    }
  });

// Chạy server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
