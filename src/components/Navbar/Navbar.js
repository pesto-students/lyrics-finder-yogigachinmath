import React, { useState, useEffect, useRef  } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import "./Navbar.css";

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
              <a href="https://github.com/yogigachinmath" target = "_blank" rel = "noreferrer">Contact</a>
            </li>
            <li>
              <a href="https://github.com/pesto-students/lyrics-finder-yogigachinmath" target = "_blank" rel = "noreferrer">Github</a>
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
  const inputRef = useRef('');

  const handleChange = (event) => { 
    setSearchInput(event.target.value);
  };

  const fetchLyrics = () => {
    fetch(`https://api.lyrics.ovh/suggest/${searchInput}`)
        .then((res) => res.json())
        .then((res) => {
          setSuggestion(res);
        });
    }

  useEffect(() => {
    setTimeout(() => {
      if (searchInput === inputRef.current.value && searchInput !== '') {                   
        fetchLyrics();
      }
    }, 500);
  }, [searchInput])
  
  const handleBlur = (event) => {
    if( event.relatedTarget &&  ['suggestion-link', 'see-all'].includes(event.relatedTarget.className))
      return;
      setToDisplaySuggestions(false);
  }
  const handleFocus = (event) => {
    setToDisplaySuggestions(true);
  }
  
  return (
    <div 
    onBlur = {handleBlur}
    onFocus = {handleFocus}
    > 
      <div>
        <input
          className="search-input"
          type="text"
          ref={inputRef}
          onChange={handleChange}
          placeholder="Type song title, artist or lyrics"
        />
      </div>
      <div className="suggestion-box" style = {{display: toDisplaySuggestions ? 'flex' : 'none' }}>
        {searchInput &&  <div className = ""><Link to = {`/suggestion/${searchInput}`} className = "see-all">see all</Link></div> }
        {suggestion["data"] &&
          suggestion["data"].map((res) => (
            <div className="suggestion-link" key={res["id"]}>
              <ul>
                <li>
                  <Link to = {`/lyrics/${res["artist"]["name"]}/${res["title"]}`} className = "suggestion-link">
                    <div className="suggestion-details">
                      <h3>{res["title"]} </h3>
                      <h5>{res["artist"]["name"]} </h5>
                    </div>
                  </Link>
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
