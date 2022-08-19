import "../styles.scss";

const AlbumList = ({ albums, lastAlbumElementRef }) => {
  return (
    <div>
      {albums?.map((album, index) => {
        console.log(albums.length);
        if (albums.length === index + 1) {
          return (
            <div ref={lastAlbumElementRef} key={index} className="card">
              <img
                alt={album.collectionName}
                className="image"
                src={album.img}
              />
              <div className="cardBody">
                <h2> {album.artistName} </h2>
                <p>
                  {" "}
                  <strong>Collection : </strong> {album.collectionName}
                </p>
              </div>
            </div>
          );
        }
        return (
          <div key={index} className="card">
            <img alt={album.collectionName} className="image" src={album.img} />
            <div className="cardBody">
              <h2> {album.artistName} </h2>
              <p>
                {" "}
                <strong>Collection : </strong> {album.collectionName}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlbumList;
