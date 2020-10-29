import React from "react";
import User from "./User";
import Document from "./Document";
import Logout from "./Logout";
import Error404 from "./Error404";
import AddLink from "./AddLink";
import Cross from "./Cross";
import Pencil from "./Pencil";
import Bold from "./text-editor/Bold";
import Italic from "./text-editor/Italic";
import Underline from "./text-editor/Underline";
import Strikethrough from "./text-editor/Strikethrough";
import Paragraph from "./text-editor/Paragraph";
import H1 from "./text-editor/H1";
import H2 from "./text-editor/H2";
import H3 from "./text-editor/H3";
import Blockquote from "./text-editor/Blockquote";
import Link from "./text-editor/Link";
import Highlight from "./text-editor/Highlight";
import TextAlign from "./text-editor/TextAlign";
import UL from "./text-editor/UL";
import OL from "./text-editor/OL";
import Image from "./text-editor/Image";
import Google from "./Google";
import Loader from "./Loader";
import Warning from "./Warning";
import Delete from "./Delete";
import Publish from "./Publish";
import Unpublish from "./Unpublish";
import Save from "./Save";
import Checkmark from "./Checkmark";

const Icon = ({ iconName, className }) => {
    switch (iconName) {
        case "user":
            return <User className={className} />;
        case "document":
            return <Document className={className} />;
        case "logout":
            return <Logout className={className} />;
        case "error404":
            return <Error404 className={className} />;
        case "pencil":
            return <Pencil className={className} />;
        case "bold":
            return <Bold className={className} />;
        case "italic":
            return <Italic className={className} />;
        case "underline":
            return <Underline className={className} />;
        case "strikethrough":
            return <Strikethrough className={className} />;
        case "unstyled":
            return <Paragraph className={className} />;
        case "header-one":
            return <H1 className={className} />;
        case "header-two":
            return <H2 className={className} />;
        case "header-three":
            return <H3 className={className} />;
        case "blockquote":
            return <Blockquote className={className} />;
        case "link":
            return <Link className={className} />;
        case "highlight":
            return <Highlight className={className} />;
        case "text-align":
            return <TextAlign className={className} />;
        case "unordered-list":
            return <UL className={className} />;
        case "ordered-list":
            return <OL className={className} />;
        case "image":
            return <Image className={className} />;
        case "google":
            return <Google className={className} />;
        case "add-link":
            return <AddLink className={className} />;
        case "cross":
            return <Cross className={className} />;
        case "loader":
            return <Loader className={className} />;
        case "warning":
            return <Warning className={className} />;
        case "delete":
            return <Delete className={className} />;
        case "publish":
            return <Publish className={className} />;
        case "unpublish":
            return <Unpublish className={className} />;
        case "save":
            return <Save className={className} />;
        case "checkmark":
            return <Checkmark className={className} />;
        default:
            return;
    }
};

export default Icon;
