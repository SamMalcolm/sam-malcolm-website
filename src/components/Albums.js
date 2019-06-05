import React, { useState, useEffect } from 'react'
import FullWidthBanner from './FullWidthBanner';
import Axios from 'axios';

const Song = props => {
	// Destruct Props for over better overview
	const { active, name, handleClick, color, clickCount, src } = props;

	const onClick = () => handleClick(name);
	return (
		<div>
			<div className={(active) ? "songContainer" : "songContainer colourTransition"}>
				<div
					onClick={onClick}
					style={{
						backgroundColor: color,
						zIndex: active ? "250" : "300"
					}}
					className="songTitle"
				>
					<h1>{active ? "LOADING" : name}</h1>
				</div>
				{(active || clickCount) && ( // && Short Circuit instead of tenary (its more concise)
					<iframe style={{
						zIndex: active ? "300" : "250"
					}} src={src} frameBorder="0" allowtransparency="true" allow="encrypted-media" />
				)}
			</div>
		</div>
	);
};

const Album = props => {
	const [songs, setSongs] = useState(props.songs);

	const handleClick = name => {
		const newSongsArray = songs.map(song => {
			if (song.name === name) {
				song.active = 1;
				song.clickCount++;
			} else {
				song.active = 0;
			}
			return song;
		});
		setSongs(newSongsArray);
	};

	return (
		<div className="alContainer">
			{songs.map(song => {
				return <Song key={song.name} {...song} handleClick={handleClick} />;
			})}
		</div>
	);
};


const AlbumMeta = props => {
	// Desctruct props
	const { artwork, name, year, description, spotifyLink, itunesLink, highlight } = props;
	return (
		<div className="albumMetaContainer">
			<img src={artwork} width="200" height="200" alt={"The album artwork for Sam Malcolm's album " + name} />
			<div className="infoContainer">
				<h1>
					<span>{name}</span> <i>{year}</i>
				</h1>
				<p>{description}</p>
				<div>
					{spotifyLink && ( // ShortCurcuit instead of tenary
						<a style={{ borderColor: highlight }} href={spotifyLink} target="_blank" className="smBtn">
							View on Spotify
			</a>
					)}
					{itunesLink && ( // ShortCurcuit instead of tenary
						<a style={{ borderColor: highlight }} href={itunesLink} target="_blank" className="smBtn">
							View on iTunes
			</a>
					)}
				</div>
			</div>
		</div>
	);
};

const Albums = props => {
	const [albums, setAlbums] = useState([]);

	useEffect(() => {
		Axios.get("/api/albums").then(response => {
			setAlbums(response.data); // Use mocked data I defiend below
		});
	}, []);

	return (
		<div className="albumsContainer">
			<FullWidthBanner
				caption="Photo: Joe Bloggs"
				backgroundPosition="top center"
				src="/assets/ui_images/music.jpg"
				title="Music"
			/>
			{/* Add uniqe keys to looped elements -> better performance */}
			{/* You only use certain props, dont just spread them on all elements */}
			{albums.map((album, i) => {
				return (
					<div>
						<AlbumMeta key={`meta-${i}`} {...album} highlight={props.highlight} />
						<Album key={`album-${i}`} songs={album.songs} />
					</div>
				);
			})}
		</div>
	);
};


export default Albums

