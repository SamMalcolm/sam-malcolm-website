import React from 'react';

const BlogCoverPhoto = (props) => {
	return (
		<div className="blogCoverContainer">
			<div className="blogCover">
				<img src={props.src} />
				<div className="gradientCover">
					<div className="blogCoverTitle">
						<h2>{props.title}</h2>
						<i>{props.date}</i>
					</div>
				</div>
			</div>
		</div>
	)
}

export { BlogCoverPhoto };