import React from "react";
import { RichUtils } from "draft-js";
import Icon from "./icons/Icon";

const StylesToolbar = ({
  editorState,
  setEditorState,
  buttonClassName,
  iconClassName,
  setSelectionPosition,
  promptForLink,
  showUrlPrompt,
}) => {
  const toggleInlineStyles = (e) => {
    e.preventDefault();
    const style = e.currentTarget.getAttribute("data-style");
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (e) => {
    e.preventDefault();
    let block = e.currentTarget.getAttribute("data-style");
    setEditorState(RichUtils.toggleBlockType(editorState, block));
  };

  return (
    <div className="editor__styles-container">
      <button key="BOLD" className={buttonClassName} data-style="BOLD" onMouseDown={toggleInlineStyles}>
        <Icon iconName="bold" className={iconClassName} />
      </button>
      <button key="ITALIC" className={buttonClassName} data-style="ITALIC" onMouseDown={toggleInlineStyles}>
        <Icon iconName="italic" className={iconClassName} />
      </button>
      <button key="UNDERLINE" className={buttonClassName} data-style="UNDERLINE" onMouseDown={toggleInlineStyles}>
        <Icon iconName="underline" className={iconClassName} />
      </button>
      <button
        key="STRIKETHROUGH"
        className={buttonClassName}
        data-style="STRIKETHROUGH"
        onMouseDown={toggleInlineStyles}
      >
        <Icon iconName="strikethrough" className={iconClassName} />
      </button>
      <button key="header-one" className={buttonClassName} data-style="header-one" onMouseDown={toggleBlockType}>
        <Icon iconName="header-one" className={iconClassName} />
      </button>
      <button key="header-two" className={buttonClassName} data-style="header-two" onMouseDown={toggleBlockType}>
        <Icon iconName="header-two" className={iconClassName} />
      </button>
      <button key="header-three" className={buttonClassName} data-style="header-three" onMouseDown={toggleBlockType}>
        <Icon iconName="header-three" className={iconClassName} />
      </button>
      <button
        key="link"
        className={buttonClassName}
        data-style="link"
        onClick={promptForLink}
        onMouseDown={() =>
          !showUrlPrompt && setSelectionPosition(window.getSelection().getRangeAt(0).getBoundingClientRect())
        }
      >
        <Icon iconName="link" className={iconClassName} />
      </button>
      <button key="HIGHLIGHT" className={buttonClassName} data-style="HIGHLIGHT" onMouseDown={toggleInlineStyles}>
        <Icon iconName="highlight" className={iconClassName} />
      </button>
      <button key="blockquote" className={buttonClassName} data-style="blockquote" onMouseDown={toggleBlockType}>
        <Icon iconName="blockquote" className={iconClassName} />
      </button>
      <button
        key="unordered-list-item"
        className={buttonClassName}
        data-style="unordered-list-item"
        onMouseDown={toggleBlockType}
      >
        <Icon iconName="unordered-list" className={iconClassName} />
      </button>
      <button
        key="ordered-list-item"
        className={buttonClassName}
        data-style="ordered-list-item"
        onMouseDown={toggleBlockType}
      >
        <Icon iconName="ordered-list" className={iconClassName} />
      </button>
      {/*<button key="image" className={buttonClassName} data-style="image" onMouseDown={toggleBlockType}>
                <Icon iconName="image" className={iconClassName} />
            </button> */}
    </div>
  );
};

export default React.memo(StylesToolbar);
