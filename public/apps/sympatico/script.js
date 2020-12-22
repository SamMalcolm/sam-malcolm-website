document.querySelector('#randomizeScoreWedge').addEventListener("click", function (e) {
	let wedge = document.querySelector(".wedge");
	let x;
	x = Math.random() * 170;
	x = x - 40;
	wedge.style.transform = "rotate(" + x + "deg)";
});

document.querySelector('#toggleCover').addEventListener("click", function (e) {
	let cover = document.querySelector(".board.cover");
	cover.style.opacity = (cover.style.opacity == 1) ? 0 : 1;
});

document.querySelector("input[type='range']").addEventListener("input", function (e) {
	let tick = document.querySelector('.tick');
	tick.style.transform = "rotate(" + e.target.value + "deg)";
})