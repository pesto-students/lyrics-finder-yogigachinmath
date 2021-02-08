import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import Navbar from "../Navbar/Navbar";
import "./Suggestion.css";

function Suggestion() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);

  let { query } = useParams();

  const fetchLyrics = async (url) => {
    const result = await fetch(url);
    const suggestionsResult = await result.json();
    setSuggestions(suggestionsResult.data);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchLyrics(`https://api.lyrics.ovh/suggest/${query}`);
  }, [query]);

  useEffect(() => {
    let uniqueAlbums = new Set();
    let uniqueArtists = new Set();
    let Artists = [];
    let Albums = [];
    suggestions.forEach((suggestion) => {
      let obj = {
        name: suggestion["album"]["title"],
        img: suggestion["album"]["cover_small"],
      };
      if (!uniqueAlbums.has(obj.name)) Albums.push(obj);
      uniqueAlbums.add(obj.name);

      obj = {
        name: suggestion["artist"]["name"],
        img: suggestion["artist"]["picture_small"],
      };
      if (!uniqueArtists.has(obj.name)) Artists.push(obj);
      uniqueArtists.add(obj.name);
    });
    setAlbums(Albums);
    setArtists(Artists);
  }, [suggestions]);

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
                      suggestions.map((res) => (
                        <Tracks track={res} key={res["id"]} />
                      ))}
                  </div>
                  <div className="col2">
                    <div className="artists">
                      <h2>Artists</h2>
                      {artists.map((artist) => (
                        <Link
                          to={`/suggestion/${artist.name}`}
                          className="more-suggestion"
                          key={artist["name"]}
                        >
                          <div className="suggestion">
                            <img src={`${artist.img}`} alt="album-pic" />
                            <span>{artist.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="albums">
                      <h2>Albums</h2>
                      {albums.map((album) => (
                        <Link
                          to={`/suggestion/${album.name}`}
                          className="more-suggestion"
                          key={album["name"]}
                        >
                          <div className="suggestion">
                            <img src={`${album.img}`} alt="album-pic" />
                            <span>{album.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        <div className="suggestion" key={track["id"]}>
          <img src={`${track["album"]["cover_small"]}`} alt="album-pic" />
          <div className="track-details">
            <span>{track["title"]}</span>
            <span>{track["artist"]["name"]}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
export default Suggestion;
