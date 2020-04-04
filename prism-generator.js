let Entities = require('html-entities').AllHtmlEntities;
let fs = require('fs');
const entities = new Entities();
fs.readFile(process.argv[2], (err, data) => {

	let output = "";
	let outputFlat = "";
	if (err) {
		console.log(err);
	} else {
		data = data.toString();
		// console.log(data);
		data = data.split("\n");
		// console.log(data);
		let lang = "";
		let fileExtension = process.argv[2].slice(process.argv[2].length - 2, process.argv[2].length)

		if (fileExtension == "js") {
			lang = "js";
		} else if (fileExtension == "py") {
			lang = "python";
		}


		let lowerBound = parseInt(process.argv[3]);
		let upperBound = parseInt(process.argv[4]);
		for (let i = lowerBound; i < upperBound; i++) {
			console.log("LOOP");
			output += "\t<code class=\"language-" + lang + "\">" + entities.encode(data[i]) + "</code>\n";
			outputFlat += "<code class=\"language-" + lang + "\">" + entities.encode(data[i]) + "</code>\\n";
		}


		output = "<pre class=\"language-" + lang + "\">\n" + output + "</pre>";
		outputFlat = "<pre class=\"language-" + lang + "\">\\n" + outputFlat + "</pre>";
		outputFlat = outputFlat.replace(/"/g, '\\\"');
		console.log(output);
		console.log(outputFlat);
	}


})