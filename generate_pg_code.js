const fs = require('fs');

let pgarr = [];
let path = '/' + process.argv[2].slice(process.argv[2].indexOf("public") + 7, process.argv[2].length) + '/';

function toTitleCase(str) {
	return str.replace(
		/\w\S*/g,
		function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}

console.log(path);
fs.readdir(process.argv[2], (err, files) => {
	if (err) {
		console.log(err);
	}
	console.log(files);
	for (let i = 0; i < files.length; i++) {
		let ext = files[i].slice(files[i].indexOf("."), files[i].length);
		let obj = {};
		obj.photo = path + files[i];
		obj.number = i;
		obj.caption = toTitleCase(files[i].slice(0, files[i].indexOf(".")));
		obj.subCaption = "By Sam Malcolm";
		obj.thumbnail = path + 'tm/' + files[i].slice(0, files[i].indexOf(".")) + '_tm' + ext;
		pgarr.push(obj);
	}
	console.log(pgarr);
})