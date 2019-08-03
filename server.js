//Base Setup

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Bear = require('./models/bear')

const uri =
  'mongodb+srv://user:pillow123@cluster0-45nfb.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true })

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
  .get((req, res) => {
    Bear.find((err, bears) => {
      if (err) {
        res.send(err)
      } else {
        res.json(bears)
      }
    })
  })

router
  .route('/bears/:bear_id')

  .get((req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
      if (err) {
        res.send(err)
      } else {
        res.json(bear)
      }
    })
  })

  .put((req, res) => {
    Bear.findById(req.params.bear_id, (err, bear) => {
      if (err) {
        res.send(err)
      } else {
        bear.name = req.body.name
        bear.save(err => {
          if (err) {
            res.send(err)
          } else {
            res.json({ message: 'Bear was Updated' })
          }
        })
      }
    })
  })

//Register our Routes
//all of our routes will be prefixed with /api
app.use('/api', router)

//Start the Server

app.listen(port)
console.log('Magic Happening on port' + port)
