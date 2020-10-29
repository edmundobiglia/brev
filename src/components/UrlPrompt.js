import React, { useState, useRef, useEffect } from "react";
import useCloseOnClickOutside from "../hooks/useCloseOnClickOutside";
import Icon from "./icons/Icon";

const UrlPrompt = ({ url, setUrl, setShowUrlPrompt, selectionPosition, confirmLink, setEditorFocus, removeLink }) => {
    const [{ x: left, y: top, height: elementHeight }] = useState(selectionPosition);
    const urlPrompt = useRef();
    const urlInputRef = useRef();

    useEffect(() => {
        urlInputRef.current.focus();
        return () => {
            setTimeout(() => {
                setEditorFocus();
            }, 0);
        };
    }, []);

    useCloseOnClickOutside(urlPrompt, setShowUrlPrompt);

    const setUrlPromptPosition = () => {
        const viewportWidth = document.documentElement.clientWidth;
        if (!selectionPosition) {
            return;
        }
        if (viewportWidth < 340) {
            return { width: "100%", left: 0 };
        } else if (left < viewportWidth - 300) {
            return { width: "300px", left: left + "px" };
        } else {
            return { width: "300px", right: "0px" };
        }
    };

    return (
        <div
            className="url-prompt"
            ref={urlPrompt}
            style={{
                top: `${top + elementHeight}px`,
                ...setUrlPromptPosition(),
            }}
        >
            <input
                className="url-prompt__input"
                placeholder="www.example.com"
                value={url}
                onChange={(e) => {
                    setUrl(e.target.value);
                }}
                ref={urlInputRef}
                onKeyUp={(e) => {
                    if (e.keyCode === 13) {
                        confirmLink();
                    }
                }}
            />
            <button className="url-prompt__button" onClick={confirmLink}>
                <Icon iconName="add-link" className="url-prompt__icon" />
            </button>
            <button className="url-prompt__button url-prompt__button" onClick={removeLink}>
                <Icon iconName="cross" className="url-prompt__icon" />
            </button>
        </div>
    );
};

export default UrlPrompt;
