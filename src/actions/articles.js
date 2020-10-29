import { db } from "../firebase/firebase";
import { createAuthorArticle, saveAuthorArticle, deleteAuthorArticle } from "./authorArticles";

export const setArticles = (articles) => ({
  type: "SET_ARTICLES",
  articles,
});

export const createArticle = (article) => ({
  type: "CREATE_ARTICLE",
  article,
});

export const addArticle = (article) => ({
  type: "ADD_ARTICLE",
  article,
});

export const startCreateArticle = () => {
  return (dispatch, getState) => {
    const authorId = getState().auth.authorId;
    const authorName = getState().auth.authorName;
    const articleTimeCreated = Date.now();
    const article = {
      authorId,
      articleTimeCreated,
      articleIsPublished: false,
      authorName,
      articleTitle: "",
    };

    return db
      .collection("articles")
      .add(article)
      .then((snapshot) => {
        const articleId = snapshot.id;

        dispatch(
          createAuthorArticle({
            articleId,
            ...article,
          })
        );

        return articleId;
      });
  };
};

export const saveArticle = ({ articleId, articleUpdates }) => ({
  type: "SAVE_ARTICLE",
  articleId,
  articleUpdates,
});

export const startSaveArticle = ({ articleId, articleUpdates }, operation) => {
  return (dispatch) => {
    return db
      .collection("articles")
      .doc(articleId)
      .update(articleUpdates)
      .then(() => {
        dispatch(saveAuthorArticle({ articleId, articleUpdates }));
        dispatch(saveArticle({ articleId, articleUpdates }));

        if (operation === "saved") return operation;
        if (operation === "published" && articleUpdates.articleIsPublished === true) return "published";
        if (operation === "published" && articleUpdates.articleIsPublished === false) return "unpublished";
      })
      .catch(() => {
        return "failed";
      });
  };
};

export const deleteArticle = (articleId) => ({
  type: "DELETE_ARTICLE",
  articleId,
});

export const startDeleteArticle = (articleId) => {
  return (dispatch) => {
    db.collection("articles")
      .doc(articleId)
      .delete()
      .then(() => {
        dispatch(deleteArticle(articleId));
        dispatch(deleteAuthorArticle(articleId));
      });
  };
};

export const setLastVisibleArticle = (lastVisibleArticle) => ({
  type: "SET_LAST_VISIBLE_ARTICLE",
  lastVisibleArticle,
});
