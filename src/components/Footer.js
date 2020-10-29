import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { login, startLogout } from "../actions/auth";

const Footer = () => {
  const dispatch = useDispatch();

  const isSignedIn = useSelector((state) => !!state.auth.authorId);
  return (
    <footer className="footer">
      <div className="footer__inner-container container container--1200">
        <div className="footer__copyright">BREV &copy; {moment().format("YYYY")} All rights reserved.</div>
        <ul className="footer__nav">
          <Link to="/" className="footer__nav-item">
            <li>HOME</li>
          </Link>
          <a
            href="https://github.com/edmundobiglia/brev"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__nav-item"
          >
            <li className="footer__nav-item">GITHUB</li>
          </a>

          <li
            className="footer__nav-item"
            onClick={() => {
              if (isSignedIn) {
                dispatch(startLogout());
              } else {
                login();
              }
            }}
          >
            {isSignedIn ? "SIGN OUT" : "SIGN IN"}
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
