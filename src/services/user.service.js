import axios from "axios";
import authHeader from "./auth-headers";
const API_URL = "https://testranjitha.herokuapp.com/";
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL + "images", { headers: authHeader() });
};
const getUserImage = () => {
  return axios.get(API_URL + "myimages", { headers: authHeader() });
};
const getImageById = (id) => {
  return axios.get(API_URL+"images/"+id, { headers: authHeader() })
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getPublicContent,
  getUserBoard,
  getUserImage,
  getImageById
};
