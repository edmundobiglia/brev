import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

const Modal = ({ visibilityState, setVisibilityState, children }) => {
    const modalRef = useRef();

    return (
        <CSSTransition in={visibilityState} timeout={200} classNames="CSSTransition" mountOnEnter unmountOnExit>
            <div
                className="modal"
                ref={modalRef}
                onClick={(e) => {
                    if (e.target === modalRef.current) setVisibilityState(false);
                }}
            >
                <div className="modal__box">{children}</div>
            </div>
        </CSSTransition>
    );
};

export default Modal;
