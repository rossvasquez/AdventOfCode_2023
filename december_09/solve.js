require('../data/data')

const parsedData = []

for (line in Data) {
    parsedData.push(Data[line].split(' ').map(Number))
}

let answer = 0

parsedData.forEach((row) => {

    const checkTree = (tree) => {
        tree.reverse()
        let num = 0
        for (row in tree) {
            num = tree[row][0] - num
        }
        answer = answer + num
    }

    const checkDiff = (checkThese) => {
        let truthy = false
        checkThese.forEach((number) => {
            if (number !== 0) {
                truthy = true
            }
        })
        return truthy
    }

    thisTree = [row]

    const createDiff = (numbers) => {
        thisDiff = []

        for (let i=0;i<(numbers.length - 1);i++) {
            if ((numbers[i] < 0 && numbers[i+1] >= 0) || (numbers[i] >= 0 && numbers[i+1] < 0)) {
                thisDiff.push(numbers[i+1] + (-1*numbers[i]))
            } else {
                thisDiff.push(Number(numbers[i+1]) - Number(numbers[i]))
            }
        }

        if (checkDiff(thisDiff)) {
            thisTree.push(thisDiff)
            createDiff(thisDiff)
        } else {
            checkTree(thisTree)
        }
    }

    createDiff(row)

})

console.log(answer)