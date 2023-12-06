const Races = require('../data/december_06')

let recordRoutes = []

for (let i=0;i<Races.time.length;i++) {
    let distances = []
    let speed = 1
    for (let j=1;j<Races.time[i]-1;j++) {
        if ((speed*((Races.time[i])-j)) > Races.distance[i]) {
            distances.push(1)
        }
        speed++
    }
    recordRoutes.push(distances.length)
}

console.log(recordRoutes.reduce((a, b) => a*b))