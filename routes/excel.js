const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');
const { getXlsxStream } = require('xlstream');

const multerConf = {
    storage: multer.diskStorage({
        destination: function(req,file,cb) {
            cb(null,'./res/excel');
        },
        filename: function(req,file,cb) {
            cb( null, file.originalname+ '-' + Date.now()+".xlsx");
        }
    }),
    fileFilter: function (req,file,cb) {
        if (
            file.mimetype.includes("excel") ||
            file.mimetype.includes("spreadsheetml")
          ) {
            cb(null, true);
          } else {
            cb("Please upload only excel file.", false);
          }
    }
}

router.post('/post',multer(multerConf).single('excel-file'), function (req, res) {
    let sum = 0;
    (async () => {
        const stream = await getXlsxStream({
            filePath: './res/excel/'+ req.file.filename,
            sheet: 0,
        });
        stream.on('data', x => {
            sum += x.raw.arr[0];
        });
        stream.on('end', () => {
            console.log("done");
            res.send('<p>SUM is ' + sum + '</p>');
        });
    })();
});

router.get('/', function (req,res) {
    res.sendFile(path.join(__dirname, '../views', 'excelForm.html'));
})

module.exports = router;