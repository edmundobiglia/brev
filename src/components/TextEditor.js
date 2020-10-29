import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";
import { startSaveArticle, startDeleteArticle, addArticle } from "../actions/articles";
import ExpandableTextarea from "./ExpandableTextarea";
import StylesToolbar from "./StylesToolbar";
import useEditorUtils from "../hooks/useEditorUtils";
import UrlPrompt from "./UrlPrompt";
import { useLinkPlugin } from "./draftjs-plugins/linkPlugin";
import Icon from "./icons/Icon";
import Loader from "./Loader";
import Modal from "./Modal";
import Snackbar from "./Snackbar";

const TextEditor = ({ articleData, articleId }) => {
  const [articleTitle, setArticleTitle] = useState(articleData ? articleData.articleTitle : "");
  const [editorState, setEditorState] = useState(
    articleData && articleData.articleContent
      ? EditorState.createWithContent(convertFromRaw(articleData.articleContent))
      : EditorState.createEmpty()
  );
  const [publishError, setPublishError] = useState(false);
  const [isPublished, setIsPublished] = useState(articleData ? articleData.articleIsPublished : false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [showUrlPrompt, setShowUrlPrompt] = useState(false);
  const [url, setUrl] = useState("");
  const [selectionPosition, setSelectionPosition] = useState(null);
  const dispatch = useDispatch();
  const editorRef = useRef();
  const history = useHistory();
  const { authorPhoto } = useSelector((state) => state.auth);

  const { promptForLink, confirmLink, removeLink, linkPlugin } = useLinkPlugin(
    EditorState,
    editorState,
    setEditorState,
    showUrlPrompt,
    setShowUrlPrompt,
    url,
    setUrl
  );

  const { keyBindingFunction, handleKeyCommand, blockStyleFunction, customStyleMap } = useEditorUtils(
    editorState,
    setEditorState,
    setSelectionPosition,
    promptForLink
  );

  const [plugins] = useState([linkPlugin]);

  const setEditorFocus = () => editorRef.current.focus();

  const saveArticle = (updates = {}, operation) => {
    setSnackbarVisibility(true);

    const contentState = editorState.getCurrentContent();

    dispatch(
      startSaveArticle(
        {
          articleId,
          articleUpdates: {
            articleId,
            authorPhoto,
            articleTitle: articleTitle,
            articleContent: convertToRaw(contentState),
            ...updates,
          },
        },
        operation
      )
    ).then((status) => {
      clearTimeout(
        setTimeout(() => {
          setSnackbarVisibility(false);

          setTimeout(() => {
            setUpdateStatus("");
          }, 250);
        }, 2000)
      );

      setUpdateStatus(status);

      setTimeout(() => {
        setSnackbarVisibility(false);

        setTimeout(() => {
          setUpdateStatus("");
        }, 250);
      }, 2000);
    });
  };

  const handleSaveArticle = () => {
    saveArticle({}, "saved");
  };

  useEffect(() => {
    const listenForSave = (e) => {
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        handleSaveArticle();
      }
    };

    document.addEventListener("keydown", listenForSave);

    return () => {
      document.removeEventListener("keydown", listenForSave);
    };
  }, []);

  const handleDeleteArticle = () => {
    dispatch(startDeleteArticle(articleId));
    history.push("/articles");
  };

  const handlePublishArticle = () => {
    if (!!articleTitle === false || !editorState.getCurrentContent().hasText()) {
      setPublishError(true);
      return;
    }

    saveArticle(
      {
        articleIsPublished: !isPublished,
        articleTimePublished: Date.now(),
      },
      "published"
    );

    const contentState = editorState.getCurrentContent();

    dispatch(
      addArticle({
        articleId,
        authorPhoto,
        articleTitle: articleTitle,
        articleContent: convertToRaw(contentState),
      })
    );

    setIsPublished(!isPublished);
  };

  return (
    <>
      <Snackbar visibilityState={snackbarVisibility}>
        {updateStatus ? (
          <>
            <Icon iconName="checkmark" className="snackbar__icon" /> <span>{`Article ${updateStatus}.`}</span>
          </>
        ) : (
          <Loader />
        )}
      </Snackbar>

      <Modal visibilityState={publishError} setVisibilityState={setPublishError}>
        <Icon iconName="warning" className="modal__icon" />
        <p className="modal__message">Please write something before publishing!</p>
        <button
          className="button"
          onClick={() => {
            setPublishError(false);
          }}
        >
          OK
        </button>
      </Modal>

      <Modal visibilityState={deleteConfirmation} setVisibilityState={setDeleteConfirmation}>
        <Icon iconName="delete" className="modal__icon" />
        <p className="modal__message">Are you sure you want to delete this article?</p>
        <div className="button__container">
          <button className="button" onClick={() => setDeleteConfirmation(false)}>
            CANCEL
          </button>
          <button className="button button--transparent" onClick={handleDeleteArticle}>
            DELETE
          </button>
        </div>
      </Modal>

      <div className="editor__actions-container">
        <button className="editor__action-button" onClick={handleSaveArticle}>
          <Icon iconName="save" className="editor__action-icon" />
        </button>
        <button className="editor__action-button" onClick={handlePublishArticle}>
          {isPublished ? (
            <Icon iconName="unpublish" className="editor__action-icon publish" />
          ) : (
            <Icon iconName="publish" className="editor__action-icon publish" />
          )}
        </button>
        <button
          className="editor__action-button editor__action-button--delete"
          onClick={() => setDeleteConfirmation(true)}
        >
          <Icon iconName="delete" className="editor__action-icon" />
        </button>
      </div>

      {showUrlPrompt && (
        <UrlPrompt
          setShowUrlPrompt={setShowUrlPrompt}
          selectionPosition={selectionPosition}
          url={url}
          setUrl={setUrl}
          confirmLink={confirmLink}
          setEditorFocus={setEditorFocus}
          removeLink={removeLink}
        />
      )}
      <div className="editor">
        <>
          <StylesToolbar
            editorState={editorState}
            setEditorState={setEditorState}
            buttonClassName="editor__style-button"
            iconClassName="editor__icon"
            showUrlPrompt={showUrlPrompt}
            setShowUrlPrompt={setShowUrlPrompt}
            selection={editorState.getSelection()}
            setSelectionPosition={setSelectionPosition}
            promptForLink={promptForLink}
          />

          <ExpandableTextarea
            className="editor__article-title"
            placeholder="Article Title"
            value={articleTitle}
            setState={setArticleTitle}
            hasFocus={true}
          />

          <div className="editor__container" onClick={setEditorFocus}>
            <Editor
              ref={editorRef}
              editorState={editorState}
              onChange={setEditorState}
              placeholder="Start writing!"
              handleKeyCommand={handleKeyCommand}
              keyBindingFn={keyBindingFunction}
              blockStyleFn={blockStyleFunction}
              customStyleMap={customStyleMap}
              plugins={plugins}
            />
          </div>
        </>
      </div>
    </>
  );
};

export default TextEditor;
