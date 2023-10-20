exports.simulation = async(req, res) => {
    const { numSimulations, door } = req.body

    const { wins, simulations, playerChoices } = montyHallSimulation(numSimulations, door)
    console.log(`No of Simulations:${numSimulations}, Door: ${door}, Wins: ${wins}`)
    res.json({ wins, simulations, playerChoices })
}

function montyHallSimulation(numSimulations, door) {

    let wins = 0;
    let simulations = []
    let playerChoices = []

    for (let i = 0; i < numSimulations; i++) {
        const doors = ['car', 'goat', 'goat']

        for (let i = doors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [doors[i], doors[j]] = [doors[j], doors[i]];
        }

        simulations.push(doors)

        const playerChoice = Math.floor(Math.random() * 3)
        playerChoices.push(playerChoice)

        let hostReveal;
        do {
            hostReveal = Math.floor(Math.random() * 3)
        } while (hostReveal === playerChoice || doors[hostReveal] === 'car')

        const finalChoice = (door === 'Switch') ? [0, 1, 2].filter((door) => door !== playerChoice && door !== hostReveal)[0] :
            playerChoice


        if (doors[finalChoice] === 'car') {
            wins++
        }
    }
    return { wins, simulations, playerChoices }
}

exports.montyHallSimulation = montyHallSimulation