import { RichUtils } from "draft-js";
import Link from "../Link";
import { Modifier } from "draft-js";

// LINK CODE
const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
    }, callback);
};

export const useLinkPlugin = (
    EditorState,
    editorState,
    setEditorState,
    showUrlPrompt,
    setShowUrlPrompt,
    url,
    setUrl
) => {
    const promptForLink = () => {
        if (showUrlPrompt) {
            setShowUrlPrompt(false);
            setUrl("");
            return;
        }

        const contentState = editorState.getCurrentContent();
        const startKey = editorState.getSelection().getStartKey();
        const startOffset = editorState.getSelection().getStartOffset();
        const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
        const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
        let url = "";
        if (linkKey) {
            const linkInstance = contentState.getEntity(linkKey);
            url = linkInstance.getData().url;
        }
        setShowUrlPrompt(true);
        setUrl(url);
    };

    const confirmLink = () => {
        const selection = editorState.getSelection();
        if (selection.isCollapsed()) {
            setShowUrlPrompt(false);
            setUrl("");
            return;
        }
        const contentState = editorState.getCurrentContent();
        const contentStateWithLinkEntity = contentState.createEntity("LINK", "MUTABLE", {
            url,
        });
        const entityKey = contentStateWithLinkEntity.getLastCreatedEntityKey();
        let newEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithLinkEntity,
        });
        setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
        setShowUrlPrompt(false);
        setUrl("");
    };

    const removeLink = () => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const startKey = selectionState.getStartKey();
        const contentBlock = contentState.getBlockForKey(startKey);
        const startOffset = selectionState.getStartOffset();
        const entity = contentBlock.getEntityAt(startOffset);

        if (!entity) {
            return editorState;
        }

        let entitySelection = null;

        contentBlock.findEntityRanges(
            (character) => character.getEntity() === entity,
            (start, end) => {
                entitySelection = selectionState.merge({
                    anchorOffset: start,
                    focusOffset: end,
                });
            }
        );

        const newContentState = Modifier.applyEntity(contentState, entitySelection, null);

        const newEditorState = EditorState.push(editorState, newContentState, "apply-entity");

        setEditorState(newEditorState);
        setShowUrlPrompt(false);
        setUrl("");
        
    };

    const linkPlugin = {
        decorators: [
            {
                strategy: findLinkEntities,
                component: Link,
            },
        ],
    };

    return { promptForLink, confirmLink, removeLink, linkPlugin };
};
