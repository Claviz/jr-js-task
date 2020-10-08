
const app = require("./server-config");
const http = require("http");
const port = process.env.PORT || "3000";
const server = http.createServer(app);


module.exports = async() => {
	try {
		server.listen(port, () => console.log(`running on http://127.0.0.1:${port}/`));
	} catch(err) {
		console.log(err);
	}
};