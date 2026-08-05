const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/articleRoutes");
const articlesRoutes = require("./routes/articlesRoutes");
const commentRoutes = require("./routes/commentRoutes");
const analyticRoutes = require("./routes/analyticRoutes");
const app = express();

app.use(express.json());
app.use(cors());
app.use("/article", articleRoutes);
app.use("/articles", articlesRoutes);    
app.use("/article/:articleId", commentRoutes);
app.use("/analytic", analyticRoutes);

module.exports = app