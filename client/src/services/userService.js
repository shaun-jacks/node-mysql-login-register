import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username,
    email: user.email,
    password: user.password
  });
}

export function resetPassword(email) {
  return http.post(`${apiEndpoint}/reset_password/${email}`, {});
}
