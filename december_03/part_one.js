//Import Engine Schematics as 2D Array of strings
const EngineSchematics = require('./engine_schematics.js')

let sum = 0

//Callback for checking around each number found
const checkIfCharacter = (numberAsString, positionInRow, untilPositionInRow, row) => {
    for (let i=positionInRow;i<untilPositionInRow;i++) {

        //Check top value if not on row 1
        let top = false
        if (row>0) {
            top = EngineSchematics[row-1][i] !== '.'
        }

        //Check bottom value if not on last row
        let bottom = false
        if (row<EngineSchematics.length-1) {
            bottom = EngineSchematics[row+1][i] !== '.'
        }

        //Check left side values if left most position in number and top and bottom respectively
        let left = false
        let topLeft = false
        let bottomLeft = false
        if (i === positionInRow && i > 0) {
            left = EngineSchematics[row][i-1] !== '.'
            if (row>0) {
                topLeft = EngineSchematics[row-1][i-1] !== '.'
            }
            if (row < EngineSchematics.length-1) {
                bottomLeft = EngineSchematics[row+1][i-1] !== '.'
            }
        }

        let right = false

        //Check right side values if right most position in number and top and bottom respectively
        
        let topRight = false
        let bottomRight = false
        if (i === untilPositionInRow-1 && untilPositionInRow<EngineSchematics[row].length) {
            right = EngineSchematics[row][untilPositionInRow] !== '.'
            if (row>0) {
                topRight = EngineSchematics[row-1][untilPositionInRow] !== '.'
            }
            if (row < EngineSchematics.length-1) {
                bottomRight = EngineSchematics[row+1][untilPositionInRow] !== '.'
            }
        }

        //If character was found around position in number one will be true, add the number, and dip out so it doesn't double add
        if ( top || bottom || left || right || bottomLeft || topLeft || topRight || bottomRight) {
            sum = sum + Number(numberAsString)
            break
        }
    }
}

//Iterate through 2D part number array
for (let i=0;i<EngineSchematics.length;i++) {

    let wasNum = false
    let num = ''

    //Iterate through row (string)
    for (let j=0;j<EngineSchematics[i].length;j++) {
        //If the current value is a number, add it to number value and designate we are currently iterating over a number
        if (!isNaN(Number(EngineSchematics[i][j]))) {
            num = `${num}${EngineSchematics[i][j]}`
            if (j === EngineSchematics[i].length - 1) {
                checkIfCharacter(num, (j+1)-num.length, j+1, i)
            } else {
                wasNum=true
            }
        
        //If we are no longer iterating over a number hit the callback to check if we should add the number to the sum
        } else if (wasNum) {
            checkIfCharacter(num, j-num.length, j, i)
            wasNum=false
            num=''
        }
    }

}

console.log(sum)