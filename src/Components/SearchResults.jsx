import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack, toggleLikeTrack } from "../store/playerSlice";

const SearchResults = ({ artistName }) => {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();
  const likedTracks = useSelector((state) => state.player.likedTracks);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`);
        if (response.ok) {
          const { data } = await response.json();
          setSongs(data.slice(0, 8));
        } else {
          throw new Error("Error fetching songs");
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (artistName) {
      fetchSongs();
    }
  }, [artistName]);

  const handleTrackClick = (track) => {
    dispatch(setCurrentTrack(track));
  };

  const handleLikeClick = (track) => {
    dispatch(toggleLikeTrack(track));
  };

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3">
      {songs.map((song) => (
        <div className="col text-center" key={song.id}>
          <img
            className="img-fluid"
            src={song.album.cover_medium}
            alt="track"
            onClick={() => handleTrackClick(song)}
            style={{ cursor: "pointer" }}
          />
          <p>
            {song.title}
            <br />
            Artist: {song.artist.name}
            <span
              onClick={() => handleLikeClick(song)}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                color: likedTracks[song.id] ? "green" : "gray",
                fontSize: "20px",
              }}
            >
              <i className={`bi bi-heart${likedTracks[song.id] ? "-fill" : ""}`}></i>
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
