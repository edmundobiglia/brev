// state reducer
export default (
  state = {
    lastVisibleArticle: null,
    articles: [],
  },
  action
) => {
  switch (action.type) {
    case "SET_ARTICLES":
      return {
        lastVisibleArticle: state.lastVisibleArticle,
        articles: action.articles,
      };
    case "ADD_ARTICLE":
      return {
        articles: [...state.articles, action.article]
          .filter((article) => article.isPublished)
          .sort((a, b) => b.articleTimePublished - a.articleTimePublished),
      };
    case "CREATE_ARTICLE":
      return {
        lastVisibleArticle: state.lastVisibleArticle,
        articles: [action.article, ...state.articles],
      };
    case "SAVE_ARTICLE":
      return {
        lastVisibleArticle: state.lastVisibleArticle,
        articles: state.articles.map((article) => {
          if (article.articleId === action.articleId) {
            return {
              ...article,
              ...action.articleUpdates,
            };
          } else {
            return article;
          }
        }),
      };
    case "DELETE_ARTICLE":
      return {
        lastVisibleArticle: state.lastVisibleArticle,
        articles: state.articles.filter((article) => article.articleId !== action.articleId),
      };
    case "SET_LAST_VISIBLE_ARTICLE":
      return {
        lastVisibleArticle: action.lastVisibleArticle,
        articles: state.articles,
      };
    default:
      return state;
  }
};
