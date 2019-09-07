 INSERT (CREATE) EXAMPLES
 db.collection('users').insertOne({
        _id: id,
        name: 'Bruce new Insert',
        age: 30
    }, (error, result) => {
        if (error){
            return console.log('Unable to insert user')
        }

        console.log(result.ops)
    })

    db.collection('users').insertMany([
        {
            name: 'Jen',
            age: 28
        },
        {
            name: 'Gunther',
            age: 27
        }
    ], (error, result) => {
        if (error){
            return console.log('Unable to insert documents!')
        }

        console.log(result.ops)
    })

    db.collection('entries').insertMany([
        {
            title: 'My journal entry',
            date: 'an old date'
        },
        {
            title: 'Another entry',
            date: 'an older date'
        },
        {
            title: 'Most recent entry',
            date: 'latest date'
        }
    ], (error, response) => {
        if (error){
            return console.log('error occured')
        }
        console.log(response.ops)
    })

READ EXAMPLES

   db.collection('users').findOne({_id: ObjectID('5d700c199031580df13c515f')}, (error, user) => {
         if (error){
             return console.log('unable to fetch')
         }

         console.log(user)
     })

       db.collection('entries').find({ date : 29 }).toArray((error, entry) =>{
         if (error){
             return console.log('unable to fetch')
         }
        console.log(entry)
        })
    db.collection('entries').find({ date: 27}).count((error, count) => {
        console.log(count)
    })

db.collection('entries').findOne({_id: ObjectID('5d7012d0bbdf090f526c9af6')}, (error, entry) => {
        if (error){
            return console.log('unable to fetch')
        }

        console.log(entry)
    })

    db.collection('entries').find({date: 27}).toArray((error, entry) => {
        if (error){
            return console.log('unable to fetch')
        }
        console.log(entry)
    })

UPDATE EXAMPLES

    db.collection('users').updateOne({
        _id: ObjectID('5d700a0b08dad3cd3a757aa9')
    }, {
        $inc:{
            age: 100
        }
    }).then( (result) => {
        console.log(result)
    }).catch( (error) => {
        console.log(error)
    })

      db.collection('users').updateOne({
        _id: ObjectID('5d700a0b08dad3cd3a757aa9')
    }, {
        $set:{
            name: "my updated name"
        }
    }).then( (result) => {
        console.log(result)
    }).catch( (error) => {
        console.log(error)
    })


       db.collection('entries').updateMany(
       {date: 27},
       {$set:
        {
         date: 45
        }
        }).then((result) => {
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        })

    DELETE EXAMPLES

       db.collection('users').deleteOne({_id: ObjectID('5d701ca3dd85121001db5115')}).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

     db.collection('entries').deleteMany({date: 45}).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })


MONGOOSE LIBRARY - CREATE A MODEL AND SAVE AN INSTANCE OF IT

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age:{
        type: Number
    }
})

const me = new User({
    name: 'Bruce mongoose',
    age: "thirty eight"
})

me.save().then((me)=>{
    console.log(me)
}).catch((error)=>{
    console.log('Error!', error)
})

const Entry = mongoose.model('Entry', {
    title:{
        type: String
    },
    body:{
        type: String
    },
    date:{
        type: Date
    }
})

const entry = new Entry({
    title: 'My entry',
    body: 'This is my latest entry and a string of the date also worked',
    date: "9/6/19"
})
entry.save().then((entry)=>{
    console.log(entry)
}).catch((error)=>{
    console.log(error)
})


const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
   password: {
       type: String,
       required: true,
       minlength: 7,
       trim: true,
       validate(value){
        if (value.toLowerCase().includes("password")){
            throw new Error('Invalid Password')
        }
       }
   }
})

const me = new User({
    name: '        Bruce checking validations',
    email: 'bruce@validemail.com',
    password: "     phone12345    "
})

me.save().then((me)=>{
    console.log(me)
}).catch((error)=>{
    console.log('Error!', error)
})

const Entry = mongoose.model('Entry', {
    title:{
        type: String,
        trim: true,
        required: true 
    },
    body:{
        type: String,
        minlength: 20,
        required: true,
        trim: true 
    },
    date:{
        type: Date
    }
})

const entry = new Entry({
    title: 'My entry         ',
    body: 'This is a minimum of 20 characters',
    date: "9/6/19"
})
entry.save().then((entry)=>{
    console.log(entry)
}).catch((error)=>{
    console.log(error)
})