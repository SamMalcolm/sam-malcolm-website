import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from './Container';
import moment from 'moment';
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

const BlogCoverPhoto = (props) => {
	return (
		<div className="blogCoverContainer">
			<div className="blogCover">
				<img src={window.bucket + props.src} />
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
				<div dangerouslySetInnerHTML={{ __html: post.markup }}>
				</div>
			</Container>

		</div >
	)

}
export { BlogCoverPhoto, BlogPage };