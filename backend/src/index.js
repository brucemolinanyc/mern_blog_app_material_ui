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


