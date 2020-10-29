import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ExpandableTextarea from "../ExpandableTextarea";
import { startUpdateAuthorProfile, startDeleteAuthorProfile } from "../../actions/auth";
import Icon from "../icons/Icon";
import Modal from "../Modal";
import Snackbar from "../Snackbar";
import Loader from "../Loader";

const AuthorProfilePage = () => {
  const dispatch = useDispatch();
  const authorData = useSelector((state) => state.auth);
  const [authorName, setAuthorName] = useState(authorData.authorName);
  const [authorBio, setAuthorBio] = useState(authorData.authorBio);
  const [profileUpdated, setProfileUpdated] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [parentDebouncer, setParentDebouncer] = useState(null);

  useEffect(() => {
    if (profileUpdated) {
      setTimeout(() => {
        setProfileUpdated(false);
      }, 3000);
    }
  }, [profileUpdated]);

  const handleUpdateAuthorProfile = () => {
    setSnackbarVisibility(true);

    if (!parentDebouncer) {
      setParentDebouncer(true);

      dispatch(startUpdateAuthorProfile({ authorName, authorBio })).then((status) => {
        setUpdateStatus(status);

        setParentDebouncer(
          setTimeout(() => {
            setSnackbarVisibility(false);

            setTimeout(() => {
              setUpdateStatus("");
            }, 250);

            setParentDebouncer(null);
          }, 3000)
        );
      });
    }
  };

  const handleDeleteAuthorProfile = () => {
    dispatch(startDeleteAuthorProfile());
  };

  return (
    <>
      <Modal visibilityState={deleteConfirmation} setVisibilityState={setDeleteConfirmation}>
        <Icon iconName="delete" className="modal__icon" />

        <p className="modal__message">Are you sure you want to delete your profile?</p>

        <div className="button__container">
          <button className="button" onClick={() => setDeleteConfirmation(false)}>
            CANCEL
          </button>

          <button className="button button--transparent" onClick={handleDeleteAuthorProfile}>
            DELETE
          </button>
        </div>
      </Modal>

      <Snackbar visibilityState={snackbarVisibility}>
        {updateStatus ? (
          <>
            <Icon iconName="checkmark" className="snackbar__icon" />{" "}
            <span>{updateStatus === "updated" ? "Profile updated." : "Error updating. Try again."}</span>
          </>
        ) : (
          <Loader />
        )}
      </Snackbar>

      <div className="author-profile-page container container--900">
        <div className="author-profile-page__inner-container">
          <figure
            className="author-profile-page__photo"
            style={{ backgroundImage: `url('${authorData.authorPhoto}')` }}
          ></figure>

          <input
            className="author-profile-page__author-name"
            placeholder="Author Name"
            value={authorName}
            maxLength="30"
            onChange={(e) => {
              setAuthorName(e.target.value);
              e.target.style.width = "auto";
              e.target.style.width = e.target.scrollWidth + "px";
            }}
          />

          <ExpandableTextarea
            id="author-bio"
            className="author-profile-page__author-bio"
            placeholder="Up to 2000 characters"
            value={authorBio}
            setState={setAuthorBio}
            hasFocus={false}
            maxLength={2000}
          />

          <div className="button__container">
            <button className="button" onClick={handleUpdateAuthorProfile}>
              Update Profile
            </button>

            <button className="button button--transparent" onClick={() => setDeleteConfirmation(true)}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthorProfilePage;
