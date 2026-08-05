# Тестовое задание: Статьи

### Backend доступен на `http://localhost:3000`.
npm run dev
### Frontend доступен на `http://localhost:5173`.
npm run dev
### Статьи

| Метод | Путь                        | Тело                  | Описание             | Коды |
|-------|-----------------------------|-----------------------|----------------------|------|
| POST  | `/article/`                 | `{ title, content }`  | создать статью       | 201 / 400 |
| GET   | `/article/:id/`             | —                     | получить статью      | 200 / 404 |
| GET   | `/articles/`                | —                     | список статей        | 200 |
| PATCH | `/article/:id/`             | `{ title?, content? }`| обновить статью      | 200 / 400 / 404 |
| DELETE| `/article/:id/`             | —                     | удалить статью       | 204 / 404 |

### Комментарии

| Метод | Путь                                  | Тело        | Описание                | Коды |
|-------|---------------------------------------|-------------|-------------------------|------|
| POST  | `/article/:id/comment/`               | `{ content }` | создать комментарий | 201 / 400 / 404 |
| GET   | `/article/:id/comment/:commentId/`    | —           | получить комментарий    | 200 / 404 |
| GET   | `/article/:id/comments/`              | —           | комментарии статьи      | 200 / 404 |
| PATCH | `/article/:id/comment/:commentId/`    | `{ content }` | обновить комментарий | 200 / 400 / 404 |
| DELETE| `/article/:id/comment/:commentId/`    | —           | удалить комментарий     | 204 / 404 |

Удаление статьи удаляет её комментарии.

### Аналитика
```
GET /analytic/comments/?dateFrom=<timestamp ms>&dateTo=<timestamp ms>
```
