import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

export default function Menu(props) {

	const [blogPosts, setBlogPosts] = useState([]);

	useEffect(() => {
		axios.get(props.dataSource).then((res) => {
			setBlogPosts(res.data);
		})
	}, []);

	return (
		<div>
			<h1>{props.menuName}</h1>
			{blogPosts.map((post) => {
				return (
					<Link tabindex='0' to={props.urlPath + post._id}>
						<Post {...post} />
					</Link>
				)
			})}
		</div>
	)
}

