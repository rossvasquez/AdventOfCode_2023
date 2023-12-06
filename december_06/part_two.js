const Races = require('../data/december_06_p2')

let distances = []
let speed = 1
for (let j=1;j<Races.time-1;j++) {
    if ((speed*((Races.time)-j)) > Races.distance) {
        distances.push(1)
    }
    speed++
}

console.log(distances.length)