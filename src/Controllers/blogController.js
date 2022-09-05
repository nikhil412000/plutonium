const blogModel = require("../modules/blogModel")
const autherModel = require("../modules/authorModule")

const createBlogs = async function (req, res) {
    try {
        let blogs = req.body
        let authId = req.body.authorId
        let checkId = await autherModel.findById(authId)
        if (checkId) {
            let createdBlogs = await blogModel.create(blogs)
            res.status(201).send({ data: createdBlogs })
        } else {
            res.status(401).send({ status: true, msg: " Auther is not valid" })
        }

    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
}

const getBologs = async function (req, res) {
    try {
        let authId = req.query.authorId
        if (!authId) res.status(400).send({ status: false, msg: "user id requred" })
        let checkId = await autherModel.findById(authId)
        if (checkId) {
            let getBolog = await blogModel.find({ authorId: authId, isDeleted: false, isPublished: true })
            if (getBolog) {
                res.status(200).send({ status: true, data: getBolog })
            } else {
                res.status(404).send({ status: false, msg: "Data Not Found" })
            }

        } else {
            res.status(401).send({ status: true, msg: " Auther is not valid" })
        }
        let getBolog = await blogModel.find({ authorId: authId, isDeleted: false, isPublished: true })
        if (getBolog) {
            res.status(200).send({ status: true, data: getBolog })
        } else {
            res.status(404).send({ status: false, msg: "Data Not Found" })
        }

    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
}

module.exports.createBlogs = createBlogs
module.exports.getBologs = getBologs