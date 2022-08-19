import "./styles.scss";
import { useState, useRef, useCallback } from "react";
import useAlbumSearch from "./hooks/useAlbumSearch";
import { useSelector } from "react-redux";
import AlbumList from "./components/AlbumList";
import SearchBar from "material-ui-search-bar";

export default function App() {
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const { hasMore, loading, error } = useAlbumSearch(query, offset);

  const albums = useSelector((state) => state.allAlbums.albums);
  const observer = useRef();

  const lastAlbumElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevPageNumber) => prevPageNumber + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearchRequest = (e) => {
    console.log("handle search");
    setQuery(e);
    setOffset(0);
  };

  return (
    <div className="App">
      <SearchBar value={query} onRequestSearch={handleSearchRequest} />
      <AlbumList albums={albums} lastAlbumElementRef={lastAlbumElementRef} />
      {error && <div>Error</div>}
      {loading && <div>loading..</div>}
    </div>
  );
}
