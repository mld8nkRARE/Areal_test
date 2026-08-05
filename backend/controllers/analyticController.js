const { Article, Comment } = require("../models");
const { Op } = require("sequelize");

async function getAllCommentsOverSpecificPeriod(req, res) {
    try {
        let { dateFrom, dateTo } = req.query;

        if (!dateFrom || !dateTo) {
            return res.status(400).json({ error: "dateFrom и dateTo обязательны" });
        }

        const rawFrom = dateFrom;
        const rawTo = dateTo;

        dateFrom = new Date(rawFrom);
        dateTo = new Date(rawTo);

        if (isNaN(dateFrom.getTime())) {
            dateFrom = new Date(Number(rawFrom));
        }
        if (isNaN(dateTo.getTime())) {
            dateTo = new Date(Number(rawTo));
        }

        if (isNaN(dateFrom.getTime()) || isNaN(dateTo.getTime())) {
            return res.status(400).json({ error: "Некорректный формат даты" });
        }

        let comments;
        try {
            comments = await Comment.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [dateFrom, dateTo]
                    }
                },
                include: [{
                    model: Article,
                    as: "article",
                    attributes: ["id", "title"]
                }]
            });
        } catch (error) {
            return res.status(400).json({ error: "Ошибка запроса к БД" });
        }

        const grouped = {};
        comments.forEach(comment => {
            const articleId = comment.articleId;
            if (!grouped[articleId]) {
                grouped[articleId] = {
                    article: comment.article,
                    comments: []
                };
            }
            grouped[articleId].comments.push(comment);
        });

        return res.status(200).json(Object.values(grouped));
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllCommentsOverSpecificPeriod };