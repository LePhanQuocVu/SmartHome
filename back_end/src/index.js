const express = require('express')
require('dotenv').config({ quiet: true });
const connectDB = require('./config/db')
const userRouter = require('./router/userRoute')

/**Start App */
const app = express()

/**Middelware */
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

/** connect to db */
connectDB();

/** routing */
app.get('/', (req, res) => {
  res.send('Hello World!')
})
/**User Route */
app.use('/api/users', userRouter);


// change readme
// rebase
// rebase 2 -test
// rebase 2 - quall
// rebase 3

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})