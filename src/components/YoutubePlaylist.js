import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import parseString from 'xml2js';
import { SSL_OP_NETSCAPE_CHALLENGE_BUG } from 'constants';

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
	const [playerReady, setPlayerReady] = useState(false);
	const [multiitems, setMultiitems] = useState(true);

	const tryFetchTranscript = videoid => {
		return new Promise((resolve, reject) => {
			console.log("FETCHING TRANSCRIPT " + videoid);
			Axios.get("https://video.google.com/timedtext?lang=en&v=" + videoid).then(response => {
				if (!response.data) {
					console.log("NO TRANSCRIPT AVAILABLE");
					setTranscript([]);
					resolve(false);
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
						resolve(true);
					});
				}
			})
		})
	}

	const tryFetchResources = videoid => {
		return new Promise((resolve, reject) => {
			console.log("FETCHING RESOURCES " + videoid);
			Axios.get("/api/" + videoid + "/resources").then(response => {
				console.log(response.data[0].resources);
				if (!response.data) {
					console.log("NO RESOURCES AVAILABLE");
					setResources([]);
					resolve(false);
				} else {
					// HANDLE TRANSCIRPT
					setResources(response.data[0].resources);
					resolve(true);
				}
			})
		})
	}

	const handleTranscriptClick = e => {
		if (player) {
			player.seekTo(e.target.getAttribute("data-start"));
			player.playVideo();
		}
	}

	useEffect(() => {
		var tscript_timer = setInterval(() => {
			if (typeof player != "undefined" && transcript && transcript != [] && playerReady) {
				let tcopy = transcript.map((script) => {
					return script
				});
				let current_time = player.getCurrentTime();
				if (current_time && tcopy) {
					let current_script = tcopy.filter((script) => {
						let startTime = parseFloat(script.$.start);
						let duration = parseFloat(script.$.dur);
						return startTime < current_time && current_time < (startTime + duration);
					});
					if (current_script.length) {
						let activeIndex = tcopy.indexOf(current_script[0]);
						if (!tcopy[activeIndex].active) {
							console.log("UPDATING ACTIVE TRANSCRIPT");
							for (let i = 0; i < tcopy.length; i++) {
								tcopy[i].active = false;
							}
							tcopy[activeIndex].active = true;
							setTranscript(tcopy);
						}
					}
				}
			}
		}, 300);
		return () => {
			clearInterval(tscript_timer);
		}
	}, [transcript])

	const playVideo = (index) => {
		console.log("PLAY VIDEO " + index);
		if (typeof playlist[index].contentDetails.videoId != 'undefined') {
			console.log("PLAYING FOR PLAYLIST");
			tryFetchTranscript(playlist[index].contentDetails.videoId);
			tryFetchResources(playlist[index].contentDetails.videoId);
			setTitle(playlist[index].snippet.title);
			setDescription(playlist[index].snippet.description);
			player.loadVideoById(playlist[index].contentDetails.videoId);
			player.playVideo();
		} else {
			console.log("PLAUING INDIVIDUAL VIDEO");
			tryFetchTranscript(playlist[index].id);
			tryFetchResources(playlist[index].id);
			setTitle(playlist[index].snippet.title);
			setDescription(playlist[index].snippet.description);
			player.loadVideoById(playlist[index].id);
			player.playVideo();
		}
	}

	const onPlayerReady = () => {
		setPlayerReady(true);
		playVideo(0);
	}

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
		let id = (multiitems) ? playlist[0].id : playlist[0].contentDetails.videoId;
		player = new YT.Player('player', {
			height: '390',
			width: '640',
			videoId: id,
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	}

	useEffect(() => {
		console.log("USE EFFECT");
		// Axios.get('/api/youtube/PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR').then((response) => {
		Axios.get('/api/tutorial/' + data.id).then((response) => {
			if (response.data.items.length == 1) {
				setMultiitems(false);
				setAutoplay(false);
			}
			setPlaylist(response.data.items);
			if (response.data.channel.items.length) {
				setChannel(response.data.channel);
			}
			if (!document.querySelector("script[src=\"https://www.youtube.com/iframe_api\"]")) {
				var tag = document.createElement('script');
				tag.src = "https://www.youtube.com/iframe_api";
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			} else {
				onYouTubeIframeAPIReady();
				onPlayerReady();
			}
		})
	}, [])

	return (
		<div className={(darkTheme) ? "theme-dark" : "theme-light"} >
			<div className="ytp_container">
				<div className="ytp_header">
					<h1>{title}</h1>
					{(typeof channel != "undefined" && typeof channel.items != "undefined" && typeof channel.items[0] != "undefined") &&
						<div>
							<img src={channel.items[0].snippet.thumbnails.default.url} />
							<h4>{channel.items[0].snippet.title}</h4>
						</div>
					}
					<div className="ytp_theme_switch">
						<span>Dark Theme: </span>
						<input onChange={e => { setDarkTheme(e.target.checked) }} type="checkbox" checked={(darkTheme) ? true : false} />
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
					{(multiitems) && (
						<div className="ytp_video_menu">
							<h3>Video Menu</h3> {
								(playlist).map((item, i) => {
									return (
										<YtpMenuItem index={i} handleClick={playVideo} title={item.snippet.title} src={item.snippet.thumbnails.default.url} duration="1s" />
									)
								})
							}
						</div>
					)}
					<div className="ytp_meta_data" style={(multiitems) ? { 'width': '100%' } : null}>
						{(multiitems) && (
							<div>
								<p>Autoplay</p>
								<div className="switch-container position-relative form-group">
									<label className="switch">
										<input checked={autoplay} onChange={(e) => { setAutoplay(e.target.checked) }} type="checkbox" className="form-check-input" />
										<span className="slider round"></span>
									</label>
								</div>
							</div>
						)}

						{(transcript && transcript != []) &&
							<div>
								<h3>Video Transcript</h3>
								<span className="ytp_transcript">
									{(transcript).map(script => {
										return (
											<span key={script.$.start} onClick={handleTranscriptClick} className={(script.active) ? "ytp_active" : null} data-start={script.$.start} data-duration={script.$.dur}>
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
								<span className="ytp_description">{description}</span>
							</div>
						}
						{(resources) &&
							<div>
								<h3>Resources</h3>
								<span className="ytp_resources">
									{(resources).map((resource) => {
										return (
											<a href={resource.link}>
												<div className="resource">
													<h3>{resource.name}</h3>
													<i>{resource.description}</i>
												</div>
											</a>
										)
									})}
								</span>
							</div>
						}

					</div>
				</div>
			</div>
		</div>
	)
}