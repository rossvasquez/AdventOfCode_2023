const start = performance.now()

// Import slightly preparsed data (Seeds and Maps are each propertys of an array where seeds is one string and each map is an array of strings representing the three values)

const Data = require('../data/december_05.js')

// That F*$&?N@ number

let locationNumber = Infinity

// Maps Enum (kind of lol) for index based calling of maps in recursion function

const maps = ['soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location']

// Create Object with each map as a property.
// Each map has an array representing each row of filters to test
// Each row has an array of the three numbers you need 0 indexed

let newMaps = {}

for (let i=0;i<7;i++) {
    let currentNum = ''
    let currentRow = []
    let currentMap =[]
    for (let j=0;j<Data[maps[i]].length;j++) {
        for (let k=0;k<Data[maps[i]][j].length; k++) {
            if (Data[maps[i]][j][k] !== ' ') {
                currentNum = `${currentNum}${Data[maps[i]][j][k]}`
                if (Data[maps[i]][j][k+1] === undefined) {
                    currentRow.push(Number(currentNum))
                    currentNum = ''
                }
            } else {
                currentRow.push(Number(currentNum))
                currentNum = ''
            }
        }
        currentMap.push(currentRow)
        currentRow = []
    }
    newMaps[maps[i]] = currentMap
}

// Create an array of objects that represent each range for seed input

let seedMap = []
let numberString = ''
let isRange = false
let initial = 0

for (let i = 0;i<=Data.seeds.length;i++) {
    if (Data.seeds[i] !== ' ') {
        numberString = `${numberString}${Data.seeds[i]}`
    } else {
        if (isRange) {
            seedMap.push({
                min: initial,
                lessThan: initial+Number(numberString)
            })
            isRange = false
            numberString=''
        } else {
            initial = Number(numberString)
            isRange = true
            numberString=''
        }
    }
}

// Callback to check for ranges in map filters
// minBound and maxBound start with seed range but adjust to maps over course of recursion
// Accepts indexOfMaps which links to map enums to ensure each map gets traversed by each seed range (accumed in internal callbacks)

const rangeInRange = (minBound, maxBound, indexOfMaps, indexInMap) => {
    let newMinBound = 0
    let newMaxBound = 0
    for (let i=indexInMap;i<newMaps[maps[indexOfMaps]].length;i++) {

        let destination = newMaps[maps[indexOfMaps]][i][0]
        let lowerLimit = newMaps[maps[indexOfMaps]][i][1]
        let upperLimit = newMaps[maps[indexOfMaps]][i][1] + (newMaps[maps[indexOfMaps]][i][2] - 1)

        if (indexOfMaps === 6) {
            if (minBound >= lowerLimit && minBound <= upperLimit) {
                newMinBound = minBound + (destination-lowerLimit)
                if (newMinBound < locationNumber) {
                    locationNumber = newMinBound
                    break
                }
            } else if (maxBound >= lowerLimit && maxBound <= upperLimit) {
                if (destination < locationNumber) {
                    locationNumber = destination
                    break
                }
            } else if (lowerLimit > minBound && lowerLimit <= maxBound) {
                if (destination < locationNumber) {
                    locationNumber = destination
                    break
                }
                if (i < (newMaps[maps[6]].length - 1)) {
                    rangeInRange(minBound, lowerLimit-1, 6, i+1)
                    rangeInRange(upperLimit+1, maxBound, 6, i+1)
                }
            } else if (i === (newMaps[maps[6]].length - 1)) {
                if (minBound < locationNumber) {
                    locationNumber = minBound
                }
            }
        } else {
            if (minBound >= lowerLimit && minBound <= upperLimit) {
                newMinBound = minBound + (destination-lowerLimit)
                if (maxBound <= upperLimit) {
                    newMaxBound = maxBound + (destination-lowerLimit)
                } else {
                    newMaxBound = upperLimit + (destination-lowerLimit)
                    if (i < (newMaps[maps[indexOfMaps]].length - 1)) {
                        rangeInRange(upperLimit+1, maxBound, indexOfMaps, i+1)
                    }
                }
                rangeInRange(newMinBound, newMaxBound, indexOfMaps+1, 0)
                break
            } else if (maxBound >= lowerLimit && maxBound <= upperLimit) {
                newMaxBound = maxBound + (destination-lowerLimit)
                newMinBound = destination
                if (i < (newMaps[maps[indexOfMaps]].length - 1)) {
                    rangeInRange(minBound, lowerLimit-1, indexOfMaps, i+1)
                }
                rangeInRange(newMinBound, newMaxBound, indexOfMaps+1, 0)
                break
            } else if (lowerLimit > minBound && lowerLimit <= maxBound) {
                rangeInRange(destination, (upperLimit + (destination-lowerLimit)), indexOfMaps+1, 0)
                if (i < (newMaps[maps[indexOfMaps]].length - 1)) {
                    rangeInRange(minBound, lowerLimit-1, indexOfMaps, i+1)
                    rangeInRange(upperLimit+1, maxBound, indexOfMaps, i+1)
                }
                break
            } else if (i === (newMaps[maps[indexOfMaps]].length - 1)) {
                rangeInRange(minBound, maxBound, indexOfMaps+1, 0)
            }
        }
    }
}

// Makes the initial call to main callback for each pair of seed range values present, subtracts .lessThan by 1 because first number in range is inclusive

for (let i=0;i<seedMap.length;i++) {
    rangeInRange(seedMap[i].min, seedMap[i].lessThan-1, 0, 0)
}

console.log('\n',locationNumber)

console.log(`\nExecuted in ${Math.round(performance.now()-start)} milliseconds\n`)