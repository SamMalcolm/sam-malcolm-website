import React, { useState, useEffect } from 'react'

const Song = (props) => {
    return (
        <div className="songContainer">
            <div style={{ 'backgroundColor': props.color }} className="songTitle">{props.name}</div>
            <iframe src={props.src} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
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

const AlbumMeta = (props) => {
    return (
        <div className="albumMetaContainer">
            <img src={props.artwork} />
            <h1>{props.name}</h1>
            <i>{props.year}</i>
            <p>{props.description}</p>
        </div>
    )
}

function Albums(props) {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        setAlbums([{
            "name": "Thirty Five Millimeter",
            "year": "2018",
            "description": "This album is a collection of songs I wrote inpired by various modern cinematic scores, It contains a mix of orchestral and electrionic instrumentation. I experimented with blending the two at certain points on this record.",
            "artwork": "/assets/albums/tfm.jpg",
            "songs": [
                {
                    "name": "Blue Wail",
                    "src": "https://open.spotify.com/embed/track/2JGRsV0BcXgGAC4aIaKzHv",
                    "color": "rgb(131,228,147)",
                },
                {
                    "name": "Ersatz",
                    "src": "https://open.spotify.com/embed/track/7fFLSfZsPekXcZRQHA4Bbl",
                    "color": "rgb(119, 198, 227)",
                },
                {
                    "name": "Artificial Irrelevance",
                    "src": "https://open.spotify.com/embed/track/2B3RVy4bhkbjSNeu9naRCI",
                    "color": "rgb(253,227,89)",
                },

                {
                    "name": "The Flare",
                    "src": "https://open.spotify.com/embed/track/64mW74K9NK4u3CZ57eAu5H",
                    "color": "rgb(0,30,22)",
                },
                {
                    "name": "Timber",
                    "src": "https://open.spotify.com/embed/track/6jJkiVUrF6q2rpGbySChpK",
                    "color": "rgb(79,169,168)",
                },
                {
                    "name": "Denouement",
                    "src": "https://open.spotify.com/embed/track/69t7Tv3DtfjSaa3oVm7AiL",
                    "color": "rgb(2,94,24)",
                },
            ]

        }]);
    });
    return (
        <div className="albumsContainer">

            {albums.map((album) => {
                return (
                    <div>
                        <AlbumMeta {...album} />
                        <Album {...album} />
                    </div>
                )
            })}
        </div>
    )
}


export default Albums

