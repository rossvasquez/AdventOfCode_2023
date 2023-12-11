const PipeMap = require('../data/data')

let pipePath = 0

let cooridinates = []

const checkPath = (thisRow, thisIndex, thisUp, thisDown, thisLeft, thisRight) => {

    let found = false

    let row = thisRow
    let index = thisIndex

    let up = thisUp
    let down = thisDown
    let left = thisLeft
    let right = thisRight

    let aboveVal = 0
    let belowVal = 0
    let rightVal = 0
    let leftVal = 0

    while (!found) {
        if (row === 0) {
            up = false
        } else {
            aboveVal = PipeMap[row-1][index]
        }
    
        if (up && aboveVal === '|') {
            cooridinates.push([index, row])
            pipePath++
            row = row-1
            up = true
            down = false
            left = false
            right = false
        } else if (up && aboveVal === 'F') {
            cooridinates.push([index, row])
            pipePath++
            row = row-1
            up = false
            down = false
            left = false
            right = true
        } else if (up && aboveVal === '7') {
            cooridinates.push([index, row])
            pipePath++
            row = row-1
            up = false
            down = false
            left = true
            right = false
        } else if (up && aboveVal === 'S') {
            cooridinates.push([index, row])
            pipePath++
            break
        }
    
        if (row === PipeMap.length-1) {
            down = false
        } else {
            belowVal = PipeMap[row+1][index]
        }
    
        if (down && belowVal === '|') {
            cooridinates.push([index, row])
            pipePath++
            row = row+1
            up = false
            down = true
            left = false
            right = false
        } else if (down && belowVal === 'L') {
            cooridinates.push([index, row])
            pipePath++
            row = row+1
            up = false
            down = false
            left = false
            right = true
        } else if (down && belowVal === 'J') {
            cooridinates.push([index, row])
            pipePath++
            row = row+1
            up = false
            down = false
            left = true
            right = false
        } else if (down && belowVal === 'S') {
            cooridinates.push([index, row])
            pipePath++
            break
        }
    
        if (index === 0) {
            left = false
        } else {
            leftVal = PipeMap[row][index-1]
        }
    
        if (left && leftVal === '-') {
            cooridinates.push([index, row])
            pipePath++
            index = index-1
            up = false
            down = false
            left = true
            right = false
        } else if (left && leftVal === 'L') {
            cooridinates.push([index, row])
            pipePath++
            index = index-1
            up = true
            down = false
            left = false
            right = false
        } else if (left && leftVal === 'F') {
            cooridinates.push([index, row])
            pipePath++
            index = index-1
            up = false
            down = true
            left = false
            right = false
        } else if (left && leftVal === 'S') {
            cooridinates.push([index, row])
            pipePath++
            break
        }
    
        if (index === PipeMap[row].length) {
            right = false
        } else {
            rightVal = PipeMap[row][index+1]
        }
    
        if (right && rightVal === '-') {
            cooridinates.push([index, row])
            pipePath++
            index = index+1
            up = false
            down = false
            left = false
            right = true
        } else if (right && rightVal === 'J') {
            cooridinates.push([index, row])
            pipePath++
            index = index+1
            up = true
            down = false
            left = false
            right = false
        } else if (right && rightVal === '7') {
            cooridinates.push([index, row])
            pipePath++
            index = index+1
            up = false
            down = true
            left = false
            right = false
        } else if (right && rightVal === 'S') {
            cooridinates.push([index, row])
            pipePath++
            break
        }
    }
}

for (row in PipeMap) {
    const positionOfS = PipeMap[row].indexOf('S')
    if (positionOfS !== -1) {
        checkPath(Number(row), positionOfS,true,true,true,true)
    }
}

const shoelaceArea = () => {
    let firstVal = 0
    let secondVal = 0

    const condition = cooridinates.length-1

    for (let i=0;i<cooridinates.length;i++) {
        if (i !== condition) {
            firstVal = firstVal + (cooridinates[i][0]*cooridinates[i+1][1])
            secondVal = secondVal + (cooridinates[i][1]*cooridinates[i+1][0])
        } else {
            firstVal = firstVal + (cooridinates[i][0]*cooridinates[0][1])
            secondVal = secondVal + (cooridinates[i][1]*cooridinates[0][0])
        }
    }

    const area = (firstVal-secondVal)/2

    if (area < 0) {
        return ((area*-1) + 1) - (cooridinates.length/2)
    } else {
        return (area + 1) - (cooridinates.length/2)
    }

}

console.log(shoelaceArea())