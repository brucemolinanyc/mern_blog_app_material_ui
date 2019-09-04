// CRUD

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'mern-blog'

// const id = new ObjectID()
// console.log(id)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useUnifiedTopology: true, useNewUrlParser: true}, (error, client) => {
    if (error){
        return console.log('Unable to connect to database')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Bruce new Insert',
    //     age: 30
    // }, (error, result) => {
    //     if (error){
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 28
    //     },
    //     {
    //         name: 'Gunther',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if (error){
    //         return console.log('Unable to insert documents!')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('entries').insertMany([
    //     {
    //         title: 'My journal entry',
    //         date: 'an old date'
    //     },
    //     {
    //         title: 'Another entry',
    //         date: 'an older date'
    //     },
    //     {
    //         title: 'Most recent entry',
    //         date: 'latest date'
    //     }
    // ], (error, response) => {
    //     if (error){
    //         return console.log('error occured')
    //     }
    //     console.log(response.ops)
    // })


}) 