import React from "react";
import Icon from "../icons/Icon";

const NotFoundPage = (props) => {
    const goBack = () => {
        props.history.goBack();
    };

    return (
        <div className="not-found-page container container--900">
            <div className="not-found-page__inner-container">
                <Icon iconName={"error404"} className={"not-found-page__icon"} />

                <h1 className="title-h1">PAGE NOT FOUND</h1>

                <div className="container--center-x-y">
                    <button className="button" onClick={goBack}>
                        GO BACK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
