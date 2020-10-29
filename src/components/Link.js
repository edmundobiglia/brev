import React from "react";

const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} className="block-style__a" rel="noopener noreferrer" target="_blank">
            {props.children}
        </a>
    );
};

export default Link;
