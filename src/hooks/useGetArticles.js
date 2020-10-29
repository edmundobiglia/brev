import { useState } from "react";
import { useDispatch } from "react-redux";

const useGetArticles = (firebaseQuery, articleList, setArticles, lastVisibleArticle, setLastVisibleArticle) => {
  const dispatch = useDispatch();

  const [{ loading, error, hasMore }, setState] = useState({
    loading: true,
    error: false,
    hasMore: true,
  });

  const getArticles = () => {
    setState({
      loading: true,
      error: false,
      hasMore,
    });

    const query = !lastVisibleArticle ? firebaseQuery : firebaseQuery.startAfter(lastVisibleArticle);

    query
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setState({
            hasMore: false,
            loading: false,
            error,
          });

          return;
        }

        const fetchedArticles = [];

        snapshot.docs.forEach((article) => {
          const articleId = article.id;

          const articleData = article.data();

          fetchedArticles.push({
            articleId,
            ...articleData,
          });
        });

        const lastVisible = snapshot.docs[snapshot.docs.length - 1];
        const newArticleList = [...articleList, ...fetchedArticles].sort(
          (a, b) => b.articleTimePublished - a.articleTimePublished
        );

        dispatch(setArticles(newArticleList));
        dispatch(setLastVisibleArticle(lastVisible));
        setState({
          loading: false,
          error,
          hasMore,
        });
      })
      .catch((error) => {
        console.log("Firestore error", error);
        setState({
          loading: false,
          error: true,
          hasMore,
        });
      });
  };

  return [loading, error, hasMore, getArticles];
};

export default useGetArticles;
