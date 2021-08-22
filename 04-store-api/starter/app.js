require('dotenv').config()
require('express-async-errors')//i dont have to try/catch || write asyncWrapper middleware


const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')


const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')


//middleware
app.use(express.json())


app.get('/', (req, res) =>{
  res.send('<h1>Store Api</h1><a href="/api/v1/products">products route</a>')
})

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async ()=>{
  try{
    //connect to db
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on PORT: ${port}`))
  } catch(error){
    console.log(error)
  }
}
start()



