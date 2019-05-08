import React, { useState, useEffect } from 'react'
import Display from './Display';
import axios from 'axios';
import PhotoGallery from './PhotoGallery';
import Container from './Container';
import moment from 'moment';
import BlogCoverPhoto from './BlogPage';

export default function WorkPage(props) {

	const [work, setWork] = useState({});

	useEffect(() => {
		axios.get('/api/works/' + props.id).then((res) => {
			console.log(res.data);
			setWork(res.data);
		})
	}, []);


	return (
		<Container>
			<BlogCoverPhoto src={work.thumb_src} title={work.name} date={moment(work.date).format('ll')} />
			<p>{work.description}</p>
		</Container>
	)
}
