import * as yup from "yup";
import { hash } from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User";

class UserController {

  constructor(){
    
  }

  async index(request, response) {
    try{
      const { page = 1 } = request.query;
      const { limit = 2 } = request.query;
      // const users = await User.find().select('-password');
      const users = await User.paginate({}, {select: '_id name email', page, limit});

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
      const user = await User.findOne({ _id: id }).select('-password');

      if(!user) {
        return response.status(400).json({
          error: true,
          message: 'User not found!',
          code: 112,
        });
      }

      return response.json({user});
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

  async update(request, response){

    console.log(request.userId);
    const { id } = request.params;
    const { name, email } = request.body;

    const user = await User.findOne({_id: id});

    if(!user){
      return response.status(400).json({
        error: true,
        message: "User not found!",
        code: 213,
      });
    }

    return response.status(201).json({
      error: false,
      message: "User update success!",
      code: 212,
    });
  }

};

export { UserController };