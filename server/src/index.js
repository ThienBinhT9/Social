const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./configs/db');
const router = require('./router');

dotenv.config();

app.use(cors());

//CONNECT DB
db.connect();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cookieParser());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true, limit: '50mb'}));

app.use(helmet());
app.use(morgan('common'));

//ROUTE
router(app);

app.listen(8000, () => {
    console.log('Server is running...');
});



