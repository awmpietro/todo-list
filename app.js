require('dotenv').config({
   path: process.env.NODE_ENV === 'development' ? '.env.development' : '.env',
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const routes = require('./routes');
const port = process.env.PORT || 8085;

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

Object.keys(routes).forEach((key) => {
   app.use(`/${key}`, routes[key]);
});

app.use(errorHandler);

app.listen(port, () => {
   logger(`Server is running on port: ${port}`);
});
