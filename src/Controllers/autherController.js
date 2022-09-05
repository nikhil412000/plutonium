const AuthorModel= require("../modules/authorModule.js")

const createAuthor= async function (req, res) {
    try{
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.status(201).send({status:true,data: authorCreated})
    }
    catch(error){
        res.status(500).send({status:false,msg:error.message})
    }
}

module.exports.createAuthor= createAuthor
