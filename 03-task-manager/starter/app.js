const express = require('express')
const app = express()

const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

require('dotenv').config()


//middleware
app.use(express.json())
app.use(express.static('./public'))


//routes
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandler)

//app.get('api/v1/tasks')        - get all tasks
//app.post('api/v1/tasks')       - create single task 
//app.get('api/v1/tasks/:id')    - get single task
//app.patch('api/v1/tasks/:id')  - update task
//app.delete('api/v1/tasks/:id') - delete task


const port = process.env.PORT || 3000


const start = async ()=>{
  try{
    await connectDB(process.env.MONGO_URI)
    app.listen(port, ()=>{
      console.log(`server is listening on port ${port}...`)
    })
  } catch(error){
    console.log(error)
  }
}

start()



