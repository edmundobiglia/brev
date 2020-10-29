import React from "react";
import { CSSTransition } from "react-transition-group";

const Snackbar = ({ visibilityState, children }) => {
    return (
        <CSSTransition in={visibilityState} timeout={200} classNames="CSSTransition" mountOnEnter unmountOnExit>
            <div className="snackbar">{children}</div>
        </CSSTransition>
    );
};

export default Snackbar;
