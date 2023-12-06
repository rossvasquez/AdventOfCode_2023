const Data = require('../data/december_05.js')

const maps = ['soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location']

let locationNumber = Infinity

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

const rangeInRange = (minBound, maxBound, indexOfMaps, indexOfRange) => {
    for (let i=0;i<newMaps[maps[indexOfMaps]].length;i++) {
        let destination = (newMaps[maps[indexOfMaps]][i][0])
        let lowerLimit = (newMaps[maps[indexOfMaps]][i][1])
        let upperLimit = (newMaps[maps[indexOfMaps]][i][1] + (newMaps[maps[indexOfMaps]][i][2] - 1))
        let newMinBound = 0
        let newMaxBound = 0
        if (indexOfMaps !== 6) {
            if (lowerLimit <= minBound && upperLimit > minBound) {
                newMinBound = (minBound + (destination-lowerLimit))
                if (maxBound <= upperLimit) {
                    newMaxBound = (maxBound + (destination-lowerLimit))
                } else {
                    newMaxBound = (upperLimit + (destination-lowerLimit))
                }
                rangeInRange(newMinBound, newMaxBound, indexOfMaps+1, indexOfRange)
                break
            } else if (maxBound > lowerLimit && maxBound <= upperLimit) {
                newMaxBound = (maxBound + (destination-lowerLimit))
                newMinBound = (lowerLimit + (destination-lowerLimit))
                rangeInRange(newMinBound, newMaxBound, indexOfMaps+1, indexOfRange)
                break
            } else if (i === (newMaps[maps[indexOfMaps]].length - 1)) {
                rangeInRange(minBound, maxBound, indexOfMaps+1, indexOfRange)
            }
        } else {
            if (minBound >= lowerLimit && minBound < upperLimit) {
                newMinBound = (minBound + (destination-lowerLimit))
                if (newMinBound < locationNumber) {
                    locationNumber = newMinBound
                }
                break
            } else if (maxBound > lowerLimit && maxBound <= upperLimit) {
                newMinBound = (lowerLimit + (destination-lowerLimit))
                if (newMinBound < locationNumber) {
                    locationNumber = newMinBound
                }
                break
            } else if (i === (newMaps[maps[indexOfMaps]].length - 1)) {
                if (minBound < locationNumber) {
                    locationNumber = minBound
                }
            }
        }
    }
}

for (let i=0;i<seedMap.length;i++) {
    rangeInRange(seedMap[i].min, seedMap[i].lessThan-1, 0, i+1)
}

console.log(locationNumber)