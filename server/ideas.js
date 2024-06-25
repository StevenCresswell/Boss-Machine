const express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId} = require('./db')

ideasRouter.use('/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId
    if (ideaId) {
        req.ideaId = ideaId
        next()
    } else {
        res.status(404).send()
    }
})

ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas')
    res.send(ideas)
})

ideasRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body)
    if (newIdea) {
        res.status(201).send(newIdea)
    } else {
        res.status(400).send()
    }
})

ideasRouter.get('/:ideaId', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', req.ideaId)
    res.send(idea)
})

ideasRouter.put('/:ideaId', (req, res, next) => {
        const idea = req.body
        idea.id = req.ideaId
        updateInstanceInDatabase('ideas', idea)
        res.send(idea)
})

ideasRouter.delete('/:ideaId', (req, res, next) => {
        deleteFromDatabasebyId('ideas', req.ideaId)
        res.status(204).send()
})

module.exports = ideasRouter;