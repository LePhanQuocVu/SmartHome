import express from 'express'
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import mqtt from 'mqtt';
import bodyParser from "body-parser";
import cors from "cors";
import {connectDB}  from './config/db.js'
import userRouter from './router/userRoute.js';

/** MQTT connect */

/**Start App */
const app = express()

/**Middelware */


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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


// done
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
