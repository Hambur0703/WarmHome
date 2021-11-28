// import express from 'express';
import app from './api/app.js';


// const app = express()
const port = 3002;


app.listen(port, () => {
  console.log(`warmhome app listening at http://localhost:${port}`)
})