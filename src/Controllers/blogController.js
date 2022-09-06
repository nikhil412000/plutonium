const blogModel = require("../modules/blogModel")
const autherModel = require("../modules/authorModule")

const createBlogs = async function (req, res) {
    try {
        let blogs = req.body
        let authId = req.body.authorId
        let checkId = await autherModel.findById(authId)
        if (checkId) {
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

    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
}
const updateBlogs = async function (req, res) {
    try {
        let data = req.body
        if (!data) res.status(400).send({ status: false, msg: "Data is Missing" })
        let blogId = req.params.blogId
        if (blogId) {
            let check1 = await blogModel.findOne({ _id: blogId, isDeleted: false })
            if (check1) {
                let update = await blogModel.findByIdAndUpdate(blogId, data, { new: true })
                let update1 = await blogModel.findByIdAndUpdate(blogId, { $set: { publishedAt: new Date, isPublished: true } }, { new: true })
                res.status(200).send({ status: true, data: update1 })
            } else {
                res.status(404).send({ status: false, msg: "Data Not found" })
            }
        } else {
            res.status(400).send({ status: false, msg: "Data is Missing" })
        }
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
    // {{publishedAt:{$set:{date }    }   }    }
}

const deleteblog = async function (req, res) {
    try {
        let blogId = req.params.blogId
        if (blogId) {
            let check1 = await blogModel.findOne({ _id: blogId, isDeleted: false })
            if (check1) {
                let deletedblog = await blogModel.findByIdAndUpdate(blogId, { $set: { isDeleted: true, deletedAt: new Date } })
                res.status(200).send()
            } else {
                res.status(404).send({ status: false, msg: "Data Not found" })
            }
        } else {
            res.status(400).send({ status: false, msg: "Data is Missing" })
        }
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
}

const deletebolgbyquery = async function (req, res) {
    try {
        let AutherId = req.query.AutherId
        if (!AutherId) res.status(400).send({ status: false, msg: "Data is Missing" })
        let check1 = await autherModel.findById(AutherId)
        if (check1) {
            let deleteblog = await blogModel.deleteMany({ authorId: AutherId })
            res.status(200).send()
        } else {
            res.status(404).send({ status: false, msg: "Data Not found" })
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