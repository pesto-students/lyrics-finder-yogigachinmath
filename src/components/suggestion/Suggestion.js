import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import Navbar from "../Navbar/Navbar";
import "./Suggestion.css";

function Suggestion() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  let { query } = useParams();

  const fetchLyrics = async (url) => {
    const result = await fetch(url);
    const suggestionsResult = await result.json();
    setSuggestions(suggestionsResult.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLyrics(`https://api.lyrics.ovh/suggest/${query}`);
  }, [query]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="suggestion-wrapper">
          <Navbar />
          <div className="query-wrapper">
            <div className="artist-image">
              <img
                src={`${suggestions[0]["artist"]["picture_medium"]}`}
                alt="artist"
              />
              <div className="search-detail">
                <h4>Lyrics</h4>
                <h2>{query}</h2>
              </div>
            </div>
            <div className="query-details">
              <div className="suggestions">
                <h3>Search Results for {query}</h3>
                <div className="wrapper">
                  <div className="col1">
                    {suggestions &&
                      suggestions.map(
                        (res, index) =>
                          index % 2 === 0 && <Tracks track={res} key = {res['id']} />
                      )}
                  </div>
                  <div className="col2">
                    {suggestions &&
                      suggestions.map(
                        (res, index) =>
                          index % 2 === 1 && <Tracks track={res} key = {res['id']} />
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="load-more">
            <button onClick = {fetchLyrics}>Load More</button>
          </div> */}
        </div>
      )}
    </div>
  );
}

function Tracks({ track }) {
  return (
    <div className="tracks">
      <Link
        to={`/lyrics/${track["artist"]["name"]}/${track["title"]}`}
        style={{ textDecoration: "none" }}
      >
        <div className="suggestion" key = {track["id"]}>
          <img src={`${track["album"]["cover_small"]}`} alt="album-pic" />
            <h4>{track["title"]}</h4>
        </div>
      </Link>
        <Link className = "artist-link" to = {`/suggestion/${track["artist"]["name"]}`} style = {{ color: '#4d1b82' }}>
            <h4>{track["artist"]["name"]}</h4>
        </Link>
    </div>
  );
}
export default Suggestion;
