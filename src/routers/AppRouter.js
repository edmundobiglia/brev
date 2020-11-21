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
            <Route
              path={process.env.PUBLIC_URL + "/"}
              component={ArticleListingPage}
              exact={true}
            />
            <Route
              path={process.env.PUBLIC_URL + "/read/:articleId"}
              component={ReadArticlePage}
              exact={true}
            />
            <Route
              path={process.env.PUBLIC_URL + "/author/:authorId"}
              component={AuthorArticleListingPage}
              exact={true}
            />
            <PrivateRoute
              path={process.env.PUBLIC_URL + "/articles"}
              component={MyArticlesPage}
            />
            <PrivateRoute
              path={process.env.PUBLIC_URL + "write"}
              component={CreateArticlePage}
            />
            <PrivateRoute
              path={process.env.PUBLIC_URL + "edit/:articleId"}
              component={EditArticlePage}
            />
            <PrivateRoute
              path={process.env.PUBLIC_URL + "profile"}
              component={AuthorProfilePage}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;
