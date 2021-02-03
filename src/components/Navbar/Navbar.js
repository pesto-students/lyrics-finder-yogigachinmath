import React, { useState, useCallback } from "react";
import logo from "../../assets/Logo.svg";
import "./Navbar.css";
import { debounce } from "lodash";

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="nav-container">
        <div className="nav-left-wrapper">
          <a href="/" className="logo">
            <img src={logo} alt="logo" height="66"></img>
          </a>
          <div className="searchbar">
            <Search />
          </div>
        </div>
        <div className="nav-items">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/">Contact</a>
            </li>
            <li>
              <a href="/">Github</a>
            </li>
          </ul>
        </div>
      </nav>
    </React.Fragment>
  );
};

function Search() {
  let [searchInput, setSearchInput] = useState();
  let [suggestion, setSuggestion] = useState({});
  let [toDisplaySuggestions, setToDisplaySuggestions ] = useState(false);

  const handleChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value) fetchLyrics(event.target.value);
  };

  const fetchLyrics = useCallback(debounce((value) => {
    fetch(`https://api.lyrics.ovh/suggest/${value}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setSuggestion(res);
        });
    }, 500),[]);
  
  const handleBlur = (event) => {
    setToDisplaySuggestions(false);
  }
  const handleFocus = (event) => {
    setToDisplaySuggestions(true);
  }
  return (
    <div> 
      <div>
        <input
          className="search-input"
          type="text"
          onChange={handleChange}
          placeholder="Type song title, artist or lyrics"
          onBlur = {handleBlur}
          onFocus = {handleFocus}
        />
      </div>
      <div className="suggestion-box" style = {{display: toDisplaySuggestions ? 'block' : 'none' }}>
        {/* <a> see all</a> */}
        {suggestion["data"] &&
          suggestion["data"].map((res) => (
            <div className="suggestion" key={res["id"]}>
              <ul>
                <li>
                  <a href="/">
                    <div className="suggestion-details">
                      <h3>{res["title"]} </h3>
                      <h5>{res["artist"]["name"]} </h5>
                    </div>
                  </a>
                </li>
                <hr></hr>
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Navbar;
