const express = require('express')
const cors = require('cors')
require('./db/mongoose')

const userRouter = require('./routers/user')
const entryRouter = require('./routers/entry')

const app = express()
const port = process.env.PORT || 4000

app.use(express.json(), cors(), userRouter, entryRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const Entry = require('./models/entry')
const User = require('./models/user')

// const main = async () => {
    // task and its user
    // const entry = await Entry.findById('5d7929999e78bc6816509d96')
    // await entry.populate('owner').execPopulate()
    // console.log(entry.owner)

//     const user = await User.findById('5d79279168c92c679f8e356c')
//     await user.populate('entries').execPopulate()
//     console.log(user.entries)
// }

// main()