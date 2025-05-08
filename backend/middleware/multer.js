import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination:function (req,res,cb){
        cb(null,'menu_images');
    },
    filename:function (req,file,cb){
        cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage });

// Exporting the upload instance
export default upload;