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

export default function Blog() {

	const [blogPosts, setBlogPosts] = useState([]);

	useEffect(() => {
		axios.get('/api/blog').then((res) => {
			console.log(res);
			setBlogPosts(res.data);
		})
	}, []);

	return (
		<div>
			<h1>Blog</h1>
			{blogPosts.map((post) => {
				return (
					<Link to={"/blog/" + post._id}>
						<Post {...post} />
					</Link>
				)
			})}
		</div>
	)
}

