import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://pdxr4spci5.execute-api.us-east-1.amazonaws.com'
})