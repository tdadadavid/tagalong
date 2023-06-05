import { User } from "../users/entities/user";
import { RegisterUser } from "./services/register";
import { Login } from "./services/sign.in";


export const registerUser = new RegisterUser(User);
export const loginUser = new Login(User);
