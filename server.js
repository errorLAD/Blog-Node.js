const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology:true, 
    useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))


app.get('/', async(req,res) => {
    const article = await Article.find().sort({ createdAt: "desc"}) 
    res.render("article/index", {  article: article})
})

app.use("/article", articleRouter)

app.listen(5000)











