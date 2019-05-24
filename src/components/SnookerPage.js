import React, { useState, useEffect } from 'react'
import { defaults, Doughnut, Line } from "react-chartjs-2";
import Axios from 'axios';
defaults.global.defaultFontColor = "#FFFFFF";

let options = {
	maintainAspectRatio: true,
	fill: false,
	elements: {
		line: {
			tension: 0 // disables bezier curves
		},
		ticks: {
			invert: true
		}
	}
}

export default function SnookerPage() {
	const [compname, setCompname] = useState("");
	const [winLoss, setWinLoss] = useState({});
	const [handicap, setHandicap] = useState({});
	const [ladder, setLadder] = useState({});

	const getMatchPercentage = (data) => {
		let sum = 0;
		let wonsum = 0;
		for (let i = 0; i < data.length; i++) {
			if (i < 2) {
				wonsum += data[i];
			}
			sum += data[i]
		}
		return Math.ceil(((wonsum / sum) * 100) * 100) / 100 + "%";
	}

	const getFramePercentage = (data) => {
		let sum = 0;
		let wonsum = 0;
		for (let i = 0; i < data.length; i++) {
			if (i == 0) {
				wonsum += data[i] * 3;
			} else if (i == 1) {
				wonsum += data[i] * 2;
			}
			sum += data[i] * 3;
		}
		return Math.ceil(((wonsum / sum) * 100) * 100) / 100 + "%";
	}

	const changeComp = (id) => {
		console.log(id);
	}

	const [comps, setComps] = useState([]);

	useEffect(() => {
		Axios.get("/api/snooker/all").then((resp) => {
			setComps(resp.data);
		})
	}, [])

	return (
		<div>

			<select onChange={(e) => {
				changeComp(e.value);
			}}>
				<option></option>

				{comps.map((comp) => {
					return (
						<option value={comp._id}>{comp.compname}</option>
					)
				})}

			</select>
			<div className="season">
				<h1>{compname}</h1>
				<div className="donutContainer">
					<h3>Win/Loss</h3>
					<Doughnut data={winLoss} options={{ maintainAspectRatio: true }} />
					<h3>Win Percentage</h3>
					<div className="winStatsContainer">
						<div className="percent">
							<h4>By Match</h4>
							<h1>{getMatchPercentage(winLoss.datasets[0].data)}</h1>
						</div>
						<div className="percent">
							<h4>By Frame</h4>
							<h1>{getFramePercentage(winLoss.datasets[0].data)}</h1>
						</div>
					</div>
				</div>
				<div className="handicapContainer">
					<h3>Handicap</h3>
					<Line data={handicap} options={options} />
					<h3>Ladder Position</h3>
					<Line data={ladder} options={options} />
				</div>
			</div>
		</div>
	)
}
