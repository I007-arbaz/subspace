const express = require('express')
const { blogSearch } = require('../controller/blogSearch')
const router = express.Router()

router.get('/blog-search', blogSearch)

module.exports = router