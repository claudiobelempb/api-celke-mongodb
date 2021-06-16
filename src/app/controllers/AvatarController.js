import fs from 'fs';
import path from 'path';
import { uploadCelke } from '../middlewares/upload-celke'
import User from '../models/User';

class AvatarController {

  async update(request, response){
    const _id = request.userId;
    // console.log(_id);
    const { originalname, filename } = request.file;

    const avatarImage = {
      avatarOriginalName: originalname,
      avatarName: filename,
    }
    // console.log(avatarImage);

    await User.findOne({_id }, '_id avatarName').then((user) => {
      request.avatarImgUser = user.avatarName;
    }).catch((error) => {
      return response.status(400).json({
        error: true,
        message: "User not found!",
        code: 130,
      });
    });

    await User.updateOne({ _id }, avatarImage, (error) => {
      if(error) return response.status(400).json({
        error: true,
        message: "Avatar cannot be updated!",
        code: 140,
      });
    });

    // await fs.promises.unlink(path.join(uploadCelke.directory, request.avatarImgUser));

    const imgAntiga = uploadCelke.destination + "/" + request.avatarImgUser;
    console.log(imgAntiga);
    
    fs.access(imgAntiga, (error) => {
      if(!error){
        fs.unlink(imgAntiga, (erro) => {
          
        });
      }
    });

    // const avatarDestination = destination + "/" + avatar.avatarName;
    // fs.access(avatarDestination, (error) => {
    //   if(!error){
    //     fs.unlink(avatarDestination, (error) => {

    //     });
    //   }
    // });

    return response.json({
      error: false,
      message:" Avatar success updated!",
      code: 127,
    });
  }
}

export { AvatarController };