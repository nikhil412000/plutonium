const express = require('express');
const underscore = require('underscore')

const router = express.Router();

// -write an api which gives the missing number in an array of integers starting from 1….e.g [1,2,3,5,6,7] : 4 is missing
// Your route code will look like this
router.get("/sol1", function (req, res) {
    //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array
    let arr = [1, 2, 3, 5, 6, 7]

    
    let sumOfNumber = (arr[arr.length-1]*(arr[arr.length-1]+1))/2
    //let sum=0
    // for (let i = 0; i < arr.length; i++) {.
    
    //     sum += arr[i];
    // }
    sumOfArr = arr.reduce((a,b)=> a+b)
    let missingNumber = sumOfNumber - sumOfArr

    res.send({ data: missingNumber });
});



// -write an api which gives the missing number in an array of integers starting from anywhere….e.g [33, 34, 35, 37, 38]: 36 is missing
// Your route code will look like this
router.get("/sol2", function (req, res) {
 //logic : sum of n consecutive numbers is [ n * (first + last) / 2  ]..so get sum of all numbers in array. now take sum of n consecutive numbers.. n would be length+1 as 1 number is missing
        

 let arr= [33, 34, 35, 37, 38]
 let length= arr.length


 sumOfArr = arr.reduce((a,b)=> a+b)

 let first= arr[0]
 let last= arr.pop()
 let consecutiveSum= (length + 1) * (first+ last ) / 2
 let missingNumber= consecutiveSum - sumOfArr

 res.send(  { data: missingNumber  }  );

})

module.exports = router;
// adding this comment for no reason