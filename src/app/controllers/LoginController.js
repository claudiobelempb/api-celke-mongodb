import { compare } from "bcryptjs";
import configJwt from "jsonwebtoken";
import * as yup from "yup";
import User from "../models/User";
import configAuth from "../../config/auth";

class LoginController {

  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({email});

    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    if(!(await schema.isValid({
      email,
      password,
    }))){
      return response.status(400).json({
        error: true,
        message: "Field is required!",
        code: 105,
      });
    }

    if(!user){
      return response.status(400).json({
        error: true,
        message: "Email not found!",
        code: 106,
      });
    }

    const hashCompare = await compare(password, user.password);

    if(!hashCompare){
      return response.status(401).json({
        error: true,
        message: "User not found!",
        code: 304,
      });
    }
    const token = configJwt.sign(
      {id: user._id}, 
      configAuth.secret, 
      {expiresIn: configAuth.expiresIn}
    );

    return response.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email,
      },
      token,
    });
  }

}

export { LoginController };
