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

	const handleClick = (index) => {
		// console.log(e);
		// let index = e.target.getAttribute("data-id");
		// console.log(e.target);
		console.log("INDEX " + index);
		console.log("VIDEO TITLE " + playlist[index].snippet.title)
		setTitle(playlist[index].snippet.title);
		setDescription(playlist[index].snippet.description);
		player.loadVideoById(playlist[index].contentDetails.videoId);

	}

	useEffect(() => {
		Axios.get('/api/youtube/PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR').then((response) => {
			setPlaylist(response.data.items);
			setChannel(response.data.channel);

			const onPlayerReady = () => { }

			const onPlayerStateChange = () => { }

			window.onYouTubeIframeAPIReady = () => {
				console.log("IFRAME API READY");

				player = new YT.Player('player', {

					height: '390',
					width: '640',
					videoId: response.data.items[0].contentDetails.videoId,
					events: {
						'onReady': onPlayerReady,
						'onStateChange': onPlayerStateChange
					}
				});

				setTitle(response.data.items[0].snippet.title);
				setDescription(response.data.items[0].snippet.description);
			}

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
								<YtpMenuItem index={i} handleClick={handleClick} title={item.snippet.title} src={item.snippet.thumbnails.default.url} duration="1s" />
							)
						})
					}

				</div>
				<div className="ytp_meta_data">
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