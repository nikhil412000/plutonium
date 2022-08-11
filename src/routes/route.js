const express = require('express');
const { object } = require('underscore');
const underscore = require('underscore')

const router = express.Router();

let players =
    [
        {
            "name": "manish",
            "dob": "1/1/1995",
            "gender": "male",
            "city": "jalandhar",
            "sports": [
                "swimming"
            ]
        },
        {
            "name": "gopal",
            "dob": "1/09/1995",
            "gender": "male",
            "city": "delhi",
            "sports": [
                "soccer"
            ],
        },
        {
            "name": "lokesh",
            "dob": "1/1/1990",
            "gender": "male",
            "city": "mumbai",
            "sports": [
                "soccer"
            ],
        },
    ]
router.post('/players', function (req, res) {

    //LOGIC WILL COME HERE
    let addPlayer = req.body
    let flag = 0;
    for (let i = 0; i < players.length; i++) {
        if (addPlayer.name == players[i].name) {
            flag = 1
            res.send("person already exists")
        }
    }
    if (flag === 0) {
        players.push(addPlayer)
    }
    res.send({ data: players, status: true })
})


// router.post('/test-post',function(req , res){
//     let arr = [12, "functionup"]
//     let ele = req.body.element
//     arr.push(ele)

//     res.send({ msg: arr, status : true})
// })




module.exports = router;
