import express from 'express';
import "dotenv/config";
import uploadRoutes from './routes/uploadRoutes.js';
import multer from 'multer';

const app = express();
const port = process.env.PORT;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer( { storage: storage } );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", upload.array("files"), uploadFiles);
function uploadFiles(req, res){
    console.log(req.body);
    console.log(req.files);
}
    
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
