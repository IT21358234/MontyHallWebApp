const assert = require('chai').assert
const { montyHallSimulation } = require('../src/Controllers/simulationController')

describe('Monty Hall Simulation', function() {
    it('should return an object with wins, simulations, and playerChoices', function() {
        const numSimulations = 1000
        const door = 'Switch'
        const result = montyHallSimulation(numSimulations, door)

        assert.isObject(result)
        assert.property(result, 'wins')
        assert.property(result, 'simulations')
        assert.property(result, 'playerChoices')
        assert.isNumber(result.wins)
        assert.isArray(result.simulations)
        assert.isArray(result.playerChoices)
    })
})