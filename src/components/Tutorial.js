import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Post = (props) => {
	return (
		<div className="postContainer" >
			<div className="postBGContainer">
				<div className="postBg" style={{ 'backgroundImage': 'url(\'' + props.feature_image + '\'' }}><div className="postDarker"></div></div>
				<div className="postImage"><img src={props.feature_image} /></div>
			</div>
			<div className="postText">
				<div className="postTitle">{props.title}</div>
				<div className="postDate"><i>{props.author + " | " + moment(props.date).format('ll')}</i></div>
				<div className="postDescription">{props.social_description}</div>
			</div>
		</div>
	)
}

export default function Tutorial() {

	const [tutorials, setTutorials] = useState([]);

	useEffect(() => {
		axios.get('/api/tutorial').then((res) => {
			setTutorials(res.data);
		})
	}, []);

	return (
		<div>
			<h1>Tutorials</h1>
			{!tutorials.length &&
				<h3>There arent any tutorials here yet</h3>
			}
			{tutorials.map((post) => {
				return (
					<Link tabindex='0' to={"/tutorials/" + post._id}>
						<Post {...post} />
					</Link>
				)
			})}
		</div>
	)
}

