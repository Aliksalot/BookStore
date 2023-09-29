
const collectionName = 'admins'

const {getCollection} = require("./createClient")
const passwordHandler = require('./handlePassword')


const newUser = async(user) => {
    
    return new Promise((resolve, reject) => {
        const plainPassword = user.password
        passwordHandler.hashPassword(plainPassword, async(err, hashedPassword) => {
            const collection = await getCollection(collectionName);
            console.log(collection)
            const userAvailable = await collection.findOne({username: user.username}) == null;
            if(userAvailable){
                user.password = hashedPassword;
                await collection.insertOne(user)
                resolve(true)
            }else{
                resolve(false)
            }
        })
    })
}

const tryLogin = async(username, passwordAttempt) => {
    return new Promise(async(resolve, reject) => {
        const collection = await getCollection(collectionName)
        const userFromDb = await collection.findOne({username: username})
        const hashedPassword = userFromDb.password
        console.log('Hashed pass from db: ', userFromDb)
        const result = await passwordHandler.comparePasswords(passwordAttempt, hashedPassword)
        resolve(result)
    })
}


module.exports = {
    newUser,
    tryLogin
}