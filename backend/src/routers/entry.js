const express = require('express')
const Entry = require('../models/entry')
const auth = require('../middleware/auth')
const router = new express.Router()
const User = require('../models/user')

// CREATE A NEW ENTRY
router.post('/entries', auth,  async (req, res) => {
    // const entry = new Entry(req.body)
    const entry = new Entry({
        ...req.body,
        owner: req.user._id
    })

    try {
        await entry.save()        
        res.status(201).send(entry)
    } catch (e) {
        res.status(400).send(e)

    }
})

//GET ALL ENTRIES
router.get('/entries', auth, async (req, res) => {
    try {
        await req.user.populate('entries').execPopulate()
        res.send(req.user.entries)
    } catch (e) {
        res.status(500).send(e)
    }
})


// GET AN ENTRY BY ID
router.get('/entries/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const entry = await Entry.findById(_id)
        const entry = await Entry.findOne({ _id: _id, owner: req.user._id })

        if (!entry){
            res.status(404).send()
        }
        res.send(entry)
    } catch (e) {
        res.status(500).send(e)
    }
})

// UPDATE AN ENTRY BY ID
router.patch('/entries/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'body']
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const entry = await Entry.findOne({_id: req.params.id, owner: req.user._id})
        // const entry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if (!entry){
            return res.status(404).send()
        }
        updates.forEach((update) => entry[update] = req.body[update])
        await entry.save()
        res.send(entry)
    } catch(e) {
        res.status(400).send(e)
    }
})

// DELETE AN ENTRY
router.delete('/entries/:id', auth, async (req, res) => {
    try {
        const entry = await Entry.findOneAndDelete({_id: req.params.id, owner: req.user._id })
        if (!entry){
            res.status(404).send()
        }
        res.send(entry)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router