import React, { useState, useEffect } from 'react'
import FullWidthBanner from './FullWidthBanner';
import axios from 'axios';

const Song = (props) => {
    useEffect(() => {
        console.log("PROPS CHANGED");
        console.log(new Date());
    }, [props])
    return (
        <div>
            <div className={(props.active) ? "songContainer" : "songContainer colourTransition"}>
                <div onClick={() => { props.handleClick(props.name); }} style={{ 'backgroundColor': props.color, "zIndex": (props.active) ? "300" : "250" }} className="songTitle">
                    <h1 className={(props.active) ? "selected" : null}>{(props.active) ? "LOADING" : props.name}</h1>
                </div>
                <iframe style={{ 'display': (props.active) ? "block" : "none", "zIndex": (props.active) ? "300" : "250" }} src={props.src} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </div>
        </div>

    )
}

const Album = (props) => {
    return (
        <div className="alContainer">
            {props.songs.map((song) => {
                return (
                    <Song {...song} key={song.name} handleClick={props.handleClick} />

                )
            })}
        </div>
    )
}

const AlbumMeta = (props) => {
    return (
        <div className="albumMetaContainer">
            <img src={props.artwork} width="200" height="200" alt={"The album artwork for Sam Malcolm's album " + props.name} />
            <div className="infoContainer">
                <h1>{props.name}  <i>{props.year}</i></h1>
                <p>{props.description}</p>
                <div>
                    {(props.spotifyLink) ? <a style={{ 'borderColor': props.highlight }} href={props.spotifyLink} targeet="_blank" className="smBtn" >View on Spotify</a> : null}
                    {(props.itunesLink) ? <a style={{ 'borderColor': props.highlight }} href={props.itunesLink} targeet="_blank" className="smBtn" >View on iTunes</a> : null}
                </div>
            </div>
        </div >
    )
}

function Albums(props) {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        axios.get("/api/albums").then((result) => {
            setAlbums(result.data);
        })
    }, []);

    const handleClick = (name) => {
        console.log("CLICKED");
        for (var key in albums) {
            for (var keyb in albums[key].songs) {
                if (albums[key].songs[keyb].name == name) {
                    albums[key].songs[keyb].active = 1;
                } else {
                    albums[key].songs[keyb].active = 0;
                }
            }
        }
        setAlbums(albums);
    }

    return (
        <div className="albumsContainer">
            <FullWidthBanner caption="Photo: Ian Malcolm" backgroundPosition="top center" src="/assets/ui_images/music.jpg" title="Music" />
            {albums.map((album) => {
                return (
                    <div key={album.name}>
                        <AlbumMeta {...album} highlight={props.highlight} />
                        {(album.type == 1 && album.songs.length) ? <Album {...album} handleClick={handleClick} /> : null}
                    </div>
                )
            })}
        </div>
    )
}


export default Albums

