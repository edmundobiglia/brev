import { RichUtils, getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
//
const useEditorUtils = (editorState, setEditorState, setSelectionPosition, promptForLink, handleSaveArticle) => {
  const keyBindingFunction = (e) => {
    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.keyCode === 88) {
      return "strikethrough";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.keyCode === 72) {
      return "highlight";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.keyCode === 81) {
      return "blockquote";
    }
    if (KeyBindingUtil.hasCommandModifier(e) && e.shiftKey && e.keyCode === 75) {
      return "add-link";
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command) => {
    let newEditorState = RichUtils.handleKeyCommand(editorState, command);

    if (!newEditorState && command === "strikethrough") {
      newEditorState = RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH");
    }
    if (!newEditorState && command === "highlight") {
      newEditorState = RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT");
    }
    if (!newEditorState && command === "blockquote") {
      newEditorState = RichUtils.toggleBlockType(editorState, "blockquote");
    }
    if (!newEditorState && command === "add-link") {
      setSelectionPosition(window.getSelection().getRangeAt(0).getBoundingClientRect());
      promptForLink();
    }
    if (newEditorState) {
      setEditorState(newEditorState);
      return "handled";
    }
    return "not-handled";
  };

  // CLASSES DOS BLOCOS
  const blockStyleFunction = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === "blockquote") {
      return "block-style__blockquote";
    }
    if (type === "unstyled") {
      return "block-style__paragraph";
    }
    if (type === "header-one") {
      return "block-style__h1";
    }
    if (type === "header-two") {
      return "block-style__h2";
    }
    if (type === "header-three") {
      return "block-style__h3";
    }
    if (type === "header-three") {
      return "block-style__h3";
    }
    if (type === "unordered-list-item") {
      return "block-style__unordered-list-item";
    }
    if (type === "ordered-list-item") {
      return "block-style__ordered-list-item";
    }
  };

  const customStyleMap = {
    HIGHLIGHT: {
      background: "#c8bcff",
      color: "#414141",
      padding: "1.5px",
    },
  };

  return { keyBindingFunction, handleKeyCommand, blockStyleFunction, customStyleMap };
};

export default useEditorUtils;
