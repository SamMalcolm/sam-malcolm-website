import React, { useState, useEffect } from 'react'
import FullWidthBanner from './FullWidthBanner';
import axios from 'axios';

const Song = (props) => {
    return (
        <div>
            {(props.active) ?
                <div className="songContainer">
                    <div onClick={() => { props.handleClick(props.name); }} style={{ 'backgroundColor': props.color, "zIndex": "299" }} className="songTitle">
                        <h1 className="selected">LOADING</h1>
                    </div>
                    <iframe src={props.src} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                </div>
                :
                <div className="songContainer">
                    <div onClick={() => { props.handleClick(props.name); }} style={{ 'backgroundColor': props.color, "zIndex": "301" }} className="songTitle">
                        <h1>{props.name}</h1>
                    </div>
                    {(props.clickCount) ? <iframe src={props.src} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> : null}
                </div>
            }
        </div>

    )
}

const Album = (props) => {
    const [songs, setSongs] = useState(props.songs);

    const handleClick = (name) => {
        console.log("CLICK!");
        for (var key in songs) {
            songs[key].active = 0;
        }
        console.log("After loop");
        let activeSong = songs.filter((song) => {
            return song.name == name;
        });
        console.log("after filter");
        let index = songs.indexOf(activeSong[0]);
        songs[index].active = 1;
        songs[index].clickCount++;
        console.log("Setting params");
        setSongs(songs);
        console.log("Setting state");
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
            <img src={props.artwork} width="200" height="200" alt={"The album artwork for Sam Malcolm's album " + props.name} />
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
        axios.get("/api/albums").then((result) => {
            setAlbums(result.data);
        })
    }, []);

    return (
        <div className="albumsContainer">
            <FullWidthBanner caption="Photo: Ian Malcolm" backgroundPosition="top center" src="/assets/ui_images/music.jpg" title="Music" />
            {albums.map((album) => {
                return (
                    <div>
                        <AlbumMeta {...album} />
                        {(album.type == 1 && album.songs.length) ? <Album {...album} /> : null}
                    </div>
                )
            })}
        </div>
    )
}


export default Albums

