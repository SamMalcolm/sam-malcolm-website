import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const YtpMenuItem = (data) => {
	return (
		<div onClick={() => {
			data.handleClick(data.index)
		}} data-id={data.index}>
			<img src={data.src} />
			<span>
				<h4>{data.title}</h4>
				<i>{data.duration}</i>
			</span>
		</div>
	)
}

export default function YoutubePlaylist() {

	const [autoplay, setAutoplay] = useState(true);
	const [playlist, setPlaylist] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [transcript, setTranscript] = useState([]);
	const [resources, setResources] = useState([]);
	const [channel, setChannel] = useState([]);

	const playVideo = (index) => {
		setTitle(playlist[index].snippet.title);
		setDescription(playlist[index].snippet.description);
		player.loadVideoById(playlist[index].contentDetails.videoId);
	}

	const onPlayerReady = () => { player.playVideo(); }

	const onPlayerStateChange = () => {
		if (player.getPlayerState() == 0 && autoplay) {
			let data = player.getVideoData();
			let currentVid = playlist.filter((item) => {
				return item.contentDetails.videoId == data.video_id;
			});
			let index = playlist.indexOf(currentVid[0]);
			index++;
			playVideo(index);
		}
	}

	window.onYouTubeIframeAPIReady = () => {
		player = new YT.Player('player', {
			height: '390',
			width: '640',
			videoId: playlist[0].contentDetails.videoId,
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
		playVideo(0);
	}

	useEffect(() => {
		console.log("USE EFFECT");
		Axios.get('/api/youtube/PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR').then((response) => {
			setPlaylist(response.data.items);
			setChannel(response.data.channel);
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		})
	}, [])

	return (
		<div className="ytp_container">
			<div className="ytp_header">
				<h1>{title}</h1>
				{(typeof channel != "undefined" && typeof channel.items != "undefined") &&
					<div>
						<img src={channel.items[0].snippet.thumbnails.default.url} />
						<h4>{channel.items[0].snippet.title}</h4>
					</div>
				}

			</div>
			<div className="ytp_video_theatre_container">
				<div className="ytp_video_theatre">
					<div className="ytp_sub_container">
						<div className="ytp_player" id="player">
						</div>
					</div>
				</div>
			</div>
			<div className="ytp_meta_container">
				<div className="ytp_video_menu">
					<h3>Video Menu</h3> {
						(playlist).map((item, i) => {
							return (
								<YtpMenuItem index={i} handleClick={playVideo} title={item.snippet.title} src={item.snippet.thumbnails.default.url} duration="1s" />
							)
						})
					}
				</div>
				<div className="ytp_meta_data">
					<p>Autoplay</p>
					<div className="switch-container position-relative form-group">
						<label className="switch">
							<input checked={autoplay} onChange={(e) => { setAutoplay(e.target.checked) }} type="checkbox" className="form-check-input" />
							<span className="slider round"></span>
						</label>
					</div>
					{(transcript) &&
						<div>
							<h3>Video Transcript</h3>
							<span className="ytp_transcript"></span>
						</div>
					}

					{(description) &&
						<div>
							<h3>Description</h3>
							<span className="ytp_description"></span>
						</div>
					}
					{(resources) &&
						<div>
							<h3>Resources</h3>
							<span className="ytp_resources"></span>
						</div>
					}

				</div>
			</div>
		</div>
	)
}