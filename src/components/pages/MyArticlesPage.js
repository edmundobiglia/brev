import React, { useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { Emoji } from "emoji-mart";
import useGetArticles from "../../hooks/useGetArticles";
import { setAuthorArticles, setAuthorLastVisibleArticle } from "../../actions/authorArticles";
import Icon from "../icons/Icon";
import Loader from "../Loader";

const MyArticlesPage = () => {
  const authorId = useSelector((state) => state.auth.authorId);
  const lastAuthorVisibleArticle = useSelector((state) => state.authorArticles.lastVisibleArticle);

  const query = db
    .collection("articles")
    .orderBy("articleTimeCreated", "desc")
    .where("authorId", "==", authorId)
    .limit(4);

  const articleList = useSelector((state) => state.authorArticles.articles);

  const [loading, error, hasMore, getArticles] = useGetArticles(
    query,
    articleList,
    setAuthorArticles,
    lastAuthorVisibleArticle,
    setAuthorLastVisibleArticle
  );

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const observer = useRef();

  const lastArticleRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          getArticles();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, lastAuthorVisibleArticle, hasMore]
  );

  return (
    <div className="my-articles-page container container--900">
      <h1 className="my-articles-page__title">
        <div className="container--center-x-y">
          <Icon iconName="document" className="my-articles-page__title-icon" />
          <span>My Articles</span>
        </div>

        <Link to="/write" className="my-articles-page__new-article-button">
          <button className="button">New Article</button>
        </Link>
      </h1>

      {articleList.length === 0 ? (
        <div className="my-articles-page__no-articles">
          No articles yet. <Link to="/write">Get to writing</Link>!
        </div>
      ) : (
        <ul className="my-articles-page__article-list">
          {articleList.map((article, index, array) =>
            index === array.length - 1 ? (
              <Link
                ref={lastArticleRef}
                key={article.articleId}
                to={`/edit/${article.articleId}`}
                className="my-articles-page__item-link"
              >
                <li className="my-articles-page__article-list-item">
                  <span>{article.articleTitle ? article.articleTitle : "Untitled"}</span>
                  <Icon iconName="pencil" className="my-articles-page__item-icon" />
                </li>
              </Link>
            ) : (
              <Link key={article.articleId} to={`/edit/${article.articleId}`} className="my-articles-page__item-link">
                <li className="my-articles-page__article-list-item">
                  <span>{article.articleTitle ? article.articleTitle : "Untitled"}</span>
                  <Icon iconName="pencil" className="my-articles-page__item-icon" />
                </li>
              </Link>
            )
          )}
        </ul>
      )}

      {loading && (
        <div style={{ marginTop: "1.8rem" }}>
          <Loader />
        </div>
      )}

      {!hasMore && articleList.length > 0 && (
        <div className="my-articles-page__no-more-articles">
          You have no more articles. <Link to="/write">Change that now!</Link>{" "}
          <Emoji emoji={{ id: "pencil2" }} native={true} size={18} />
        </div>
      )}

      {error && <h1>Error</h1>}
    </div>
  );
};

export default MyArticlesPage;
