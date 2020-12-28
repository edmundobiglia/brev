import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebase";
import useGetArticles from "../../hooks/useGetArticles";
import {
  setAuthorArticles,
  setAuthorLastVisibleArticle,
} from "../../actions/authorArticles";
import ArticleListItem from "../ArticleListItem";
import Loader from "../Loader";
import Footer from "../Footer";

const AuthorArticleListingPage = ({ match }) => {
  const authorId = match.params.authorId;

  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    db.collection("authors")
      .doc(authorId)
      .get()
      .then((doc) => {
        setAuthorData(doc.data());
      });
  }, [authorId]);

  const query = db
    .collection("articles")
    .where("articleIsPublished", "==", true)
    .where("authorId", "==", authorId)
    .orderBy("articleTimePublished", "desc")
    .limit(4);

  const lastVisibleArticle = useSelector(
    (state) => state.authorArticles.lastVisibleArticle
  );
  const articleList = useSelector((state) => state.authorArticles.articles);

  const [loading, error, hasMore, getArticles] = useGetArticles(
    query,
    articleList,
    setAuthorArticles,
    lastVisibleArticle,
    setAuthorLastVisibleArticle
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
  }, [authorId]); // eslint-disable-line

  return (
    <div className="author-article-listing-page">
      <div className="author-article-listing-page__author-info container--center-x-y">
        {authorData ? (
          <div className="author-article-listing-page__inner-container container container--900 container--center-x-y">
            <figure
              className="author-article-listing-page__author-photo"
              style={{
                backgroundImage: `url(${authorData.authorPhoto})`,
              }}
            ></figure>

            <p className="author-article-listing-page__author-name">
              {authorData.authorName ? authorData.authorName : "..."}
            </p>

            <p className="author-article-listing-page__author-bio">
              {authorData.authorBio ? authorData.authorBio : "..."}
            </p>
          </div>
        ) : (
          <Loader />
        )}
      </div>

      <div
        className="author-article-listing-page__article-list article-listing-page container container--900"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {!loading && articleList.length === 0 && <p>No articles.</p>}

        <ul className="article-listing-page__article-list">
          {articleList
            .filter((article) => article.articleIsPublished)
            .map((article, index, array) =>
              index === array.length - 1 ? (
                <ArticleListItem
                  key={article.articleId}
                  article={article}
                  lastArticleRef={lastArticleRef}
                />
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
    </div>
  );
};

export default AuthorArticleListingPage;
