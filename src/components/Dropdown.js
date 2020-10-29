import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLogout } from "../actions/auth";
import Icon from "./icons/Icon";
import useCloseOnClickOutside from "../hooks/useCloseOnClickOutside";

const Dropdown = ({ setShowDropdown }) => {
    const dispatch = useDispatch();

    const dropdownRef = useRef();

    useCloseOnClickOutside(dropdownRef, setShowDropdown);

    const handleLogout = () => {
        dispatch(startLogout());
    };

    return (
        <div ref={dropdownRef} className="dropdown">
            <ul className="dropdown__options">
                <Link to="/articles" onClick={() => setShowDropdown(false)}>
                    <li className="dropdown__option">
                        <Icon iconName={"document"} className={"dropdown__icon"} />
                        <span className="dropdown__option-text">My Articles</span>
                    </li>
                </Link>
                <Link to="/profile" onClick={() => setShowDropdown(false)}>
                    <li className="dropdown__option">
                        <Icon iconName={"user"} className={"dropdown__icon"} />
                        <span>My Profile</span>
                    </li>
                </Link>
                <li className="dropdown__option cursor-pointer" onClick={handleLogout}>
                    <Icon iconName={"logout"} className={"dropdown__icon"} />
                    <span>Log Out</span>
                </li>
            </ul>
        </div>
    );
};

export default Dropdown;
