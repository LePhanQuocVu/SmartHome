const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config();
const app = express()
const port = 3000
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());


/** connect to db */
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// nothing
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})