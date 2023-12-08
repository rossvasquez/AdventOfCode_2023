const Data = require('../data/december_08')

let steps = 0

const parsedData = {}

for (let i=0;i<Data.map.length;i++) {
    const toParse = Data.map[i].slice(Data.map[i].indexOf('='))
    const L = toParse.slice(3,6)
    const R = toParse.slice(8,11)
    parsedData[Data.map[i].slice(0, Data.map[i].indexOf(' '))] = [L,R]
}

const mapKeys = Object.keys(parsedData)

const aNodes = []

for (let i=0;i<mapKeys.length;i++) {
    if (mapKeys[i][2] === 'A') {
        aNodes.push(mapKeys[i])
    }
}

let stepsArr = []

console.log(aNodes)

for (let i = 0; i < aNodes.length; i++) {
    let currentNode = aNodes[i]
    let currentStep = 0
    let currentCount = 1
    let node

    while (true) {
        if (Data.steps[currentStep] === 'L') {
            node = parsedData[currentNode][0]
        } else {
            node = parsedData[currentNode][1]
        }

        if (node[2] === 'Z') {
            stepsArr.push(currentCount)
            break;
        } else {
            currentNode = node
            currentCount++
            currentStep = currentStep !== (Data.steps.length - 1) ? currentStep + 1 : 0
        }
    }
}

stepsArr.sort((a, b) => (a - b))

const lcm = require('compute-lcm')

console.log(lcm(stepsArr))