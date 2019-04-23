const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
var winston = require('winston');
const morgan = require('morgan');

const bodyParser = require('body-parser');
const app = express()
app.use(helmet())

app.use(morgan('tiny'))
app.use(bodyParser.json())


// Cors options / configuration.
// good list of domains to allow to access our endpoints.
var whitelist = ['null', 'http://example1.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  // http only cookie
  // res.cookie('session', '1', {httpOnly: true})
  // // secure cookie
  // res.cookie('session', '1', { secure: true})
  // // set content security polcity headers for what scripts to trust.
  // res.set({
  //   'Content-Security-Policy': "script-src 'self' https://apis.google.com",
  // })
  res.send('Hello World!')
})

app.post('/secret', (req, res) => {
  const { userInput } = req.body;
  if (userInput) {
    winston.log('info', 'user input: ' + userInput);
    res.status(200).json('success');
  } else {
    winston.error('This guy is messing with us:' + userInput);
    res.status(400).json('incorrect submission')
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))