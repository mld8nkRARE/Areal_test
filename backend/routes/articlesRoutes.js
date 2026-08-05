const articleController = require("../controllers/articleController");
const router = require("express").Router()

router.get("/", articleController.getAllArticles)

module.exports = router;