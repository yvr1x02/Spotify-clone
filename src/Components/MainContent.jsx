import React, { useState } from "react";
import MusicSection from "./MusicSection";
import SearchResults from "./SearchResults";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainContent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [artistName, setArtistName] = useState("");

  const handleSearch = (term) => {
    setArtistName(term);
  };

  const handleReset = () => {
    setSearchTerm("");
    setArtistName("");
  };

  return (
    <div className="d-flex">
      <main className="col-12 col-md-9 offset-md-3 mainPage">
        <Sidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
          onReset={handleReset} // Pass the reset function to Sidebar
        />
        <div className="row">
          <div className="col-9 col-lg-10 mainLinks d-none d-md-flex mb-5">
            <Link to="/">TRENDING</Link>
            <Link to="/">PODCAST</Link>
            <Link to="/">MOODS AND GENRES</Link>
            <Link to="/">NEW RELEASES</Link>
            <Link to="/">DISCOVER</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-10 text-white">
            {artistName ? <h2>Search Results for "{artistName}"</h2> : <h2>Rock Classics</h2>}
            {artistName ? <SearchResults artistName={artistName} /> : <MusicSection artistName="queen" sectionId="rockSection" />}
          </div>
        </div>
        <div className="row">
          <div className="col-10 text-white">
            <h2>{artistName ? null : "Pop Culture"}</h2>
            {artistName ? null : <MusicSection artistName={artistName || "katyperry"} sectionId="popSection" />}
          </div>
        </div>
        <div className="row">
          <div className="col-10 text-white">
            <h2>{artistName ? null : "#HipHop"}</h2>
            {artistName ? null : <MusicSection artistName={artistName || "eminem"} sectionId="hipHopSection" />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainContent;
