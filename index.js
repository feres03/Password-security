const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 4000;
const app = express();

require('../Challenge7/database/connect')
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
const authentication = require('./routes/authApi')


app.use("/api", authentication);


app.listen(port, () => { console.log(`This port is running on port ${port}`) })