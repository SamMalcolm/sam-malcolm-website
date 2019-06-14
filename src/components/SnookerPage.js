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
	const [winLossPercent, setWinLossPercent] = useState("");
	const [winLossFramePercent, setWinLossFramePercent] = useState("");
	const [comps, setComps] = useState([]);
	const [snooker, setSnooker] = useState(true);

	const getMatchPercentage = (data, snooker) => {
		let sum = 0;
		let wonsum = 0;
		for (let i = 0; i < data.length; i++) {
			if (snooker) {
				if (i < 2) {
					wonsum += data[i];
				}
			} else {
				if (i == 0) {
					wonsum += data[i];
				}
			}
			sum += data[i]
		}
		return Math.ceil(((wonsum / sum) * 100) * 10) / 10 + "%";
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
		return Math.ceil(((wonsum / sum) * 100) * 10) / 10 + "%";
	}

	const changeComp = (index) => {
		setWinLoss(comps[index].winLoss);
		setWinLossPercent(getMatchPercentage(comps[index].winLoss.datasets[0].data, comps[index].snooker));
		setWinLossFramePercent(getFramePercentage(comps[index].winLoss.datasets[0].data));
		setLadder(comps[index].ladder);
		setHandicap(comps[index].handicap);
		setCompname(comps[index].compname);
		setSnooker(comps[index].snooker);
	}

	useEffect(() => {
		Axios.get("/api/snooker/all").then((resp) => {
			setComps(resp.data);
			setWinLoss(resp.data[0].winLoss);
			setWinLossPercent(getMatchPercentage(resp.data[0].winLoss.datasets[0].data, resp.data[0].snooker));
			setWinLossFramePercent(getFramePercentage(resp.data[0].winLoss.datasets[0].data));
			setLadder(resp.data[0].ladder);
			setHandicap(resp.data[0].handicap);
			setCompname(resp.data[0].compname);
			setSnooker(resp.data[0].snooker);
		})
	}, [])

	return (
		<div>
			{(comps.length) ?
				<select className="snookerSelect" onChange={(e) => {
					changeComp(e.target.value)
				}}>
					{comps.map((comp, i) => {
						console.log(i);
						return (
							<option
								value={i}>{comp.compname}</option>
						)
					})} </select> : null}
			<div className="season">
				<h1>{compname}</h1>
				<div className="donutContainer">
					<h3>Win/Loss</h3>
					<Doughnut data={winLoss} options={{ maintainAspectRatio: true }} />
					<h3>Win Percentage</h3>
					<div className="winStatsContainer">
						<div className="percent">
							<h4>By Match</h4>
							<h1>{winLossPercent}</h1>
						</div>
						{(snooker) ?
							<div className="percent">
								<h4>By Frame</h4>
								<h1>{winLossFramePercent}</h1>
							</div> : null}

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
