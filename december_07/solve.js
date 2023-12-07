const Hands = require('../data/december_07')

const hand_RankValue = {}

const hands = []

for (let i=0;i<Hands.length;i++) {
    let values = Hands[i].split(' ')
    hand_RankValue[values[0].toString()] = Number(values[1])
    hands.push(values[0])
}

const groupedHands = {
    five_of_a_kind: [],
    four_of_a_kind: [],
    full_house: [],
    three_of_a_kind: [],
    two_pair: [],
    one_pair: [],
    high_card: []
}

const checkForLetters = (value) => {
    if (value === 'A') {
        return '14'
    } else if (value === 'K') {
        return '13'
    } else if (value === 'Q') {
        return '12'
    } else if (value === 'J') {
        return '11'
    } else if (value === 'T') {
        return '10'
    } else {
        return value
    }
}

const checkForLetters1 = (value) => {
    if (value === 'A') {
        return '14'
    } else if (value === 'K') {
        return '13'
    } else if (value === 'Q') {
        return '12'
    } else if (value === 'J') {
        return '1'
    } else if (value === 'T') {
        return '10'
    } else {
        return value
    }
}

for (let i=0;i<hands.length;i++) {
    let cards = {}
    for (let j=0;j<hands[i].length;j++) {
        const sanitizedCardValue = checkForLetters(hands[i][j])
        if (!cards[sanitizedCardValue]) {
            cards[sanitizedCardValue] = 1
        } else {
            cards[sanitizedCardValue]++
        }
    }

    const differentCardsInHand = Object.keys(cards)

    if (differentCardsInHand.length === 1) {
        groupedHands.five_of_a_kind.push(hands[i])
    } else if (differentCardsInHand.length === 2) {
        const firstCardOccurences = cards[differentCardsInHand[0]]
        const secondCardOccurences = cards[differentCardsInHand[1]]
        const value = firstCardOccurences/secondCardOccurences
        if (differentCardsInHand[0] === '11' || differentCardsInHand[1] === '11') {
            groupedHands.five_of_a_kind.push(hands[i])
        } else if (value === .25 || value === 4) {
            groupedHands.four_of_a_kind.push(hands[i])
        } else {
            groupedHands.full_house.push(hands[i])
        }
    } else if (differentCardsInHand.length === 3) {
        const cardOccurences = [cards[differentCardsInHand[0]], cards[differentCardsInHand[1]], cards[differentCardsInHand[2]]]
        if (cardOccurences.indexOf(3) === -1) {
            if (differentCardsInHand.indexOf('11') !== -1) {
                if (cards['11'] === 2 || cards['11'] === 3) {
                    groupedHands.four_of_a_kind.push(hands[i])
                } else {
                    groupedHands.full_house.push(hands[i])
                }
            } else {
                groupedHands.two_pair.push(hands[i])
            }
        } else {
            if (differentCardsInHand.indexOf('11') !== -1) {
                groupedHands.four_of_a_kind.push(hands[i])
            } else {
                groupedHands.three_of_a_kind.push(hands[i])
            }
        }
    } else if (differentCardsInHand.length === 4) {
        if (differentCardsInHand.indexOf('11') !== -1) {
            groupedHands.three_of_a_kind.push(hands[i])
        } else {
            groupedHands.one_pair.push(hands[i])
        }
    } else {
        if (differentCardsInHand.indexOf('11') !== -1) {
            groupedHands.one_pair.push(hands[i])
        } else {
            groupedHands.high_card.push(hands[i])
        }
    }
}

const ranks = []

let currentGroupRank = []

const handGroupNames = Object.keys(groupedHands)

const recurseThroughRanks = async (currentHandGroup, currentHand, checker) => {
    for (let i=0;i<5;i++) {
        if (Number(checkForLetters1(currentGroupRank[currentGroupRank.length-checker][i])) < Number(checkForLetters1(groupedHands[handGroupNames[currentHandGroup]][currentHand][i]))) {
            if (currentGroupRank.length-checker === 0) {
                currentGroupRank.splice(0, 0, groupedHands[handGroupNames[currentHandGroup]][currentHand])
                break
            } else {
                await recurseThroughRanks(currentHandGroup, currentHand, checker+1)
                break
            }
        } else if (Number(checkForLetters1(currentGroupRank[currentGroupRank.length-checker][i])) > Number(checkForLetters1(groupedHands[handGroupNames[currentHandGroup]][currentHand][i]))) {
            const insertAt = (currentGroupRank.length-checker)+1
            currentGroupRank.splice(insertAt, 0, groupedHands[handGroupNames[currentHandGroup]][currentHand])
            break
        } else if (i === 4) {
            const insertAt = (currentGroupRank.length-checker)+1
            currentGroupRank.splice(insertAt, 0, groupedHands[handGroupNames[currentHandGroup]][currentHand])
        }
    }
}

// Process a single hand group
const processHandGroup = async (handGroup, handGroupName) => {
    currentGroupRank.push(handGroup[0])
    for (let j = 1; j < handGroup.length; j++) {
        await recurseThroughRanks(handGroupNames.indexOf(handGroupName), j, 1)
    }
    ranks.push(currentGroupRank)
    currentGroupRank = []
}

// Sequentially process all hand groups
const processAllHandGroups = async () => {
    for (let handGroupName of handGroupNames) {
        const handGroup = groupedHands[handGroupName]
        if (handGroup.length > 0) {
            await processHandGroup(handGroup, handGroupName)
        }
    }
    // Continue with further processing, e.g., combining ranks
}

processAllHandGroups().then(() => {
    let ranksTogether = []

    for (let i=0;i<ranks.length;i++) {
        ranksTogether = ranksTogether.concat(ranks[i])
    }
    
    ranksTogether.reverse()
    
    let total = 0
    
    for (let i=0;i<ranksTogether.length;i++) {
        total = total + (hand_RankValue[ranksTogether[i]] * (i+1))
    }

    console.log(total)
})