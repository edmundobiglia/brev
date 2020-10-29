import React from "react";
import { useSelector } from "react-redux";
import TextEditor from "../TextEditor";
import NotFoundPage from "./NotFoundPage";

const EditArticlePage = ({ match }) => {
    const articleId = match.params.articleId;

    const articleData = useSelector((state) =>
        state.authorArticles.articles.find((article) => article.articleId === articleId)
    );

    if (!articleData) {
        return <NotFoundPage />;
    }

    return (
        <div className="editor-page container container--900">
            <TextEditor articleId={articleId} articleData={articleData} />
        </div>
    );
};

export default EditArticlePage;
