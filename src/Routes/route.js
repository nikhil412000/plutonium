const express = require('express');
const router = express.Router();
const blogcontroller = require("../Controllers/blogController")

router.post("/blogs",blogcontroller.createBlogs)

module.exports = router;