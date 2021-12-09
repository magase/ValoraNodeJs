const { Router } = require('express');
const path = require('path');

const router = Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'), 
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

 const upload = multer({
    storage,
    dest: path.join(__dirname, '../public/uploads')
}).single('imagen')

router.post('/incidencias/add', upload,(req, res) =>{
    console.log(req.file)
    res.send('uploaded')
});

module.exports = router;