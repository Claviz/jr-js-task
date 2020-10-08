
const multer = require('multer');

//making sure user is trying to upload an excel file
const excelFilter = (req, file, cb) => {
	if (file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml")) {
		cb(null, true);
	} else {
		cb("Please upload only excel file.", false);
	}
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './src/uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
	}
}); 

const upload = multer({ storage: storage, fileFilter: excelFilter });

module.exports = upload;