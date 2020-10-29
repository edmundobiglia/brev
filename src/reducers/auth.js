export default (state = { articles: [] }, action) => {
    switch (action.type) {
        case "SET_AUTHOR_PROFILE":
            return {
                authorId: action.authorId,
                authorName: action.authorName,
                authorPhoto: action.authorPhoto,
                authorBio: action.authorBio,
                articles: [],
            };
        case "SET_AUTHOR_ARTICLES":
            return {
                ...state,
                articles: [...action.articles],
            };
        case "UPDATE_AUTHOR_PROFILE":
            return {
                ...state,
                ...action.authorProfileUpdates,
            };
        case "DELETE_AUTHOR_PROFILE":
            return {};
        case "LOGOUT":
            return {};
        default:
            return state;
    }
};
