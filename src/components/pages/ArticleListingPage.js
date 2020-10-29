import React, { useRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebase";
import { Emoji } from "emoji-mart";
import useGetArticles from "../../hooks/useGetArticles";
import { setArticles } from "../../actions/articles";
import { setLastVisibleArticle } from "../../actions/articles";
import ArticleListItem from "../ArticleListItem";
import Loader from "../Loader";
import Footer from "../Footer";

const ArticleListingPage = () => {
  const query = db
    .collection("articles")
    .where("articleIsPublished", "==", true)
    .orderBy("articleTimePublished", "desc")
    .limit(4);

  const lastVisibleArticle = useSelector((state) => state.articles.lastVisibleArticle);
  const articleList = useSelector((state) => state.articles.articles);

  const [loading, error, hasMore, getArticles] = useGetArticles(
    query,
    articleList,
    setArticles,
    lastVisibleArticle,
    setLastVisibleArticle
  );

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

    [loading, lastVisibleArticle, hasMore] // eslint-disable-line
  );

  useEffect(() => {
    getArticles();
  }, []); // eslint-disable-line

  return (
    <>
      <div className="article-listing-page container container--900">
        <h1 className="article-listing-page__title">LATEST STORIES</h1>

        {!loading && articleList.length === 0 && (
          <p className="article-listing-page__no-articles-message">
            <span style={{ marginRight: "5px" }}>No articles yet.</span>{" "}
            <Emoji emoji={{ id: "man-shrugging" }} native={true} size={22} />
          </p>
        )}

        <ul className="article-listing-page__article-list">
          {articleList.map((article, index, array) =>
            index === array.length - 1 ? (
              <ArticleListItem key={article.articleId} article={article} lastArticleRef={lastArticleRef} />
            ) : (
              <ArticleListItem key={article.articleId} article={article} />
            )
          )}
        </ul>

        {loading && (
          <div style={{ marginTop: "1.8rem" }}>
            <Loader />
          </div>
        )}

        {error && <h1>Error</h1>}
      </div>
      <Footer />
    </>
  );
};

export default ArticleListingPage;
