const articleController = require("../controllers/articleController.js")
const router = require("express").Router();

router.post("/", articleController.createArticle)

router.get("/:id", articleController.getArticleById)

router.patch("/:id", articleController.updateArticleById)

router.delete("/:id", articleController.deleteArticleById)

module.exports = router;