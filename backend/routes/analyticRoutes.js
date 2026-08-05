const analyticController = require("../controllers/analyticController");
const router = require("express").Router();

router.get("/comments",
     analyticController.getAllCommentsOverSpecificPeriod)

module.exports = router;