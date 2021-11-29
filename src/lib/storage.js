const { Router } = require('express'); 

const router = new Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const uploadImage = multer({
    storage,
    limits: {fileSize: 1000000}
}).single('image');


module.exports = router;
