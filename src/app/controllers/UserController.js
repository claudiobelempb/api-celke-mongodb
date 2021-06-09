import * as yup from "yup";
import { hash } from "bcryptjs";
import User from "../models/User";

class UserController {

  constructor(){
    
  }

  async index(request, response) {
    const users = await User.find();
    return response.json(users)
  }
  
  async store(request, response){
    const {name, email, password } = request.body;

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

    const emailAlreadyExists = await User.findOne({
      email,
    });

    if(emailAlreadyExists){
      return response.status(400).json({
        error: true,
        message: "Email already exists!",
        code: 102,
      });
    }

    const hashPassword = await hash(password, 8);

    const user = await User.create({
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

};

export { UserController };