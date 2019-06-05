import React, { useState, useEffect } from 'react'
import FullWidthBanner from './FullWidthBanner';
import Axios from 'axios';

const Song = (props) => {

	return (
		<div>
			<div className={(props.active) ? "songContainer" : "songContainer colourTransition"}>
				<div onClick={() => { props.handleClick(props.name); }} style={{ 'backgroundColor': props.color, "zIndex": (props.active) ? "250" : "300" }} className="songTitle">
					<h1>{(props.active) ? "LOADING" : props.name}</h1>
				</div>
				{(props.active || props.clickCount) ? <iframe src={props.src} style={{ "zIndex": (props.active) ? "300" : "250" }} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> : null}
			</div>
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
		let index = songs.indexOf(activeSong[0]);
		songs[index].active = 1;
		songs[index].clickCount++;
		setSongs(songs);
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
				<div>
					{(props.spotifyLink) ? <a style={{ 'borderColor': props.highlight }} href={props.spotifyLink} target="_blank" className="smBtn" >View on Spotify</a> : null}
					{(props.itunesLink) ? <a style={{ 'borderColor': props.highlight }} href={props.itunesLink} target="_blank" className="smBtn" >View on iTunes</a> : null}
				</div>
			</div>
		</div>
	)
}

const Albums = (props) => {

	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		Axios.get('/api/albums').then((response) => {
			setAlbums(response.data);
		})
	}, [])

	return (
		<div className="albumsContainer">
			<FullWidthBanner caption="Photo: Joe Bloggs" backgroundPosition="top center" src="/path/to/image.jpg" title="Music" />
			{albums.map((album) => {
				return (
					<div>
						<AlbumMeta {...album} highlight={props.highlight} />
						<Album {...album} />
					</div>
				)
			})}
		</div>
	)
}


export default Albums

