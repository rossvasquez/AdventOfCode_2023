const CalibrationValues = require('./my_calibration_document')

let currentNumArr = [], total = 0

for (let i=0;i<CalibrationValues.length;i++) {

    for (let j=0;j<CalibrationValues[i].length;j++) {
        if (!isNaN(CalibrationValues[i][j])) {
            currentNumArr.push(CalibrationValues[i][j])
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