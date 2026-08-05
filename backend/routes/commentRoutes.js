const commentController = require("../controllers/commentController.js")
const router = require("express").Router({ mergeParams: true });

router.post("/comment", commentController.createComment)

router.get("/comment/:id", commentController.getCommentById)

router.get("/comments", commentController.getAllComments)

router.patch("/comment/:id", commentController.updateCommentById)

router.delete("/comment/:id", commentController.deleteCommentById)

module.exports = router;