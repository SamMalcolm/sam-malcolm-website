import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';

export default function Blog() {

	const [blogPosts, setBlogPosts] = useState([]);

	useEffect(() => {
		axios.get('/api/blog').then((res) => {
			setBlogPosts(res.data);
		})
	}, []);

	return (
		<div>
			<h1>Blog</h1>
			{blogPosts.map((post) => {
				return (
					<Link tabindex='0' to={"/blog/" + post._id}>
						<Post {...post} />
					</Link>
				)
			})}
		</div>
	)
}

