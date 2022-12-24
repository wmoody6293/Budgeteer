//axios creates HTTP request and performs a similar function that postman does
import axios from 'axios';

//We added a proxy to frontend package.json that will add http://localhost:8000 then tack on the url when
//making http requests
const API_URL = '/api/users/';

//Register user
const register = async (userData) => {
  console.log('Inside register func of authService page!!!!!');
  //userData is given on Register page
  const response = await axios.post(API_URL, userData);
  console.log('This is response from axios post!!!!!', response);
  //axios puts the response inside an object called data
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

//Login user
const login = async (userData) => {
  console.log('Inside login func of authService page!!!!!');
  //userData is given on login page
  const response = await axios.post(API_URL + 'login', userData);
  console.log('This is response from axios post!!!!!', response);
  //axios puts the response inside an object called data
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  console.log(
    'This is localstorage inside logout func in authService.js: ',
    localStorage
  );
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
