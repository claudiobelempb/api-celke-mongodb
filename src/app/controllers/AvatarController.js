import fs from 'fs';
import User from '../models/User';

class AvatarController {

  async update(request, response){
    const _id = request.userId;
    // console.log(_id);
    const { originalname, filename } = request.file;

    const avatar = {
      avatarOriginalName: originalname,
      avatarName: filename,
    }
    console.log(avatar);

    const user = await User.findOne({_id }, '_id avatar');

    if(!user){
      return response.status(400).json({
        error: true,
        message: "User not found!",
        code: 130,
      });
    }

    const data = await User.updateOne({ _id }, avatar);

    if(!data){
      return response.status(400).json({
        error: true,
        message: "User not found!",
        code: 131,
      });
    }

    return response.json({
      error: false,
      message:" Avatar created success!",
      code: 127,
    });
  }
}

export { AvatarController };