
const url = 'mongodb+srv://alexkolev05:1234@eentai.ou01tyv.mongodb.net/?retryWrites=true&w=majority'
const dbName =  'BookStore'

const {MongoClient} = require('mongodb')

const client = new MongoClient(url)

const executeService = async (Service, collectionName) => {
    try{
        await client.connect();
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        const result = await Service();
        client.close();
        return result;
    }catch(e){
        console.log(e)
    }finally{
    }
}

const getCollection = async(collectionName) => {
    try{
        await client.connect();
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        return collection;
    }catch(e){
        console.log(e)
    }finally{
    }   
}

module.exports = {executeService, getCollection}