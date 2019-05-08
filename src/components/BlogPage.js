import React from 'react';

const BlogCoverPhoto = (props) => {
	return (
		<div className="blogCover">
			<img src={props.src} />
			<div className="blogCoverTitle">
				<h2>{props.title}</h2>
				<i>{props.date}</i>
			</div>
		</div>
	)
}

export default BlogCoverPhoto;