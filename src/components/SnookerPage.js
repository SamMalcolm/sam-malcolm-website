import React from 'react'
import { defaults, Doughnut, Line } from "react-chartjs-2";
defaults.global.defaultFontColor = "#FFFFFF";

const data = {
	"datasets": [{
		"data": [10, 12, 13, 16],
		"backgroundColor": ["#a0eab3", "#bfedb0", "#edaeae", "#ed9a9a"],
		"borderColor": ["#83db96", "#9fe286", "#e59898", "#e28383"]
	}],
	"labels": [
		"Won 3",
		"Won 2",
		"Lost 2",
		"Lost All"]
};

const dataLine = {
	"datasets": [{
		"data": [
			{
				x: 1,
				y: 55
			},
			{
				x: 2,
				y: 50
			},
			{
				x: 3,
				y: 45
			},
			{
				x: 4,
				y: 45
			},
			{
				x: 5,
				y: 45
			},
			{
				x: 6,
				y: 50
			},
			{
				x: 7,
				y: 55
			},
			{
				x: 8,
				y: 50
			}],
		"label": "Handicap",

		"borderColor": "#83db96",
		"backgroundColor": "#a0eab3"
	}],
	"labels": ["1", "2", "3", "4", "5", "6", "7", "8"],
};

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

	return (
		<div>
			<h1>Overall</h1>
			<div className="season">
				<h1>MSBA Snooker 2018</h1>
				<div className="donutContainer">
					<h3>Win/Loss</h3>
					<Doughnut data={data} options={{ maintainAspectRatio: true }} />
					<h3>Win Percentage</h3>
					<div className="winStatsContainer">
						<div className="percent">
							<h4>By Match</h4>
							<h1>20%</h1>
						</div>
						<div className="percent">
							<h4>By Frame</h4>
							<h1>20%</h1>
						</div>
					</div>
				</div>
				<div className="handicapContainer">
					<h3>Handicap</h3>
					<Line data={dataLine} options={options} />
					<h3>Ladder Position</h3>
					<Line data={dataLine} options={options} />
				</div>
			</div>
			<div className="divider"></div>
			<h1>SBSA Billiards 2018</h1>
			<h1>SBSA Billiards 2019</h1>
			<h1>SBSA Billiards 2019</h1>
		</div>
	)
}
