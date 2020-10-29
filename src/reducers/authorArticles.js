export default (
  state = {
    lastVisibleArticle: null,
    articles: [],
  },
  action
) => {
  switch (action.type) {
    case "SET_AUTHOR_ARTICLES":
      return {
        lastVisibleArticle: state.lastVisibleArticle,
        articles: action.articles,
      };
    case "CREATE_AUTHOR_ARTICLE":
      return {
        lastVisibleArticle: state.lastVisibleArticle,
        articles: [action.article, ...state.articles],
      };
    case "SAVE_AUTHOR_ARTICLE":
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
    case "DELETE_AUTHOR_ARTICLE":
      return {
        lastVisibleArticle: state.lastVisibleArticle,
        articles: state.articles.filter((article) => article.articleId !== action.articleId),
      };
    case "SET_AUTHOR_LAST_VISIBLE_ARTICLE":
      return {
        lastVisibleArticle: action.lastVisibleArticle,
        articles: state.articles,
      };
    case "EMPTY_AUTHOR_ARTICLES":
      return {
        lastVisibleArticle: null,
        articles: [],
      };
    default:
      return state;
  }
};
