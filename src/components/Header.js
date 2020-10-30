import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Dropdown from "./Dropdown";
import { login } from "../actions/auth";
import Icon from "./icons/Icon";
import logo from "../images/brev_logo.svg";

const Header = () => {
  const userData = useSelector((state) => state.auth);

  const userIsLoggedIn = !!userData.authorId;
  const userPhoto = userData.authorPhoto;

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="header">
      <div className="header__inner-container container container--1200">
        <Link to="/">
          <img className="header__logo" src={logo} alt="BREV Logo" />
        </Link>

        {userIsLoggedIn ? (
          <div className="header__dropdown-container">
            <figure
              className="header__profile-picture"
              style={{ backgroundImage: `url('${userPhoto}')` }}
              onClick={() => setShowDropdown(!showDropdown)}
            ></figure>

            <CSSTransition in={showDropdown} timeout={200} classNames="CSSTransition" mountOnEnter unmountOnExit>
              <Dropdown setShowDropdown={setShowDropdown} />
            </CSSTransition>
          </div>
        ) : (
          <button
            className="header__login-link"
            onClick={() => {
              login();
              setShowDropdown(!showDropdown);
            }}
          >
            <Icon iconName="google" className="header__google-logo" />
            <span>Sign In</span>{" "}
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
