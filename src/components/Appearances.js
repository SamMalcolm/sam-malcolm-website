import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment';

const Ticket = (props) => {
	return (
	<svg className="ticket" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
		 viewBox="0 0 449 447" >

	<g>
		<path className="ticketPath" style={{'fill':props.highlight, 'strokeWidth':13}} d="M301.83,43.92c2.81,0,5.48,1.07,7.51,3.01l19.46,18.58c-2.27,5.12-3.4,10.72-3.27,16.48c0.24,10.26,4.46,19.82,11.89,26.91
			c7.18,6.86,16.61,10.63,26.54,10.63c6,0,11.89-1.43,17.18-4.07l19.49,18.6c4.34,4.14,4.5,11.04,0.36,15.38L148.41,414.07
			c-2.07,2.17-4.87,3.37-7.87,3.37c-2.81,0-5.48-1.07-7.51-3.01l-91.29-87.14c-4.34-4.14-4.5-11.04-0.36-15.38L293.96,47.29
			C296.03,45.12,298.83,43.92,301.83,43.92L301.83,43.92 M301.83,30.92c-6.3,0-12.59,2.48-17.28,7.39L31.98,302.93
			c-9.11,9.54-8.75,24.66,0.79,33.76l91.29,87.14c4.62,4.41,10.56,6.61,16.49,6.61c6.3,0,12.59-2.48,17.28-7.39l252.58-264.61
			c9.11-9.54,8.75-24.66-0.79-33.76l-27.24-26.01c-5,5.24-11.7,7.87-18.4,7.87c-6.31,0-12.63-2.33-17.56-7.04
			c-10.16-9.7-10.54-25.8-0.84-35.96l-27.24-26.01C313.69,33.11,307.76,30.92,301.83,30.92L301.83,30.92z"/>
	</g>
	<g>
		<line className="st0" x1="339.65" y1="226.31" x2="214.6" y2="111.54"/>
		<g>
			<line style={{'fill':props.highlight, 'strokeWidth':13}} className="st1" x1="339.65" y1="226.31" x2="335.23" y2="222.25"/>
			<line style={{'fill':props.highlight, 'strokeWidth':13}} className="st2" x1="326.29" y1="214.05" x2="223.49" y2="119.7"/>
			<line style={{'fill':props.highlight, 'strokeWidth':13}} className="st1" x1="219.02" y1="115.59" x2="214.6" y2="111.54"/>
		</g>
	</g>

	</svg>
	

)
}

export default function Appearances(props) {
	const [appearances, setAppearances] = useState([]);

	useEffect(() => {
		axios.get('/api/appearances').then((resp) => {
			setAppearances(resp.data);
		})
	}, []);
	return (
		<table className="appearances">
			<thead>
				<th>Date</th>
				<th>Event</th>
				<th>Name</th>
				<th>Location</th>
				<th style={{ 'textAlign': 'center' }}>Tickets</th>
				<th style={{ 'textAlign': 'center' }}>Info</th>
				<th style={{ 'textAlign': 'center' }}>Photos</th>
			</thead>
			<tbody>
				{appearances.map((appearance) => {
					return (
						<tr>
							<td>{moment(appearance.date).format('lll')}</td>
							<td>{appearance.event}</td>
							<td>{appearance.name}</td>
							<td>{appearance.location}</td>
							<td style={{ 'textAlign': 'center' }}>
								{(appearance.tickets) ?
									<a target="_blank" href={appearance.tickets}>
										<Ticket highlight={props.highlight} />
									</a>

									: <td></td>}

							</td>
							<td style={{ 'textAlign': 'center' }}>
								{(appearance.info) ?
									<a target="_blank" href={appearance.info}>
										info
									</a>

									: <td></td>}
							</td>
							<td style={{ 'textAlign': 'center' }}>
								{(appearance.photos) ?
									<a target="_blank" href={appearance.photos}>
										photos
									</a>

									: <td></td>}

							</td>
						</tr>
					)
				})}
			</tbody>

		</table>
	)
}
