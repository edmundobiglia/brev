import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startCreateArticle } from "../../actions/articles";
import TextEditor from "../TextEditor";
import Loader from "../Loader";

const CreateArticlePage = () => {
    const [articleId, setArticleId] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startCreateArticle()).then((articleId) => {
            setArticleId(articleId);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return !articleId ? (
        <div className="creating-article">
            <p>Creating article...</p>
            <Loader />
        </div>
    ) : (
        <div className="editor-page container container--900">
            <TextEditor articleId={articleId} />
        </div>
    );
};

export default CreateArticlePage;
