import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Editor, EditorState, convertFromRaw, CompositeDecorator } from "draft-js";
import moment from "moment";
import NotFoundPage from "./NotFoundPage";
import { db } from "../../firebase/firebase";
import Footer from "../Footer";
import Loader from "../Loader";
import { useLinkPlugin } from "../draftjs-plugins/linkPlugin";
import useEditorUtils from "../../hooks/useEditorUtils";

const ReadArticlePage = (props) => {
  const { linkPlugin } = useLinkPlugin();

  const linkDecorator = new CompositeDecorator(linkPlugin.decorators);

  const { blockStyleFunction, customStyleMap } = useEditorUtils();

  const articleId = props.match.params.articleId;

  const [articleData, setArticleData] = useState(
    useSelector((state) => state.articles.articles.find((article) => article.articleId === articleId))
  );

  const [editorState, setEditorState] = useState(
    articleData && articleData.articleContent
      ? EditorState.createWithContent(convertFromRaw(articleData.articleContent), linkDecorator)
      : EditorState.createEmpty()
  );

  useEffect(() => {
    if (articleData) {
      document.title = articleData.articleTitle;
    } else {
      db.collection("articles")
        .doc(articleId)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setArticleData(snapshot.data());
            document.title = snapshot.data().articleTitle;

            setEditorState(
              EditorState.createWithContent(convertFromRaw(snapshot.data().articleContent), linkDecorator)
            );
          } else {
            setArticleData(null);
          }
        })
        .catch(() => {
          setArticleData(null);
        });
    }

    return () => {
      document.title = "BREV";
    };
  }, []);

  if (articleData === undefined) {
    return (
      <div className="container container--center-x-y">
        <Loader />
      </div>
    );
  }

  if (articleData === null) {
    return <NotFoundPage />;
  }

  return (
    <>
      <div className="read-article-page">
        <div className="read-article-page__inner-container container container--900">
          <div className="read-article-page__article-info">
            <h1 className="read-article-page__title">{articleData.articleTitle}</h1>
            <p className="read-article-page__metadata">
              <img
                className="article-listing-page__author-photo"
                src={articleData.authorPhoto}
                alt={articleData.authorName}
              />
              <Link to={`/author/${articleData.authorId}`}>
                <span className="read-article-page__author-name">{articleData.authorName}</span>
              </Link>
              <span className="read-article-page__article-date">
                {moment(articleData.articleTimePublished).format("MM[/]DD[/]YYYY")}
              </span>
            </p>
          </div>

          <div className="editor">
            <Editor
              editorState={editorState}
              onChange={setEditorState}
              readOnly={true}
              blockStyleFn={blockStyleFunction}
              customStyleMap={customStyleMap}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReadArticlePage;
