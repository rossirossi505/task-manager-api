const {MongoClient, ObjectID} = require('mongodb')

const connectionUrl= 'mongodb://127.0.0.1:27017'
const databaseName= 'task-manager'

MongoClient.connect(connectionUrl, { useNewUrlParser : true }, (error, client) => {
if(error){
    return console.log('unable to connrct the data bese')
}
const db = client.db(databaseName)



db.collection('task').updateMany({
  completed: false
},{
  $set:{
    completed: true 
  }
}).then((result)=>{
  console.log(result)
}).catch((error)=>{
  console.log(error)
})

})
