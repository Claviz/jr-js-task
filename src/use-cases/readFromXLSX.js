
const { getXlsxStream } = require('xlstream');

module.exports = async function(filepath) {
	
	const stream = await getXlsxStream({
		filePath: filepath,
		sheet: 0,
	});
	
	let column = 'A';
	
	//counting while reading from the file
	
	return new Promise((resolve, reject) => {
		let count = 0;
		stream.on('data', chunk => {
			count += chunk.formatted.obj[column];
		});

		stream.on('end', () => {
			return resolve({ status: 200, response: `SUM is ${count}` });
		});

		stream.on('error', (err) => {
			console.log(err);
			return reject({status: 500, response: 'error while reading from the xlsx file'});
		});

	});

};