import axios from 'axios';

const LoginApi = (username,password) => {
    return axios.post("api/login", {username,password})
}

export {LoginApi};