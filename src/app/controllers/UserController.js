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

    if(!name || typeof name === undefined || typeof name === null) {
      return response.status(400).json({
        error: true,
        message: "Field name required!",
        code: 102,
      });
    }

    if(!email || typeof email === undefined || typeof email === null) {
      return response.status(400).json({
        error: true,
        message: "Field email required!",
      })
    }

    if(!password || typeof password === undefined || typeof password === null) {
      return response.status(400).json({
        error: true,
        message: "Field password required!",
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

    const user = await User.create({
      name,
      email,
      password,
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