export const setAuthorArticles = (articles) => ({
    type: "SET_AUTHOR_ARTICLES",
    articles,
});

export const createAuthorArticle = (article) => ({
    type: "CREATE_AUTHOR_ARTICLE",
    article,
});

export const saveAuthorArticle = ({ articleId, articleUpdates }) => ({
    type: "SAVE_AUTHOR_ARTICLE",
    articleId,
    articleUpdates,
});

export const deleteAuthorArticle = (articleId) => ({
    type: "DELETE_AUTHOR_ARTICLE",
    articleId,
});

export const setAuthorLastVisibleArticle = (lastVisibleArticle) => ({
    type: "SET_AUTHOR_LAST_VISIBLE_ARTICLE",
    lastVisibleArticle,
});
