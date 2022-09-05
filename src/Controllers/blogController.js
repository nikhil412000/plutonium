const bolgModel = require("../models/blogModel")

const createBlogs = async function(req,res){
   try {
    let blogs = req.body
    let createdBlogs = await bolgModel.create(blogs)
    res.status(201).send({data: createdBlogs})
   } catch (error) {
    res.status(500).send({ msg: "Error", error: error.message })
   }
}

module.exports.createBlogs = createBlogs