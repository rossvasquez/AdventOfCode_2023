const Data = require('./data')

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
        numbers: numberArr,
        cardIndex: i
    })
}

for (let i=0;i<cardArrs.length;i++) {
    let matches = 0
    for (let j=0;j<cardArrs[cardArrs[i].cardIndex].numbers.length;j++) {
        for (let k=0;k<cardArrs[cardArrs[i].cardIndex].winners.length;k++) {
            if (cardArrs[cardArrs[i].cardIndex].winners[k] === cardArrs[cardArrs[i].cardIndex].numbers[j]) {
                matches++
            }
        }
    }
    
    for (let j=(cardArrs[i].cardIndex + 1);j<=((cardArrs[i].cardIndex)+matches);j++) {
        cardArrs.push(cardArrs[j])
    }
}

console.log(cardArrs.length)