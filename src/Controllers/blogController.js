const blogModel = require("../modeles/blogModel")
const autherModel = require("../modeles/authorModele")
var mongoose = require('mongoose');


const createBlogs = async function (req, res) {
    try {
        let blogs = req.body
        let authId = req.body.authorId
        let checkAuther = await autherModel.findById(authId)
        if (checkAuther) {
            let createdBlogs = await blogModel.create(blogs)
            res.status(201).send({ status: true, data: createdBlogs })
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
        let category = req.query.category
        let tags = req.query.tags
        let subcategory = req.query.subcategory

        let getBolog = await blogModel.find(
            {
                $or: [{ authorId: authId },
                { category: category },
                { tags: { $in: [tags] } },
                { subcategory: { $in: [subcategory] } }], isDeleted: false, isPublished: true,
            })
        if (getBolog.length != 0) {
            res.status(200).send({ status: true, data: getBolog })
        } else {
            res.status(404).send({ status: false, msg: "Blogs Not Found" })
        }
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
}
const updateBlogs = async function (req, res) {
    try {
        let data = req.body
        if (!Object.keys(data).length != 0) return res.status(400).send({ status: false, msg: "Please Give Any Data in Body" })
        let blogId = req.params.blogId
        if(!mongoose.Types.ObjectId.isValid('blogId')) return res.status(400).send({status:false, msg:"ObjectId Not valid"})
        let title = req.body.title
        let body = req.body.body
        let tags = req.body.tags
        let subcategory = req.body.subcategory
        let isPublished = req.body.isPublished
        if (blogId) {
            let check1 = await blogModel.findOne({ _id: blogId, isDeleted: false })
            if (check1) {
                let updateBlogs = await blogModel.findByIdAndUpdate(
                    blogId,
                    {
                        $set: { body: body, title: title, isPublished: isPublished, },
                        $push: { tags: tags, subcategory: subcategory }
                    })
                return res.status(200).send({ status: true, data: updateBlogs })
            } else {
                return res.status(404).send({ status: false, msg: "Data Not found" })
            }
        } else {
            res.status(400).send({ status: false, msg: "Give Blog Id in Path params" })
        }
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }

}

const deleteblog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        if (blogId) {
            let check1 = await blogModel.find({ _id: blogId, isDeleted: false })
            if (check1) {
                let deletedblog = await blogModel.updateMany({ check1 }, { $set: { isDeleted: true, deletedAt: new Date } })
                res.status(200).send()
            } else {
                res.status(404).send({ status: false, msg: "Blog Not found" })
            }
        } else {
            res.status(400).send({ status: false, msg: "please give BlogId in path params" })
        }
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
}

const deletebolgbyquery = async function (req, res) {
    try {
        let data = req.query
        if (!Object.keys(data).length != 0) return res.status(400).send({ status: false, msg: "Please Give Any Filter" })
        let AutherId = req.query.AutherId
        let category = req.query.category
        let tags = req.query.tags
        let subcategory = req.query.subcategory
        let isPublished = req.query.unpublished
        let findData = await blogModel.find(
            {
                $or: [{ authorId: AutherId },
                { category: category },
                { tags: { $in: [tags] } },
                { subcategory: { $in: [subcategory] } }, { isPublished: isPublished }]
            }
        )
        if (findData.length != 0) {
            let deleteblog = await blogModel.updateMany({ findData }, { $set: { isDeleted: true } })
            res.status(200).send()
        } else {
            res.status(404).send({ status: false, msg: "Blog not found" })
        }
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }


}
module.exports.createBlogs = createBlogs
module.exports.getBologs = getBologs
module.exports.updateBlogs = updateBlogs
module.exports.deleteblog = deleteblog
module.exports.deletebolgbyquery = deletebolgbyquery