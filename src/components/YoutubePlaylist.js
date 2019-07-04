import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import parseString from 'xml2js';

const YtpMenuItem = (data) => {
	return (
		<div className="ytp_menu_item" onClick={() => {
			data.handleClick(data.index)
		}} data-id={data.index}>
			<div className="ytp_menu_img">
				<img src={data.src} />
			</div>
			<span>
				<h4>{data.title}</h4>
				<i>{data.duration}</i>
			</span>
		</div>
	)
}

export default function YoutubePlaylist(data) {

	const [autoplay, setAutoplay] = useState(true);
	const [darkTheme, setDarkTheme] = useState(true);
	const [playlist, setPlaylist] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [transcript, setTranscript] = useState([]);
	const [resources, setResources] = useState([]);
	const [channel, setChannel] = useState([]);

	const tryFetchTranscript = videoid => {
		console.log("FETCHING TRANSCRIPT " + videoid);
		Axios.get("http://video.google.com/timedtext?lang=en&v=" + videoid).then(response => {
			if (!response.data) {
				console.log("NO TRANSCRIPT AVAILABLE");
				setTranscript([]);
			} else {
				// HANDLE TRANSCIRPT
				console.log("PARSING TRASNSCRIPT XML");
				parseString.parseString(response.data, (err, result) => {
					if (err) {
						console.log(err);
					}
					for (let i = 0; i < result.transcript.text.length; i++) {
						result.transcript.text[i].active = false;
					}
					setTranscript(result.transcript.text);
				});
			}
		})
	}

	const handleTranscriptClick = e => {
		if (player) {
			player.seekTo(e.target.getAttribute("data-start"));
			player.playVideo();
		}
	}

	const highlightCurrentTranscript = (player) => {
		console.log("HIGHLIGHT CURRENT SCRIPT");
		let current_time = player.getCurrentTime();
		let tcopy = transcript;
		console.log(tcopy);
		let current_script = tcopy.filter((script) => {
			return script.$.start > current_time;
		});
		current_script = current_script[0];
		console.log(current_script);
		for (let i = 0; i < tcopy.length; i++) {
			tcopy[i].active = false;
		}
		let activeIndex = tcopy.indexOf(current_script);
		console.log(activeIndex);
		tcopy[activeIndex].active = true;
		setTranscript(tcopy);
	}

	const playVideo = (index) => {
		console.log("PLAY VIDEO " + index);
		tryFetchTranscript(playlist[index].contentDetails.videoId);
		setInterval(highlightCurrentTranscript(player), 300);
		setTitle(playlist[index].snippet.title);
		setDescription(playlist[index].snippet.description);
		player.loadVideoById(playlist[index].contentDetails.videoId);
	}

	const onPlayerReady = () => { player.playVideo(); }

	const onPlayerStateChange = () => {
		if (player.getPlayerState() == 0 && autoplay) {
			clearInterval(videoTimer);
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
		// Axios.get('/api/youtube/PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR').then((response) => {
		Axios.get('/api/tutorial/' + data.id).then((response) => {
			setPlaylist(response.data.items);
			setChannel(response.data.channel);
			if (!document.querySelector("script[src=\"https://www.youtube.com/iframe_api\"]")) {
				var tag = document.createElement('script');
				tag.src = "https://www.youtube.com/iframe_api";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			} else {
				onYouTubeIframeAPIReady();
			}
		})
	}, [])

	return (
		<div className={(darkTheme) ? "theme-dark" : "theme-light"} >
			<div className="ytp_container">
				<div className="ytp_header">
					<h1>{title}</h1>
					{(typeof channel != "undefined" && typeof channel.items != "undefined") &&
						<div>
							<img src={channel.items[0].snippet.thumbnails.default.url} />
							<h4>{channel.items[0].snippet.title}</h4>
						</div>
					}
					<div className="ytp_theme_switch">
						<span>Dark Theme: </span>
						<input onChange={e => { setDarkTheme(e.target.checked) }} type="checkbox" checked={(darkTheme) ? "true" : "false"} />
					</div>
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
						{(transcript && transcript != []) &&
							<div>
								<h3>Video Transcript</h3>
								<span className="ytp_transcript">
									{(transcript).map(script => {
										return (
											<span key={script.$.start} onClick={handleTranscriptClick} classNamee={(script.active) ? "active" : null} data-start={script.$.start} data-duration={script.$.dur}>
												{" " + script._ + " "}
											</span>
										)
									})}
								</span>
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
		</div>
	)
}