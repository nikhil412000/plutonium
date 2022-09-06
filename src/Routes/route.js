const express = require('express');
const router = express.Router();
const blogcontroller = require("../Controllers/blogController")
const autherController = require("../Controllers/autherController")

router.post("/authors",autherController.createAuthor)

router.post("/blogs",blogcontroller.createBlogs)

router.get("/blogs",blogcontroller.getBologs)

router.put("/blogs/:blogId",blogcontroller.updateBlogs)

router.delete("/blogs/:blogId",blogcontroller.deleteblog)

router.delete("/blogs", blogcontroller.deletebolgbyquery)

module.exports = router;