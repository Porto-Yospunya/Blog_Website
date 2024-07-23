const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurifier = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurifier(new JSDOM().window)

// set variable article 
const articlesSchema = new mongoose.Schema({
    // set title
    title: {
        type: String,
        required: true
    },
    // set description
    description: {
        type: String,
    },
    // set markdown
    markdown: {
        type: String,
        required: true
    },
    // set date
    createdAt: {
        type: Date,
        default: Date.now
    },
    // path in url
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    // html in mardown
    sanitizedHtml: {
        type: String,
        required: true
    }
})

// set variable in article
articlesSchema.pre('validate', function(next) {
    // check title parse slug
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    // make markdown to sanitizedHtml
    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown))
    }

    next()
})
 
// add data in mongoDB
module.exports = mongoose.model('Article', articlesSchema)