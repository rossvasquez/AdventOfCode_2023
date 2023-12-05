const EngineSchematics = require('../data/december_03')

let sum = 0

const checkForRatio = (row, positionInRow) => {
    let numbers = []
    let numbersPos = 0

    const moveRight = (checkRow, startPosition, dex) => {
        let toTheRight = true
        let rightIndex = dex
        while (toTheRight) {
            if (!isNaN(EngineSchematics[checkRow][startPosition+rightIndex])) {
                numbers[numbersPos] = `${numbers[numbersPos]}${EngineSchematics[checkRow][startPosition+rightIndex]}`
                rightIndex++
            } else {
                toTheRight = false
            }
        }
    }

    const moveLeft = (checkRow, startPosition, dex) => {
        let toTheLeft = true
        let leftIndex = dex
        while (toTheLeft) {
            if (!isNaN(EngineSchematics[checkRow][startPosition-leftIndex])) {
                numbers[numbersPos] = `${EngineSchematics[checkRow][startPosition-leftIndex]}${numbers[numbersPos]}`
                leftIndex++
            } else {
                toTheLeft = false
            }
        }
    }

    const checkTopBottom = (currentRow) => {
        if (!isNaN(EngineSchematics[currentRow][positionInRow])) {
            numbers.push(`${EngineSchematics[currentRow][positionInRow]}`)
            moveRight(currentRow, positionInRow, 1)
            moveLeft(currentRow, positionInRow, 1)
            numbersPos++
        } else {
            if (!isNaN(EngineSchematics[currentRow][positionInRow-1])) {
                numbers.push(`${EngineSchematics[currentRow][positionInRow-1]}`)
                moveLeft(currentRow, (positionInRow-1), 1)
                numbersPos++
            } 
            if (!isNaN(EngineSchematics[currentRow][positionInRow+1])) {
                numbers.push(`${EngineSchematics[currentRow][positionInRow+1]}`)
                moveRight(currentRow, (positionInRow+1), 1)
                numbersPos++
            }
        }
    }

    const checkLeftRight = (currentPosition, direction) => {
        if (!isNaN(EngineSchematics[row][currentPosition])) {
            numbers.push(`${EngineSchematics[row][currentPosition]}`)
            if (direction) {
                moveLeft(row, currentPosition, 1)
            } else {
                moveRight(row, currentPosition, 1)
            }
            numbersPos++
        }
    }

    if (row > 0) {
        checkTopBottom(row-1)
    }
    
    if (row < EngineSchematics.length-1) {
        checkTopBottom(row+1)
    }

    if (positionInRow > 0) {
        checkLeftRight(positionInRow-1, true)
    }

    if (positionInRow < EngineSchematics[row].length) {
        checkLeftRight(positionInRow+1, false)
    }

    if (numbers.length === 2) {
        sum = sum + (Number(numbers[0])*Number(numbers[1]))
    }
}

for (let i=0;i<EngineSchematics.length;i++) {
    for (let j=0;j<EngineSchematics[i].length;j++) {
        if (EngineSchematics[i][j] === '*') {
            checkForRatio(i, j)   
        }
    }

}

console.log(sum)