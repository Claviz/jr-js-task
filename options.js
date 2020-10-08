const multer = require("multer");

global.__basedir = __dirname;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/src/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = { upload };
