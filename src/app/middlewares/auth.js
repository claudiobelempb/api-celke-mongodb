import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export default async (request, response, next) => {
  const authHeaders = request.headers.authorization;
  // console.log(tokenHeaders);
  if(!authHeaders){
    return response.status(401).json({
      error: true,
      message: "Token not found!",
      code: 114,
    });
  }
  const [, token] = authHeaders.split(' ');
  // console.log(token);

  try{
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // console.log(decoded);
    request.userId = decoded.id;
    return next();
    
  }catch(error){
    return response.status(401).json({
      error: true,
      message: "Token invalid",
      code: 115,
    });
  }
}