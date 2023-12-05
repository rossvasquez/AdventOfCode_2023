const Data = require('../data/december_05')

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

const checkForDestination = (number, indexOfMaps) => {
    let truthy = true
    for (let i=0;i<newMaps[maps[indexOfMaps]].length;i++) {
        let destination = newMaps[maps[indexOfMaps]][i][0]
        let source = newMaps[maps[indexOfMaps]][i][1]
        let range = newMaps[maps[indexOfMaps]][i][2]
        if (number >= source && number < (source+range)) {
            let addTo = number - source
            if (maps[indexOfMaps] === 'location') {
                if (destination+addTo < locationNumber) {
                    locationNumber = destination+addTo
                }
                break
            } else {
                checkForDestination((destination+addTo), (indexOfMaps+1))
                truthy = false
                break
            }
        }
    }

    if (maps[indexOfMaps] !== 'location' && truthy) {
        checkForDestination(number, (indexOfMaps+1))
    } else if (maps[indexOfMaps] === 'location' && truthy) {
        if (number < locationNumber) {
            locationNumber = number
        }
    }
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

let memoizedChecks = []

for (let i=0;i<seedMap.length;i++) {
    for (let j=seedMap[i].min;j<seedMap[i].lessThan;j++) {
        if (memoizedChecks.indexOf(j) === -1) {
            checkForDestination(j, 0)
            memoizedChecks.push(j)
        }
    }
}

console.log(locationNumber)
