import React, { useState, useEffect } from 'react'
import FullWidthBanner from './FullWidthBanner';
import Axios from 'axios';

const Song = (props) => {

	const [song, setSong] = useState(props);

	return (
		<div>
			<div className={(song.active) ? "songContainer" : "songContainer colourTransition"}>
				<div onClick={() => {
					console.log("onCLick Call Bck");
					song.active = true;
					setSong(song);
					props.handleClick(song.name);
				}} style={{ 'backgroundColor': song.color, "zIndex": (song.active) ? "250" : "300" }} className="songTitle">
					<h1>{(song.active) ? "LOADING" : props.name}</h1>
				</div>
				{(song.active || song.clickCount) ? <iframe src={song.src} style={{ "zIndex": (song.active) ? "300" : "250" }} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> : null}
			</div>
		</div>
	)
}

const Album = (props) => {
	const [songs, setSongs] = useState(props.songs);

	const handleClick = (name) => {
		console.log("CLICK HANDLER");
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

class Albums extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
		console.log(props.highlight);
		this.state = {
			highlight: props.highlight,
			albums: []
		};
	}

	componentDidMount() {
		console.log("component did mount");
		console.log(this.state.highlight)
		Axios.get('/api/albums').then((response) => {
			this.setState({
				highlight: this.state.highlight,
				albums: response.data
			})
		})
	}

	render() {
		return (
			<div className="albumsContainer">
				<FullWidthBanner caption="Photo: Ian Malcolm" backgroundPosition="top center" src="/assets/ui_images/music.jpg" title="Music" />
				{this.state.albums.map((album) => {
					return (
						<div>
							<AlbumMeta {...album} highlight={this.state.highlight} />
							<Album {...album} />
						</div>
					)
				})}
			</div>
		)
	}
}


export default Albums

