import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function useAlbumSearch(query, offset) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const dispatch = useDispatch();
  const entityParam = "album";
  const limit = 10;

  const createAlbum = (col, ar, img) => {
    return {
      collectionName: col,
      artistName: ar,
      img: img
    };
  };

  useEffect(() => {
    setAlbums([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "https://itunes.apple.com/search",
      params: {
        entity: entityParam,
        offset: offset,
        limit: limit,
        term: query
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c))
    })
      .then((res) => {
        console.log(res.data.results);
        let newAlbums = res.data.results.map((a) =>
          createAlbum(a.collectionName, a.artistName, a.artworkUrl100)
        );
        setAlbums((prevAlbums) => {
          return [...prevAlbums, ...newAlbums];
        });

        setHasMore(res.data.results.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  }, [query, offset]);

  dispatch({
    type: "SET_MUSIC_ALBUMS",
    payload: { albums, loading, hasMore, error }
  });
  return { albums, hasMore, loading, error };
}
