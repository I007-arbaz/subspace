const express = require('express');
const { blogstats } = require('../controller/blogStats');
const router = express.Router();

router.get('/blog-stats', blogstats)

module.exports = router