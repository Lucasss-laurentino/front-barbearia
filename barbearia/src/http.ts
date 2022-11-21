import axios from 'axios';

const http = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
      Accept: 'application/json',
      Content: 'application/json',  
    }
})

// Adiciona um interceptador na requisição
http.interceptors.request.use(function (config) {
    // Faz alguma coisa antes da requisição ser enviada
    const token = sessionStorage.getItem('token');

    if(token && config.headers){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
  }, function (error) {
    // Faz alguma coisa com o erro da requisição
    return Promise.reject(error);
  });

export default http;