import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import moment from 'moment';
import Modal from './Modal';

const Letterboxd = (props) => {

	const [visible, setVisible] = useState(false);

	return (
		<div className="poster">
			<div className="lb" onClick={() => { setVisible(true) }} style={(props.poster) ? { 'backgroundImage': 'url(\'' + props.poster + '\')' } : { 'backgroundColor': 'black' }}>
				<div className="starContainer">
					<p className="stars">
						{(props.title[0].indexOf(" - ") != -1) ? props.title[0].slice(props.title[0].indexOf(" - ") + 3, props.title[0].length) : props.title[0]}
					</p>
				</div>
			</div>
			<Modal title={props.title[0]} hideModal={() => { setVisible(false) }} visible={visible} >
				<h3>{props.title[0]}</h3>
				<br />
				<i>{moment(props.pubDate[0]).format('ll')}</i>
				<div className="lbdescr" dangerouslySetInnerHTML={{ __html: props.description[0] }}>
				</div>
			</Modal>
		</div>

	)
}

const YouTubeReview = (props) => {

	const [visible, setVisible] = useState(false);

	return (
		<div className="poster">
			<div className="lb" onClick={() => { setVisible(true) }} style={{ 'backgroundImage': 'url(\'' + props.snippet.thumbnails.medium.url + '\')' }}>
				<div className="starContainer">
					<p className="stars">
						{props.snippet.title}
					</p>
				</div>
			</div>
			<Modal title={props.snippet.title} hideModal={() => { setVisible(false) }} visible={visible} >
				<div className="ytdescr">
					<iframe style={{ 'display': 'block', 'margin': 'auto' }} src={"https://www.youtube.com.au/embed/" + props.contentDetails.videoId} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					<h1>{props.snippet.title}</h1>
					<i>{props.snippet.description}</i>
				</div>
			</Modal>
		</div>

	)
}

export default function FilmPage(props) {

	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		Axios.get('/api/film_data').then((result) => {
			setReviews(result.data);
		})
	}, []);

	return (
		<div>
			<a href="https://letterboxd.com/Samwise_7107/" style={{ 'borderColor': props.highlight }} className="smBtn" target="_blank">Samwise_7107 on Letterboxd</a>
			<a href="https://www.youtube.com/watch?v=FNMD9KJ8XC4&list=PLYj0yV-4c3WdYKOrfdraM9-2aVzopk4KK" style={{ 'borderColor': props.highlight }} className="smBtn" target="_blank">YouTube Review Playlist</a>
			<br />
			<div className="divider"></div>
			<>
				{(reviews).map((review) => {
					if (review.guid) {
						return <Letterboxd {...review} />
					} else {
						return <YouTubeReview {...review} />
					}
				})}
			</>
		</div >
	)
}
