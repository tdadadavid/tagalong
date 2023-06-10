import { User } from "./entities";
import { ViewUserChats, SeeUserInformation } from "./services";

export const viewUserChats = new ViewUserChats(User);
export const seeUserInformation = new SeeUserInformation(User);
