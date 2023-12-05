const CalibrationValues = require('../data/december_01')

let currentNumArr = [], total = 0

let nums = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
}

let numsArr = Object.keys(nums), modified = false, numbers = 0

for (let i=0;i<CalibrationValues.length;i++) {

    let tempArr = CalibrationValues[i]

    while (tempArr.length > 0) {

        modified = false

        if (!isNaN(tempArr[0])) {
            currentNumArr.push(tempArr[0])
            tempArr = tempArr.slice(1)
            continue
        }
        
        for (let j=0;j<numsArr.length;j++) {
            if (tempArr.indexOf(numsArr[j]) === 0) {
                currentNumArr.push(nums[numsArr[j]])
                if (numsArr[j] == 'one' || numsArr[j] == 'two' || numsArr[j] == 'three' || numsArr[j] == 'five' || numsArr[j] =='eight' || numsArr[j] == 'nine') {
                    tempArr = tempArr.slice(numsArr[j].length-1)
                } else {
                    tempArr = tempArr.slice(numsArr[j].length)
                }
                modified = true
            }
            if (modified) {
                j = numsArr.length
            }
        }

        if (!modified) {
            tempArr = tempArr.slice(1)
        }

    }


    if (currentNumArr.length>1) {
        total = total + Number(`${currentNumArr[0]}${currentNumArr[currentNumArr.length-1]}`)
    } else {
        total = total + Number(`${currentNumArr[0]}${currentNumArr[0]}`)
    }

    currentNumArr=[]
    
}

console.log(total)