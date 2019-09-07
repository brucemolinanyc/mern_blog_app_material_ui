require('../src/db/mongoose')

const Entry = require('../src/models/entry')

Entry.findByIdAndDelete('5d727e34a2d5c52c7ba0f416').then((entry)=>{
    console.log(entry)
    return Entry.countDocuments({date: '2019-09-06T14:22:02.220Z' })
}).then((result)=> {
    console.log(result)
}).catch((error)=> {
    console.log(error)
})

const deleteEntryAndCount = async (id) => {
    const entry = await Entry.findByIdAndDelete(id)
    const count = await Entry.countDocuments()
    return count
}

deleteEntryAndCount('5d726bf1e213f32a45edc47d').then((result)=>{
    console.log("remaining", result)
}).catch((e)=>{
    console.log(e)
})