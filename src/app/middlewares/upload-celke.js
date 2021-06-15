import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'tmp/uploads/users');
console.log(tmpFolder);

const uploadCelke = {
  destination: tmpFolder,
  storage: multer.diskStorage({
    destination: function(request, file, callback){
      callback(null, tmpFolder);
    },
    filename: (request, file, callback) => {
      crypto.randomBytes(16, (error, response) => {
        if(error) return callback(error);
        
        return callback(null, response.toString('hex') + path.extname(file.originalname));
      });
    }
   }),
}

export { uploadCelke };