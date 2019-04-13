import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Post = (props) => {
	return (
		<div className="postContainer" >
			<div className="postBg" style={{ 'backgroundImage': 'url(\'' + props.feature_image + '\'' }}><div className="postDarker"></div></div>

			<div className="postImage"><img src={props.feature_image} /></div>
			<div className="postText">
				<div className="postTitle">{props.title}</div>
				<div className="postDate"><i>{moment(props.date).format('lll')}</i></div>
				<div className="postAuthor"><i>{props.author}</i></div>
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

