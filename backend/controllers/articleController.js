
const {Article} = require("../models");


async function createArticle(req, res){
    try
    {
        const {title,content} = req.body;

        if(title == null || content == null)
            return res.status(400).json({error:"title и content являются обязательными параметрами"})
        
        const article = await Article.create({title, content});
        return res.status(201).json(article);
    }
    catch(error)
    {
        return res.status(400).json({ error: error.message });
    }
}

async function getArticleById(req, res){
    try{
        const {id} = req.params;
        if (!Number.isInteger(Number(id))) 
            return res.status(400).json({ error: "ID должен быть целым числом" });

        const article = await Article.findByPk(id);

        if(!article)
            return res.status(404).json({error: "Статья не найдена"});

        return res.status(200).json(article);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

async function getAllArticles(req, res){
    try{
        const articles = await Article.findAll(
        {
            order: [
                ['createdAt', 'DESC'],
                ['id', 'DESC'],
            ],
        });
        return res.status(200).json(articles);

    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

async function updateArticleById(req, res){
    try{
        const {id} = req.params;
        if (!Number.isInteger(Number(id))) 
            return res.status(400).json({ error: "ID должен быть целым числом" });

        const {title,content} = req.body
        const article = await Article.findByPk(id);

        if(!article)
            return res.status(404).json({error: "Статья не найдена"});
        await article.update({title, content})
        return res.status(200).json(article);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

async function deleteArticleById(req, res){
    try{
        const {id} = req.params;
        if (!Number.isInteger(Number(id))) 
            return res.status(400).json({ error: "ID должен быть целым числом" });
        const article = await Article.findByPk(id);

        if(!article)
            return res.status(404).json({error: "Статья не найдена"});

        await article.destroy();
        return res.sendStatus(204);
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createArticle,
    getArticleById,
    getAllArticles,
    updateArticleById,
    deleteArticleById
};