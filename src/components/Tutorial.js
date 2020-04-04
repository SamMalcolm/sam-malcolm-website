import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Post from './Post';


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

