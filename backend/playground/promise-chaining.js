require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('5d72acbe08efbf35289eb03e', { age : 212}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: null})
// }).then((result)=>{
//         console.log(result)
// }).catch((error)=>{
//         console.log(error)
// })

const updateAgeAndCount = async (id, age) =>{
    const user = await User.findByIdAndUpdate(id, {age: age})
    const count = await User.countDocuments({age: null})
    return count
}

updateAgeAndCount('5d72acbe08efbf35289eb03e', 999).then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e)
})