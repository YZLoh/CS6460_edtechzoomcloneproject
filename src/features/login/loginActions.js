import { setToken, clearToken } from "./loginSlice";
import UserService from "../../services/userService";

export const login = (username, password) => async (dispatch) => {
  try {
    const loginData = await UserService.login(username, password);
    dispatch(setToken(loginData));
  } catch (error) {
    console.log(error);
  }
};
export const logout = () => (dispatch) => {
  UserService.logout(); // Perform logout operations.
  dispatch(clearToken());
};
