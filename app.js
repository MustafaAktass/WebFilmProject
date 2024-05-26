const express = require('express');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const path = require('path')
const cookiParser = require('cookie-parser');

// Load environment variables
require('dotenv').config();

const app = express();

connectDB();

app.use('/static',express.static(path.join(__dirname,'public/admin-dashboard/admin/dist')));//admin template
app.set('view engine', 'ejs')
app.use(cookiParser())
app.use(bodyParser.json());
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

//Routerlar
app.use('/admin',adminRouter);


app.listen(3000,()=>{
    console.log('server running');
})