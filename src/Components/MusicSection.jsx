import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack, toggleLikeTrack } from "../store/playerSlice";

const MusicSection = ({ artistName, sectionId }) => {
  const [albums, setAlbums] = useState([]);
  const dispatch = useDispatch();
  const likedTracks = useSelector((state) => state.player.likedTracks);

  const fillMusicSection = useCallback(async () => {
    try {
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`);
      if (response.ok) {
        const { data } = await response.json();
        setAlbums(data.slice(0, 4));
      } else {
        throw new Error("Error in fetching songs");
      }
    } catch (err) {
      console.error("error", err);
    }
  }, [artistName]);

  useEffect(() => {
    fillMusicSection();
  }, [fillMusicSection]);

  const handleTrackClick = (track) => {
    dispatch(setCurrentTrack(track));
  };

  const handleLikeClick = (track) => {
    dispatch(toggleLikeTrack(track));
  };

  return (
    <div className="col-10">
      <div id={sectionId}>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
          {albums.map((album) => (
            <div className="col text-center" key={album.id}>
              <img
                className="img-fluid"
                src={album.album.cover_medium}
                alt="track"
                onClick={() => handleTrackClick(album)}
                style={{ cursor: "pointer" }}
              />
              <p>
                {album.title}
                <br />
                Artist: {album.artist.name}
                <span
                  onClick={() => handleLikeClick(album)}
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    color: likedTracks[album.id] ? "green" : "gray",
                    fontSize: "20px",
                  }}
                >
                  <i className={`bi bi-heart${likedTracks[album.id] ? "-fill" : ""}`}></i>
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicSection;
