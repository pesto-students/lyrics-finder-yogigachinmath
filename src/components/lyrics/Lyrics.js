import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Loader from "../loader/Loader";
import './Lyrics.css'

function Lyrics() {
  const [isLoading, setIsLoading] = useState(true);
  const [lyrics, setLyrics] = useState('')
  
  let { artistName, title }  = useParams();


  const fetchLyrics = async() => {
    setIsLoading(true);
    const result = await fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`)
    const lyricsResult = await result.json();
    setLyrics(lyricsResult);
    setIsLoading(false);
  }
  useEffect( () => {
    fetchLyrics();
  }, [artistName, title]);

  return (
    <>
    {isLoading ? (
      <Loader />
      ) : (
      <div className = "lyrics-wrapper">
        <Navbar /> 
        <div className = "lyrics">
            <div className = "lyrics-details card">
                <span className = "lyrics-box">
                    <h2>{title}</h2>
                    <Link to = {`/suggestion/${artistName}`} style = {{ color: '#4d1b82' }}>
                      <h4>{artistName}</h4>
                    </Link>
                </span>
            </div>
            <div className = "lyrics-view card" >
                <span className = "lyrics-box" >
                  {lyrics['lyrics']}
                </span>
              {!isLoading && !lyrics['lyrics'] && <h3> No Lyrics Available <br></br> Search for a another Lyrics </h3>}
            </div>
        </div>
        </div>
      )}
      </>
  );
}

export default Lyrics;
