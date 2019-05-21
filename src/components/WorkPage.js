import React, { useState, useEffect } from 'react'
import Display from './Display';
import axios from 'axios';
import Container from './Container';
import moment from 'moment';
import { BlogCoverPhoto } from './BlogPage';
import ReactBnbGallery from 'react-bnb-gallery';

import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	RedditShareButton,
	FacebookIcon,
	TwitterIcon,
	RedditIcon,
	LinkedinIcon,
} from 'react-share';

const VideoContainer = (props) => {
	return (
		<div className="videoTheatre">
			<div className="containerContainer">
				<div className="iframeContainer">
					<iframe src={props.src} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
				</div>
			</div>
		</div>
	)
}

export default function WorkPage(props) {

	const [work, setWork] = useState({});
	const [galleryVisible, setGalleryVisible] = useState(false);
	useEffect(() => {
		axios.get('/api/works/' + props.id).then((res) => {
			console.log(res.data);
			setWork(res.data);
		})
	}, []);

	return (
		<div>
			{(work.type != 1) ?
				<BlogCoverPhoto src={work.thumb_src} title={work.name} date={moment(work.date).format('ll')} />
				: <VideoContainer src={work.src} />}
			<Container>
				{(work.type == 1) ? <div>
					<h1>{work.name}</h1>
					<i>{moment(work.date).format('ll')}</i>
				</div>
					: <p>{work.description}</p>}
				{(work.type == 2) ?
					<div>
						<a href="#" style={{ 'borderColor': props.highlight }} className="smBtn" onClick={() => { setGalleryVisible(true) }}>View Gallery</a>
						<ReactBnbGallery onClose={() => { setGalleryVisible(false) }} photos={work.data} show={galleryVisible} />
					</div> : null}
				{(work.type == 3) ?
					<a href={work.src} style={{ 'borderColor': props.highlight }} className="smBtn" target="_blank">{"View " + work.name}</a>
					: null}
				<div className="shareContainer">
					<FacebookShareButton url={window.location.href}>
						<FacebookIcon size={32} round={true} />
					</FacebookShareButton>
					<TwitterShareButton url={window.location.href}>
						<TwitterIcon size={32} round={true} />
					</TwitterShareButton>
					<RedditShareButton url={window.location.href} >
						<RedditIcon size={32} round={true} />
					</RedditShareButton>
					<LinkedinShareButton url={window.location.href} >
						<LinkedinIcon size={32} round={true} />
					</LinkedinShareButton>
				</div>
			</Container>
		</div>
	)
}
