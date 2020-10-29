import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import articlesReducer from "../reducers/articles";
import authReducer from "../reducers/auth";
import authorArticlesReducer from "../reducers/authorArticles";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            articles: articlesReducer,
            auth: authReducer,
            authorArticles: authorArticlesReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};
