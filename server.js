/*
npm Install
=====================
npm i express
npm i mongoose
npm i methodOverride
=====================
*/

const express = require('express') // import express
// const mongoose = require('mongoose') // import mongooses
const methodOverride = require('method-override')
const path = require('path')
require('dotenv').config()

const Article = require('./models/article') // article theme
const articleRouter = require('./routues/articles') // all articles 
const connectDB = require('./connectMongo')


const app = express() 

// connect mongodb
// mongoose.connect('mongodb://localhost:27017/blog')

connectDB()

// set read folder views
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// start first display
app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' }) // sort date in article
    res.render('articles/index', { articles: articles}) // render index
})

// read pages articles
app.use('/articles', articleRouter) 

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});