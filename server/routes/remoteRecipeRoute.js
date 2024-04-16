const express = require('express')
const router = express.Router()
const remoteRecipeController = require('../controller/remoteRecipeController')

router.get('/recipes',remoteRecipeController.randomRecipes)

module.exports = router;

