const jwt = require("jsonwebtoken");
const validator = require('validator')
const AuthorModel = require("../modeles/authorModele.js")
const blogModel = require("../Controllers/blogController")

const createAuthor = async function (req, res) {
    try {
        let author = req.body
        let Email = req.body.email
        if(!validator.isEmail(Email)) return res.status(400).send({status:false,msg:" please Enter valid EmailId"})
        let authorCreated = await AuthorModel.create(author)
        res.status(201).send({ status: true, data: authorCreated })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const loginAuther = async function (req, res) {
    try {
        let autherdetail = req.body
        if (Object.keys(autherdetail).length != 0) {
            let Auther = await AuthorModel.findOne({ email: autherdetail.email, password: autherdetail.password });
            if (Auther) {
                let token = jwt.sign(
                    {
                        AutherId: Auther._id.toString(),
                        batch: "plutonium",
                        organisation: "FunctionUp",
                    },
                    "Project-1-blogging-groupe-50"
                );
                res.setHeader("x-api-key", token);
                res.status(201).send({ status: true, token: token });
            } else {
                return res.status(403).send({
                    status: false,
                    msg: "Email or password is not corerct",
                });
            }
        } else {
            res.status(400).send({ msg: "BAD REQUEST" })
        }
    } catch (error) {
        res.status(500).send({ msg: "Error", error: error.message })
    }
}


module.exports.createAuthor = createAuthor
module.exports.loginAuther = loginAuther
