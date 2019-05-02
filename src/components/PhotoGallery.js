import React, { useState } from 'react'
import ReactBnbGallery from 'react-bnb-gallery';

export default function PhotoGallery() {
	const [galleryVisible, setGalleryVisible] = useState(true);
	const [photos, setPhotos] = useState([{
		"photo": "/assets/backgrounds/flower.jpg",
		"number": 1,
		"caption": "Photo for the Ultra Violet album cover",
		"subcaption": "By Sam Malcolm",
		"thumbnail": "/assets/backgrounds/flower.jpg",
	}, {
		"photo": "/assets/backgrounds/bird.jpg",
		"number": 2,
		"caption": "Photo for the Ultra Violet album cover",
		"subcaption": "By Sam Malcolm",
		"thumbnail": "/assets/backgrounds/bird.jpg",
	},
	{
		"photo": "/assets/backgrounds/toby.jpg",
		"number": 3,
		"caption": "Photo for the Ultra Violet album cover",
		"subcaption": "By Sam Malcolm",
		"thumbnail": "/assets/backgrounds/toby.jpg",
	},]);

	const toggleGalleryOpen = () => {
		// if (galleryVisible) {
		// 	setGalleryVisible(false);
		// } else {
		// 	setGalleryVisible(true);
		// }
		window.location.pathname = "/work"
	}

	return (
		<div>
			<h1>This is a test</h1>
			<ReactBnbGallery
				show={galleryVisible}
				photos={photos}
				onClose={toggleGalleryOpen}
			/>
		</div>
	)
}


