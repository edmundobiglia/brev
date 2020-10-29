import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const ArticleListItem = ({ article, lastArticleRef }) => {
  const createArticleExcerpt = (article, wordNumber) => {
    return article.articleContent.blocks[0].text.split(" ").splice(0, wordNumber).join(" ") + "...";
  };

  return (
    <li className="article-listing-page__list-item" ref={lastArticleRef ? lastArticleRef : null}>
      <h1 className="article-listing-page__article-title">
        {" "}
        <Link to={`/read/${article.articleId}`}>{article.articleTitle}</Link>
      </h1>
      <p className="article-listing-page__metadata">
        <img className="article-listing-page__author-photo" src={article.authorPhoto} alt={article.authorName} />
        <span className="article-listing-page__author-name">
          <Link to={`/author/${article.authorId}`}>{article.authorName}</Link>
        </span>
        <span className="article-listing-page__article-date">
          {moment(article.articleTimePublished).format("MM[/]DD[/]YYYY")}
        </span>
      </p>
      <p className="article-listing-page__paragraph">{createArticleExcerpt(article, 30)}</p>
      <Link to={`/read/${article.articleId}`}>
        <button className="button">READ MORE</button>
      </Link>
    </li>
  );
};

export default ArticleListItem;
