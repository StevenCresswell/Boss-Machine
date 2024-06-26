const express = require('express');
const meetingsRouter = express.Router();
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db')

meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings')
    res.send(meetings)
})

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting())
    if (newMeeting) {
        res.status(201).send(newMeeting)
    } else {
        res.status(400).send()
    }
})

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings')
    res.status(204).send()
})

module.exports = meetingsRouter