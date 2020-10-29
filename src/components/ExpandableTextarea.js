import React, { useEffect, useRef, useState } from "react";

const ExpandableTextarea = ({ id, className, placeholder, value, setState, hasFocus, maxLength }) => {
    const ref = useRef(null);
    const [initialHeight, setInitialHeight] = useState("");

    useEffect(() => {
        setInitialHeight(ref.current.scrollHeight);
        if (hasFocus) {
            ref.current.focus();
        }
    }, []);

    const handleTitleInput = (e) => {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };

    return (
        <textarea
            id={id}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setState(e.target.value)}
            onInput={handleTitleInput}
            rows="1"
            ref={ref}
            style={{ overflow: "hidden", resize: "none", height: initialHeight }}
            maxLength={maxLength}
            onFocus={(e) => {
                e.target.value = value;
            }}
        ></textarea>
    );
};

export default React.memo(ExpandableTextarea);
