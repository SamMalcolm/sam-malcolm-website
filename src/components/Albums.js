import React, { useState, useEffect } from 'react'
import FullWidthBanner from './FullWidthBanner';
const Song = (props) => {
    return (
        <div className="songContainer">
            <div onClick={() => { props.handleClick(props.name); }} style={{ 'backgroundColor': props.color, "visibility": (props.active) ? "hidden" : "visible" }} className="songTitle">
                <h1>{props.name}</h1>
            </div>
            {(props.active || props.clickCount) ? <iframe src={props.src} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> : null}
        </div>
    )
}

const Album = (props) => {
    const [songs, setSongs] = useState(props.songs);

    const handleClick = (name) => {
        for (var key in songs) {
            songs[key].active = 0;
        }
        let activeSong = songs.filter((song) => {
            return song.name == name;
        });
        console.log(activeSong);
        let index = songs.indexOf(activeSong[0]);
        console.log(index);
        songs[index].active = 1;
        songs[index].clickCount++;
        setSongs(songs);
        console.log(songs);
    }
    return (
        <div className="alContainer">
            {songs.map((song) => {
                return (
                    <Song {...song} handleClick={handleClick} />

                )
            })}
        </div>
    )
}

const AlbumMeta = (props) => {
    return (
        <div className="albumMetaContainer">
            <img src={props.artwork} width="200" alt={"The album artwork for Sam Malcolm's album " + props.name} />
            <div className="infoContainer">
                <h1>{props.name}  <i>{props.year}</i></h1>
                <p>{props.description}</p>
            </div>
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
                    "active": 0,
                    "clickCount": 0,
                },
                {
                    "name": "Ersatz",
                    "src": "https://open.spotify.com/embed/track/7fFLSfZsPekXcZRQHA4Bbl",
                    "color": "rgb(119, 198, 227)",
                    "active": 0,
                    "clickCount": 0,
                },
                {
                    "name": "Artificial Irrelevance",
                    "src": "https://open.spotify.com/embed/track/2B3RVy4bhkbjSNeu9naRCI",
                    "color": "rgb(253,227,89)",
                    "active": 0,
                    "clickCount": 0,
                },

                {
                    "name": "The Flare",
                    "src": "https://open.spotify.com/embed/track/64mW74K9NK4u3CZ57eAu5H",
                    "color": "rgb(0,30,22)",
                    "active": 0,
                    "clickCount": 0,
                },
                {
                    "name": "Timber",
                    "src": "https://open.spotify.com/embed/track/6jJkiVUrF6q2rpGbySChpK",
                    "color": "rgb(79,169,168)",
                    "active": 0,
                    "clickCount": 0,
                },
                {
                    "name": "Denouement",
                    "src": "https://open.spotify.com/embed/track/69t7Tv3DtfjSaa3oVm7AiL",
                    "color": "rgb(2,94,24)",
                    "active": 0,
                    "clickCount": 0,
                },
            ]

        }]);
    });
    return (
        <div className="albumsContainer">
            <FullWidthBanner caption="Photo: Ian Malcolm" backgroundPosition="top center" src="/assets/ui_images/music.jpg" title="Music" />
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

