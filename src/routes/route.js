const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    logger.welcome()

    res.send('My second ever api!')
});

router.get('/students', function (req, res){
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})

router.get('/student-details/:name', function(req, res){
    /*
    params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object where key is the variable defined in code 
    and value is what is sent in the request
    */

    let requestParams = req.params

    // JSON strigify function helps to print an entire object
    // We can use any ways to print an object in Javascript, JSON stringify is one of them
    console.log("This is the request "+ JSON.stringify(requestParams))
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    
    res.send('Dummy response')
})
router.get('/movies', function (req, res) {
    let movies = ['The Gray Guy', 'RRR', 'The Black Phone', 'Bullet Train', 'Thor:Love and Thunder']
    res.send(movies)
})
router.get('/movies/:indexNumber', function (req, res) {

    let movies = ['3 idiots', 'pk', 'Raone', 'housefull', '']
    if (req.params.indexNumber < movies.length) {
        res.send(movies[req.params.indexNumber])
    }
    else {
        res.send("You have not entered Right indexnumber")

    }

})

router.get('/films',function(req,res){

let films=[ {'id': 1,'name': 'The Gray Guy'}, {'id': 2,'name': 'RRR'}, {'id': 3,'name': 'Bullet Train'}, {'id': 4,'name': 'Thor:Love and Thunder'}]
res.send(films)

})
router.get('/films/:filmId',function(req,res){
    
    let films=[ {'id': 1,'name': 'The Gray Guy'}, {'id': 2,'name': 'RRR'}, {'id': 3,'name': 'Bullet Train'}, {'id': 4,'name': 'Thor:Love and Thunder'}]
    let filmId = req.params.filmId
    for(let i = 0; i < films.length; i++){
        let movie = films[i]
        if(movie.id == filmId) {
            return res.send(movie)
        }
    }
    res.send("The number you have given is not any movie")
})
module.exports = router;
