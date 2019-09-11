const express = require('express')
require('./db/mongoose')
const routerUser = require('./router/user2')
const routerTask = require('./router/task2')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(routerUser)
app.use(routerTask)

app.listen(port, ()=> {
    console.log('Server is up on  port number '+port)
})


