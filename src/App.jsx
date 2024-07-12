import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Player from "./Components/Player";
import "./assets/style.css";
import MainContent from "./Components/MainContent";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <Sidebar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <main className="col-12 col-md-9 mainPage w-100">
            <MainContent />
          </main>
        </div>
        <Player />
      </div>
    </Router>
  );
};

export default App;
