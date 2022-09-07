const jwt = require("jsonwebtoken");
const blogModel = require("../modeles/blogModel");
const tokenverify = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (token) {
            let decodedToken = jwt.verify(token, "Project-1-blogging-groupe-50")
            let auther = decodedToken.AutherId
            req.AutherId = auther
            next();
        } else {
            return res.status(400).send({ status: false, msg: "token must be present" });
        }
    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }

};

const auth = async function (req, res, next) {
    try {
        let tokenAutherId = req.AutherId
        let blogid = req.params.blogId
        let findauther = await blogModel.findById(blogid).select({ authorId: 1, _id: 0 })
        let Auther = findauther.authorId
        if (tokenAutherId == Auther) {
            req.AutherId = AutherId     //Set an attribute in request object 
            next();
        } else {
            return res.status(403).send({ status: false, msg: "Sorry You are not authorised" })
        }
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
}

module.exports.tokenverify = tokenverify
module.exports.auth = auth