const express = require('express')
const router = express.Router()

const Article = require('./../models/article')

// go to new page
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() }) // render new article
})

// go to edit page and set variable in form
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id) // check id in article
    res.render('articles/edit', { article: article }) // render article and set variable
})

// show article (read more)
router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({ slug: req.params.slug })  // find one article
    if (article == null) res.redirect('/') // if article equals null is go to main path
    res.render('articles/show', { article: article }) // render show article (in read more)
})

// add new article
router.post('/', async (req, res, next) => {
    req.article = new Article() // new article
    next()
}, saveArticleAndRedirect('new')) 

// edit article
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id) // check id in article
    next()
}, saveArticleAndRedirect('edit'))

// delete article
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id) // check id in article
    res.redirect('/') // go to main path
})

// function save and edit
function saveArticleAndRedirect(path) {
    return async (req, res) => {
        // set article title, description and markdown
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        // check error
        try {
            // add successful
            article = await article.save() // save article
            res.redirect(`/articles/${article.slug}`) // go to slug path
        } catch (e) {
            res.render(`articles/${path}`, { article: article })
        }
    }
}

// export router
module.exports = router