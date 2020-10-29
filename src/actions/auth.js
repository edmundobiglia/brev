import { firebase, db, googleAuthProvider } from "../firebase/firebase";

export const login = () => firebase.auth().signInWithPopup(googleAuthProvider);

export const logout = () => ({
  type: "LOGOUT",
});

const emptyAuthorArticles = () => ({
  type: "EMPTY_AUTHOR_ARTICLES",
});

export const startLogout = () => {
  return (dispatch) => {
    dispatch(emptyAuthorArticles());
    return firebase.auth().signOut();
  };
};

const setAuthorProfile = ({ authorId, authorName, authorPhoto, authorBio }) => ({
  type: "SET_AUTHOR_PROFILE",
  authorId,
  authorName,
  authorPhoto,
  authorBio,
});

export const startSetAuthorProfile = ({ authorId, authorName, authorPhoto }) => {
  return (dispatch) => {
    return db
      .collection("authors")
      .doc(authorId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const { authorName, authorPhoto, authorBio } = doc.data();
          const authorProfile = {
            authorId,
            authorName,
            authorPhoto,
            authorBio,
          };
          dispatch(setAuthorProfile(authorProfile));
        } else {
          db.collection("authors").doc(authorId).set({
            authorName,
            authorPhoto,
            authorBio: "",
          });
          const authorProfile = {
            authorId,
            authorName,
            authorPhoto,
            authorBio: "",
          };
          dispatch(setAuthorProfile(authorProfile));
        }
      });
  };
};

const updateAuthorProfile = (authorProfileUpdates) => ({
  type: "UPDATE_AUTHOR_PROFILE",
  authorProfileUpdates,
});

export const startUpdateAuthorProfile = (authorProfileUpdates) => {
  return (dispatch, getState) => {
    const authorId = getState().auth.authorId;
    return db
      .collection("authors")
      .doc(authorId)
      .update(authorProfileUpdates)
      .then(() => {
        dispatch(updateAuthorProfile(authorProfileUpdates));
        return "updated";
      })
      .catch(() => {
        return "failed";
      });
  };
};

const deleteAuthorProfile = () => ({
  type: "DELETE_AUTHOR_PROFILE",
});

export const startDeleteAuthorProfile = () => {
  return (dispatch, getState) => {
    const authorId = getState().auth.authorId;
    return db
      .collection("authors")
      .doc(authorId)
      .delete()
      .then(() => {
        dispatch(deleteAuthorProfile());

        firebase.auth().signOut();
      });
  };
};
