const Data = require('../data/december_05')

const maps = ['soil', 'fertilizer', 'water', 'light', 'temperature', 'humidity', 'location']

let mapDex = []

let locationNumbers = []

const checkForDestination = (number, map, indexInMap) => {
    let newDex = mapDex[indexInMap]
    for (let i=0;i<Data[map].length;i++) {
        let destination = Number(Data[map][i].slice(0, Data[map][i].indexOf(' ')))
        let source = Number(Data[map][i].slice((Data[map][i].indexOf(' ') + 1), Data[map][i].lastIndexOf(' ')))
        let range = Number(Data[map][i].slice(Data[map][i].lastIndexOf(' ') + 1))
        if (number >= source && number < (source+range)) {
            let addTo = number - source
            if (map === 'location') {
                locationNumbers.push(destination+addTo)
            } else {
                mapDex[indexInMap]++
                checkForDestination((destination+addTo), maps[mapDex[indexInMap]], indexInMap)
            }
        }
        if (newDex !== mapDex[indexInMap]) {
            break
        }
    }

    if (mapDex[indexInMap] === newDex && map !== 'location') {
        mapDex[indexInMap]++
        checkForDestination(number, maps[mapDex[indexInMap]], indexInMap)
    }
}

let seeds = []
let number = ''

for (let i = 0;i<=Data.seeds.length;i++) {
    if (Data.seeds[i] !== ' ') {
        number = `${number}${Data.seeds[i]}`
    } else {
        seeds.push(Number(number))
        number=''
    }
}

for (let i = 0;i<seeds.length;i++) {
    mapDex.push(0)
    checkForDestination(seeds[i], 'soil', i)
}

console.log(Math.min(...locationNumbers))