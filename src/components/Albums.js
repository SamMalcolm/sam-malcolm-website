import React, { useState, useEffect } from 'react'

const Song = (props) => {
    return (
        <div className="songContainer">
            <div className="songTitle">{props.name}</div>
            <iframe src={props.api_url}></iframe>
        </div>
    )
}

const Album = (props) => {
    return (
        <div className="alContainer">
            {props.songs.map((song) => {
                return (
                    <Song {...song} />
                )
            })}
        </div>
    )
}

function Albums(props) {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        setAlbums([{
            "name": "Thirty Five Millimeter",
            "songs": [
                {
                    "name": "Blue Wail",
                    "api_url": "test.com"
                }
            ]

        }]);
    });
    return (
        <div className="albumsContainer">
            {albums.map((album) => {
                return (
                    <Album {...album} />
                )
            })}
        </div>
    )
}


export default Albums

