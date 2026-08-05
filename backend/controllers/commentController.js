const {Article, Comment} = require("../models");

async function createComment(req, res){
    try{
        const {articleId} = req.params;
        const {content} = req.body || {};

        if(content == null)
            return res.status(400).json({error: "content является обязательным параметром"});

        const article = await Article.findByPk(articleId);
        if(!article)
            return res.status(404).json({error: "Статья не найдена"});

        const comment = await Comment.create({content, articleId});
        return res.status(201).json(comment);
    }
    catch(error){
        return res.status(400).json({ error: error.message });
    }
}

async function getCommentById(req, res){
    try{
        const {articleId, id} = req.params;
        if (!Number.isInteger(Number(id)) || !Number.isInteger(Number(articleId))) 
            return res.status(400).json({ error: "ID должен быть целым числом" });
        const article = await Article.findByPk(articleId);
        if(!article)
            return res.status(404).json({error: "Статья не найдена"});

        const comment = await Comment.findOne({
            where: {
                id,
                articleId
            }
        });

        if(!comment)
            return res.status(404).json({error: "Комментарий не найден"});

        return res.status(200).json(comment);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

async function getAllComments(req, res){
    try{
        const {articleId} = req.params;

        if ( !Number.isInteger(Number(articleId))) 
            return res.status(400).json({ error: "ID должен быть целым числом" });

        const article = await Article.findByPk(articleId);
        if(!article)
            return res.status(404).json({error: "Статья не найдена"});

        const comments = await Comment.findAll({
            where: {
                articleId
            },
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json(comments);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

async function updateCommentById(req, res){
    try{
        const {articleId, id} = req.params;

        if (!Number.isInteger(Number(id)) || !Number.isInteger(Number(articleId))) 
            return res.status(400).json({ error: "ID должен быть целым числом" });

        const {content} = req.body || {};

        if(content == null)
            return res.status(400).json({error: "content является обязательным параметром"});

        const article = await Article.findByPk(articleId);
        if(!article)
            return res.status(404).json({error: "Статья не найдена"});

        const comment = await Comment.findOne({
            where: {
                id,
                articleId
            }
        });

        if(!comment)
            return res.status(404).json({error: "Комментарий не найден"});

        await comment.update({content});
        return res.status(200).json(comment);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

async function deleteCommentById(req, res){
    try{
        const {articleId, id} = req.params;

        if (!Number.isInteger(Number(id)) || !Number.isInteger(Number(articleId))) 
            return res.status(400).json({ error: "ID должен быть целым числом" });
        
        const article = await Article.findByPk(articleId);
        if(!article)
            return res.status(404).json({error: "Статья не найдена"});

        const comment = await Comment.findOne({
            where: {
                id,
                articleId
            }
        });

        if(!comment)
            return res.status(404).json({error: "Комментарий не найден"});

        await comment.destroy();
        return res.sendStatus(204);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createComment,
    getCommentById,
    getAllComments,
    updateCommentById,
    deleteCommentById
};