import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import moment from 'moment';

const axios = require('axios');
const Work = (props) => {
	return (
		<Link tabindex='0' to={"/work/" + props._id}>
			<div className="work">
				<div className="workCover" style={{ 'backgroundImage': 'url(\'' + props.thumb_src + '\')' }} ></div>
				<div className="workText">
					<h3>{props.name}</h3>
					<i>{moment(props.date).format("ll")}</i>
					<p>{props.description}</p>
				</div>
			</div>
		</Link>
	)
}

const Folio = () => {
	const [works, setWorks] = useState([]);
	useEffect(() => {
		axios.get('/api/works').then((resp) => {
			console.log(resp.data);
			setWorks(resp.data);
		});

	}, [])
	return (
		<div className="folioContainer">
			{works.map((work) => {
				return (
					<Work key={work._id} {...work} />
				)
			})}
		</div>
	)
}


export default Folio

