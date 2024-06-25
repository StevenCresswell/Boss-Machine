const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db')


/*minionsRouter.use('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId
    if (minionId) {
        req.minionId = minionId
        next()
    } else {
        res.status(404).send()
    }
}) */

minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions')
    res.send(minions)
})

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body)
    if (newMinion) {
        res.status(201).send(newMinion)
    } else {
        res.status(400).send()
    }
})

minionsRouter.get('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId
    if (minionId) {
        const minion = getFromDatabaseById('minions', minionId)
        res.send(minion)
    } else {
        res.status(404).send()
    }
})

minionsRouter.put('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId
    if (minionId) {
        const minion = req.body
        minion.id = minionId
        updateInstanceInDatabase('minions', minion)
    } else {
        res.status(404).send()
    }
})

minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionId = req.params.minionId
    if (minionId) {
        deleteFromDatabasebyId('minions', minionId)
        res.status(204).send()
    } else {
        res.status(404).send()
    }
})

module.exports = minionsRouter;