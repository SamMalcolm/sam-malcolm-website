import React, { useState, useEffect } from 'react'
import Axios from 'axios';

const ytpMenuItem = (data) => {
	return (
		<div>
			<img src={data.src} />
			<h3>{data.title}</h3>
			<i>{data.duration}</i>
		</div>
	)
}

export default function YoutubePlaylist() {

	const [autoplay, setAutoplay] = useState(true);
	const [playlist, setPlaylist] = useState([]);
	const [transcript, setTranscript] = useState([]);
	const [resources, setResources] = useState([]);
	const [channel, setChannel] = useState([]);

	useEffect(() => {
		Axios.get('/api/youtube/PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR').then((response) => {
			setPlaylist(response.data.items);
			setChannel(response.data.channel);

			const onPlayerReady = () => {

			}

			const onPlayerStateChange = () => {

			}

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
				<h1>Video Title</h1>
				{(typeof channel != "undefined" && typeof channel.items != "undefined") &&
					<div>
						<img src={channel.items[0].snippet.thumbnails.default.url} />
						<h5>{channel.items[0].snippet.title}</h5>
					</div>
				}
			</div>
			<div className="ytp_video_theatre_container">
				<div className="ytp_video_theatre">
					<div className="ytp_player" id="player">

					</div>
				</div>
			</div>
			<div className="ytp_meta_container" >
				<div className="ytp_video_menu">
					<h3>Video Menu</h3>
					{(playlist).map((item) => {
						console.log("mapping playlist object");
						console.log(item);
						(
							<ytpMenuItem title={item.snippet.title} src={item.snippet.thumbnails.default.url} duration="1s" />
						)
					})}
				</div>
				<div className="ytp_meta_data">
					<h3>Video Transcript</h3>
					<span className="ytp_transcript"></span>
					<h3>Description</h3>
					<span className="ytp_description"></span>
					<h3>Additional Resources</h3>
					<span className="ytp_resources"></span>
				</div>
			</div>

		</div>
	)
}
