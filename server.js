const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routues/articles')
const app = express()
const methodOverride = require('method-override')
const Article = require('./models/article')

mongoose.connect('mongodb://localhost:27017/blog')

// set read folder views
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles})
})

// read page articles
app.use('/articles', articleRouter) 

app.listen(5000)