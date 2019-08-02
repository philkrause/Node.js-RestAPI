//Base Setup

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Bear = require('./models/bear')

const uri = mongoose.connect(
  'mongodb+srv://user:pillow123@cluster0-45nfb.mongodb.net/test?retryWrites=true&w=majority'
)
//mongodb:myDBReader:D1fficultP%40ssw0rd@mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/test?replicaSet=myRepl&authSource=admin
const port = process.env.PORT || 8080

//Setup Routes
const router = express.Router() //get an instance of the express Router

router.get('/', (req, res) => {
  res.json({ message: 'hooray and Welcome!' })
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

router.use((req, res, next) => {
  console.log('AJAX calling')
  next()
})

//More Routes here

//Bear Routes
router
  .route('/bears')

  .post((req, res) => {
    const bear = new Bear()
    bear.name = req.body.name
    bear.save(err => {
      if (err) {
        res.send(err)
      } else {
        res.json({ message: 'Bear was created' })
      }
    })
  })

//Register our Routes
//all of our routes will be prefixed with /api
app.use('/api', router)

//Start the Server

app.listen(port)
console.log('Magic Happening on port' + port)
