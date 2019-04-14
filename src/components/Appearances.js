import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment';

const Ticket = (props) => {
	return (
		<svg className="ticket" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" style={{"enable-background":"new 0 0 200 200"}}>
			<g>
				<path style={{'fill':props.highlight}} d="M182.89,53.15l-11.96-11.41c-2.19,2.3-5.13,3.46-8.08,3.46c-2.77,0-5.55-1.02-7.71-3.09c-4.46-4.26-4.62-11.33-0.37-15.79
		L142.82,14.9c-2.03-1.94-4.64-2.9-7.24-2.9c-2.76,0-5.52,1.09-7.58,3.24L100.07,44.5L100,44.44l-3.41,3.71l-79.46,83.24
		c-4,4.19-3.84,10.82,0.34,14.82l40.07,38.25c2.03,1.94,4.64,2.9,7.24,2.9c2.76,0,5.52-1.09,7.58-3.24L183.23,67.97
		C187.23,63.78,187.08,57.14,182.89,53.15z M177.45,62.44L66.58,178.59c-0.64,0.67-1.4,0.77-1.8,0.77c-0.45,0-1.12-0.12-1.71-0.69
		l-40.07-38.25c-0.61-0.59-0.76-1.27-0.77-1.74c-0.01-0.47,0.1-1.16,0.69-1.77L133.79,20.77c0.64-0.67,1.4-0.77,1.8-0.77
		c0.45,0,1.12,0.12,1.71,0.69l7.44,7.1c-2.35,6.86-0.69,14.77,4.89,20.1c3.58,3.42,8.28,5.3,13.23,5.3c2.44,0,4.84-0.47,7.07-1.36
		l7.44,7.1c0.61,0.59,0.76,1.27,0.77,1.74C178.14,61.14,178.03,61.83,177.45,62.44z"/>
				<rect style={{'fill':props.highlight}} x="107.16" y="55.5" transform="matrix(0.6761 -0.7368 0.7368 0.6761 -8.2851 101.3739)" width="8" height="9.21"/>
				<rect style={{'fill':props.highlight}} x="120.74" y="67.96" transform="matrix(0.6762 -0.7367 0.7367 0.6762 -13.0755 115.394)" width="8" height="9.21"/>
				<rect style={{'fill':props.highlight}} x="134.31" y="80.43" transform="matrix(0.6762 -0.7367 0.7367 0.6762 -17.8597 129.4315)" width="8" height="9.21"/>
			</g>
		</svg>
	)
}

const Information = (props) => {
	return (
<svg className="information" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
	 viewBox="0 0 200 200" style={{"enableBackground":"new 0 0 200 200"}}>
<circle style={{"fill":"none","stroke":props.highlight}} className="st0" cx="99.95" cy="99.75" r="81.05"/>
<text style={{ 'fill':props.highlight }} transform="matrix(1 0 0 1 84.4004 146.457)" className="st1 st2">i</text>
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
							<td>{moment(appearance.date).format('ll')}</td>
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
										<Information highlight={props.highlight} />
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
