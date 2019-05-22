import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from './Container';
import moment from 'moment';

const BlogCoverPhoto = (props) => {
	return (
		<div className="blogCoverContainer">
			<div className="blogCover">
				<img src={props.src} />
				<div className="gradientCover">
					<div className="blogCoverTitle">
						<h2>{props.title}</h2>
						<i>{moment(props.date).format('ll')}</i>
					</div>
				</div>
			</div>
		</div>
	)
}

const BlogPage = (props) => {

	const [post, setPost] = useState({});

	useEffect(() => {
		axios.get('/api/blog/' + props.id).then((result) => {
			setPost(result.data);
		})
	}, []);

	return (
		<div>
			<BlogCoverPhoto title={post.title} date={post.date} src={post.feature_image} />
			<Container>
				<div dangerouslySetInnerHTML={{ __html: post.markup }}>
				</div>
			</Container>

		</div >
	)

}
export { BlogCoverPhoto, BlogPage };