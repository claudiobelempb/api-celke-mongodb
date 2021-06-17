import * as yup from "yup";
import { hash } from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User";

import config from '../../config/config';

class UserController {

  constructor(){
    
  }

  async index(request, response) {
    try{
      const { page = 1 } = request.query;
      const { limit = 10 } = request.query;
      // const users = await User.find().select('-password');
      const users = await User.paginate({}, {select: '_id name email avatarName', page, limit});

      return response.json({
        error: false,
        users,
      });
    }catch(error){
      return response.status(400).json({
        error: true,
        message: "Not default!",
        code: 116,
      });
    }
  }

  async show(request, response) {
    try{
      const { id } = request.params;
      /* const user = await User.findOne({ _id: id }).select('-password'); */
      const user = await User.findOne({ _id: id }, '_id name email avatar createdAt updatedAt');

      if(!user) {
        return response.status(400).json({
          error: true,
          message: 'User not found!',
          code: 112,
        });
      }

      return response.json({
        user,
        url: `${config.url}/files/users/${user.avatar}`,
      });
    }catch(error){
      return response.status(400).json({
          error: true,
          message: 'User not found!',
          code: 112,
        });
    }
  }
  
  async store(request, response){
    const { name, email, password } = request.body;

    /*if(!name || typeof name === undefined || typeof name === null) {
      return response.status(400).json({
        error: true,
        message: "Field name required!",
        code: 102,
      });
    }*/

    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
    });

    if(!(await schema.isValid({
      name,
      email,
      password
    }))) {
      return response.status(400).json({
        error: true,
        message: "Field invalid!",
        code: 103,
      });
    };

    const user = await User.findOne({
      email,
    });

    // console.log(user);

    if(user){
      return response.status(400).json({
        error: true,
        message: "Email already exists!",
        code: 102,
      });
    }

    const hashPassword = await hash(password, 8);

    User.create({
      name,
      email,
      password: hashPassword,
    }, (error) => {
      if(error) return response.status(400).json({
        error: true,
        code: 101,
        message: "User not create!",
      });
      return response.status(200).json({
        error: false,
        message: "User create success!",
        data: user,
      });
    });
  }

  async update(request, response){
    // search field _id 
    // const  _id  = request.userId;
    // console.log(_id);
    // search field name, email, password
    const { _id, name, email, password } = request.body;
    // console.log(name, email, password);
    // valid fields is yup
    const schema = yup.object().shape({
      _id: yup.string().required(),
      name: yup.string(),
      email: yup.string().email(),
      password: yup.string().min(6),
    });

    if(!(await schema.isValid({
      _id,
      name,
      email,
      password,
    }))){
      return response.status(400).json({
        error: true,
        message: "Field required!",
        code: 116,
      })
    }
    // verify se o user already exists
    const user = await User.findOne({_id});
    // console.log(user);

    if(!user){
      return response.status(400).json({
        error: true,
        message: "User already exists!",
        code: 213,
      });
    }

    if(email !== user.email) {
      const userEmailExists = await User.findOne({email});
      if(userEmailExists){
        return response.status(400).json({
          error: true,
          message: "Email already exists",
          code: 214,
        });
      }
    }

    let newPassword = password;
    if(password !== user.password) {
      newPassword = await hash(password, 8);
    }
    
    // valid password
    const data = {
      _id,
      name,
      email,
      password: newPassword,
    }
    
    // update

    try{
      await User.updateOne({_id}, data);

      return response.status(201).json({
        error: false,
        message: "User update success!",
        code: 212,
      });
      
    }catch(error) {
      return response.status(201).json({
        error: true,
        message: "User update error!",
        code: 212,
      });
    }
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: true,
        message: "User not found!",
        code: 110,
      });
    }
    
    const user = await User.findOne({_id: id});

    if(!user){
      return response.status(400).json({
        error: true,
        message: "User not found!",
        code: 111,
      });
    }

    await User.deleteOne(user);

    return response.json({
      error: false,
      message: "User delete success!",
      code: 106,
    });
  }

};

export { UserController };