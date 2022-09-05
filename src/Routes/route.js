const express = require('express');
const router = express.Router();
const blogcontroller = require("../Controllers/blogController")
const autherController = require("../Controllers/autherController")

router.post("/authors",autherController.createAuthor)

router.post("/blogs",blogcontroller.createBlogs)

router.get("/blogs",blogcontroller.getBologs)

module.exports = router;