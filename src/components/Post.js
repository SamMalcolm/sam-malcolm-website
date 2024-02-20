import React from 'react'
import moment from 'moment';

const Post = (props) => {
	return (
		<div className="postContainer">
			<div className="postBGContainer">
				<div className="postBg">
					<div className="postDarker"></div>
					<div className="postbgimg" style={{ 'backgroundImage': 'url(\'' + props.feature_image + '\'' }}></div>
				</div>
			</div>
			<div className="postImage">
				<img src={props.feature_image} />
			</div>
			<div className="postText">
				<h2 className="postTitle">{props.title}</h2>
				<i className="postDate">{props.author + " | " + moment(props.date).format('ll')}</i>
				<p className="postDescription">{props.social_description}</p>
				{props.children}
			</div>

		</div>
	)
}

export default Post;