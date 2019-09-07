const express = require('express')
const Entry = require('../models/entry')
const router = new express.Router()


// CREATE A NEW ENTRY
router.post('/entries', async (req, res) => {
    const entry = new Entry(req.body)

    try {
        await entry.save()        
        res.status(201).send(entry)
    } catch (e) {
        res.status(400).send(e)

    }
})

//GET ALL ENTRIES
router.get('/entries', async (req, res) => {
    try {
        const entries = await Entry.find({})
        res.send(entries)
    } catch (e) {
        res.status(500).send(e)
    }
})


// GET AN ENTRY BY ID
router.get('/entries/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const entry = await Entry.findById(_id)

        if (!entry){
            res.status(404).send()
        }
        res.send(entry)
    } catch (e) {
        res.status(500).send(e)
    }
})

// UPDATE AN ENTRY BY ID
router.patch('/entries/:id', async (req, res) => {
    console.log('testing')
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'body']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        if (!entry){
            return res.status(404).send()
        }
        res.send(entry)
    } catch(e) {
        res.status(400).send(e)
    }
})

// DELETE AN ENTRY
router.delete('/entries/:id', async (req, res) => {
    try {
        const entry = await Entry.findByIdAndDelete(req.params.id)

        if (!entry){
            res.status(404).send()
        }
        res.send(entry)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router