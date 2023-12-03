const PuzzleData = require('./puzzle_data')

const arrOfColors = []

for (let i=0;i<PuzzleData.length;i++) {
    PuzzleData[i] = PuzzleData[i].slice(PuzzleData[i].indexOf(':') + 1)
    PuzzleData[i] = PuzzleData[i].replace(' ', '')
    PuzzleData[i] = PuzzleData[i].replaceAll(', ', '", "')
    PuzzleData[i] = `"${PuzzleData[i]}"`
    if (PuzzleData[i].indexOf(';') !== -1) {
        PuzzleData[i] = PuzzleData[i].replaceAll('; ', '"], ["')
        PuzzleData[i] = `[[${PuzzleData[i]}]]`
    } else {
        PuzzleData[i] = `[${PuzzleData[i]}]`
    }
    PuzzleData[i] = JSON.parse(PuzzleData[i])
    arrOfColors.push(PuzzleData[i])
}

let sumOfPowers = 0

for (let i = 0;i<arrOfColors.length;i++) {

    let colorCount = {
        red: 0,
        green: 0,
        blue: 0
    }

    for (let j=0;j<arrOfColors[i].length;j++) {
        for (let k=0;k<arrOfColors[i][j].length;k++) {
            if (Number(arrOfColors[i][j][k].slice(0, arrOfColors[i][j][k].indexOf(' '))) > colorCount[arrOfColors[i][j][k].slice(arrOfColors[i][j][k].indexOf(' ') + 1)]) {
                colorCount[arrOfColors[i][j][k].slice(arrOfColors[i][j][k].indexOf(' ') + 1)] = Number(arrOfColors[i][j][k].slice(0, arrOfColors[i][j][k].indexOf(' ')))
            }
        }
    }

    sumOfPowers = sumOfPowers + (colorCount.red * colorCount.green * colorCount.blue)

}

console.log(sumOfPowers)