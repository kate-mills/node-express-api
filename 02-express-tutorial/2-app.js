const express = require('express')
const app = express()
//const logger = require('./logger')
//const authorize = require('./authorize')

const morgan = require('morgan')


//middleware
app.use([morgan('tiny')])

app.get('/', (req, res)=>{
  return res.status(200).send('Home Page')
})


app.get('/about', (req, res)=>{
  return res.status(200).send('About Page')
})

app.get('/api/products', (req, res)=>{
  return res.status(200).send('Api Products')
})

app.get('/api/items', (req, res)=>{
  console.log(req.user)
  return res.status(200).send('Api Items')
})

app.listen(5000, ()=>{
  console.log('server is listening on port 5000')

})
