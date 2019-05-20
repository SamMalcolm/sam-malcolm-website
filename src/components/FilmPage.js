import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import moment from 'moment';

const Letterboxd = (props) => {
	return (
		<div className="lb">
			<h3>{props.title[0]}</h3>
			<br />
			<i>{moment(props.pubDate[0]).format('ll')}</i>
			<div className="lbdescr" dangerouslySetInnerHTML={{ __html: props.description[0] }}>
			</div>

		</div>
	)
}

const YouTubeReview = (props) => {
	return (
		<div>{props.snippet.title}</div>
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
			{(reviews).map((review) => {
				return (
					<div>
						<div className="divider"></div>
						{(review.guid) ? <Letterboxd {...review} /> : <YouTubeReview {...review} />}
					</div>
				)
			})}
		</div>
	)
}
