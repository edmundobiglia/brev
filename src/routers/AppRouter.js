import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import ScrollToTop from "./ScrollToTop";
import PrivateRoute from "./PrivateRoute";
import Header from "../components/Header";
import MyArticlesPage from "../components/pages/MyArticlesPage";
import CreateArticlePage from "../components/pages/CreateArticlePage";
import EditArticlePage from "../components/pages/EditArticlePage";
import NotFoundPage from "../components/pages/NotFoundPage";
import AuthorProfilePage from "../components/pages/AuthorProfilePage";
import ArticleListingPage from "../components/pages/ArticleListingPage";
import ReadArticlePage from "../components/pages/ReadArticlePage";
import AuthorArticleListingPage from "../components/pages/AuthorArticleListingPage";

export const history = createBrowserHistory();

const AppRouter = () => {
  return (
    <Router history={history}>
      <div>
        <Header />
        <div className="container--routes">
          <ScrollToTop />
          <Switch>
            <Route path="/" component={ArticleListingPage} exact={true} />
            <Route path="/read/:articleId" component={ReadArticlePage} exact={true} />
            <Route
              path="/author/:authorId"
              component={AuthorArticleListingPage}
              exact={true}
            />
            <PrivateRoute path="/articles" component={MyArticlesPage} />
            <PrivateRoute path="/write" component={CreateArticlePage} />
            <PrivateRoute path="/edit/:articleId" component={EditArticlePage} />
            <PrivateRoute path="/profile" component={AuthorProfilePage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;
