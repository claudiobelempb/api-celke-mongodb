import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'tmp/uploads/users');
console.log(tmpFolder);

const uploadCelke = {
  directory: tmpFolder,
  destination: tmpFolder,
  storage: multer.diskStorage({
    destination: function(request, file, callback){
      callback(null, tmpFolder);
    },
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileHash}${path.extname(file.originalname)}`;

      return callback(null, fileName);
      // crypto.randomBytes(16, (error, response) => {
      //   if(error) return callback(error);
        
      //   return callback(null, response.toString('hex') + path.extname(file.originalname));
      // });
    }
   }),
   fileFilter: (request, file, callback ) => {

    switch(file.mimetype) {
      case "image/jpeg":
      case "image/jpeg":
      case "image/png":
        return callback(null, true);
    }

    return callback(null, false);
    //  if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    //    return callback(null, true);
    //  } else {
    //    return callback(null, false);
    //  }
   }
}

export { uploadCelke };