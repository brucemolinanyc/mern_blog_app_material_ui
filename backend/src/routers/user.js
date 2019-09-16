const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()


// CREATE A NEW USER
router.post('/users', async (req, res) => {
    const user = new User(req.body)
   
    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({user: user, token: token})
    } catch (e) {
        res.send({"error": "Unable to create"})

    }

})

// LOGIN A USER
router.post('/users/login', async (req, res) => {
    const userEmail = req.body.email 
    const password = req.body.password
    
    try {
        // const user = await User.findOne({email: userEmail, password: password})
         // if (!user){
        //     res.send({"error": "User not found"})
        // }
        const user = await User.findByCredentials(userEmail, password)
        const token = await user.generateAuthToken()
        res.send({user: user, token: token})
    } catch (e) {
        res.send({"error": "Unable to login"})
    }
})

// LOGOUT USER - removes their latest token and resaves them - need token to be logged in
// router.post('/users/logout', auth, async (req, res) =>{
router.post('/users/logout', async (req, res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        console.log("post", req.user)
        res.send("Logged out")
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

// GET LOGGED IN USER
router.get('/users/me', auth, async (req, res) => {

    console.log(req)
    // console.log(req.header('Authorization'))
    res.send(req.user)
})

// UPDATE A USER BY THEIR ID
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true}) 
        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save()

        res.send(req.user)
    } catch(e){
        res.status(400).send(e)
    }
})

// DELETE YOURSELF
router.delete('/users/me', async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router 