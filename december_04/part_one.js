const Data = require('../data/december_04')

let cardArrs = []

for (let i=0;i<Data.length;i++) {
    let winnersString = Data[i].slice((Data[i].indexOf(':') + 1), Data[i].indexOf("|"))
    let winnersArr = []
    for (let j=0;j<winnersString.length;j++) {
        if (winnersString[j] !== ' ') {
            if (winnersString[j+1] !== ' ') {
                winnersArr.push(Number(`${winnersString[j]}${winnersString[j+1]}`))
                j++
            } else {
                winnersArr.push(Number(`${winnersString[j]}`))
            }
        }
    }

    let myNumberString = Data[i].slice(Data[i].indexOf('|') + 1)
    let numberArr = []
    for (let j=0;j<myNumberString.length;j++) {
        if (myNumberString[j] !== ' ') {
            if (myNumberString[j+1] !== ' ' && myNumberString[j+1] !== undefined) {
                numberArr.push(Number(`${myNumberString[j]}${myNumberString[j+1]}`))
                j++
            } else {
                numberArr.push(Number(`${myNumberString[j]}`))
            }
        }
    }
    
    cardArrs.push({
        winners: winnersArr,
        numbers: numberArr
    })
}

let totalPoints = 0

for (let i=0;i<cardArrs.length;i++) {
    let matches = 0
    for (let j=0;j<cardArrs[i].numbers.length;j++) {
        for (let k=0;k<cardArrs[i].winners.length;k++) {
            if (cardArrs[i].winners[k] === cardArrs[i].numbers[j]) {
                if (!matches) {
                    matches = 1
                } else {
                    matches = matches*2
                }
            }
        }
    }
    totalPoints = totalPoints + matches
}

console.log(totalPoints)

