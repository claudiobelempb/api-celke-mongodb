import fs from 'fs';
import path from 'path';
import { uploadCelke } from '../middlewares/upload-celke'
import User from '../models/User';

class UserAvatarController {

  async update(request, response){
    const _id = request.userId;

    console.log(request.file);

    if(!request.file){
      return response.status(400).json({
        error: true,
        message: "Select a valid file JPEG, JPG, PNG",
        code: 150,
      })
    }

    const { filename } = request.file;

    const avatar = { avatar: filename };

    const user = await User.findOne({_id }, '_id avatar');
    if(!user) {
      return response.status(400).json({
        error: true,
        message: "User not found!",
        code: 130,
      });
    }

    await User.updateOne({ _id }, avatar);

    if(user.avatar !== avatar){
      await fs.promises.unlink(path.join(uploadCelke.directory, user.avatar));
    }
    // const imgAntiga = path.join(uploadCelke.directory, user.avatarName);
    // fs.access(imgAntiga, (error) => {
    //   if(!error){
    //     fs.unlink(imgAntiga, (error) => {});
    //   }
    // });

    return response.json({
      error: false,
      message:" Avatar success updated!",
      code: 127,
    });
  }
}

export { UserAvatarController };