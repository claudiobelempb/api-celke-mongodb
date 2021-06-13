import * as yup from 'yup';
import { hash } from 'bcryptjs';
import User from '../models/User';

class ProfileController {

  async show(request, response) {
    try{
      const _id = request.userId;
      console.log(_id);
      const user = await User.findOne({_id}, '_id name email createdAt updatedAt');
      console.log(user._id);

      if(!user){
        return response.json({
          error: true,
          message: "Profile not found!",
          code: 120,
        });
      }

      return response.json({
        error: false,
        user,
      });

    }catch(error){
      return response.status(201).json({
        error: false,
        message: "Profile not found",
        code: 121,
      });
    }
  }

  async update(request, response){
    const _id = request.userId;
    const { name, email, password } = request.body;

    const schema = yup.object().shape({
      name: yup.string().min(6).max(40),
      email: yup.string().email(),
      password: yup.string().min(6),
    });

    if(!(await schema.isValid({
      name,
      email,
      password,
    }))){
      return response.status(400).json({
        error: true,
        message: "Required field!",
        code: 122,
      });
    }

    const user = await User.findOne({ _id });

    if(!user) {
      return response.status(400).json({
        error: true,
        message: "User not found!",
        code: 123,
      });
    }

    if(email !== user.email) {
      const emailExists = await User.findOne({email});
      if(emailExists){
        return response.status(400).json({
          error: true,
          message: "Email already exist in the database",
          code: 124,
        })
      }
    }

    let newPassword = password;
    if(password !== user.password){
      newPassword = await hash(password, 8);
    }

    const data = {
      name,
      email,
      password: newPassword,
    }

    try{

      await User.updateOne({ _id }, data);

      return response.json({
        error: false,
        message: "Profile updated success",
        code: 125,
      });

    }catch(error){
      return response.status(400).json({
        error: true,
        message: "Profile not found!",
        code: 126,
      });
    }
  }
}

export { ProfileController };