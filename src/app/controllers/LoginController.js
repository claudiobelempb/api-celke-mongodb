import { compare } from "bcryptjs";
//import * as yup from "yup";
import User from "../models/User";

class LoginController {

  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({email});

    if(!user){
      return response.status(400).json({
        error: true,
        message: "Email not found!",
        code: 106,
      });
    }

    // const schema = yup.object().shape({
    //   email: yup.string().email().required(),
    //   password: yup.string().required(),
    // });

    // if(!(await schema.isValid({
    //   email,
    //   password,
    // }))){
    //   return response.status(400).json({
    //     error: true,
    //     message: "Field is required!",
    //     code: 105,
    //   });
    // }

    const hashCompare = await compare(password, user.password);

    if(!hashCompare){
      return response.status(401).json({
        error: true,
        message: "User not found!",
        code: 304,
      });
    }

    return response.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email,
      }
    });
  }

}

export { LoginController };
