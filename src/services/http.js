import axios from "axios";

const urlbase = "http://127.0.0.1:8000/api";
//const urlbase = "https://appbackgarrido.herokuapp.com/api";

export function http()
{
    const token = localStorage.getItem("token");
    const interceptor = axios.create({
        baseURL: urlbase,
        headers: {
            'Accept': 'aplication/json',
            'Content-Type': 'aplication/json',
            'Authorization': 'Bearer '+ token 
        }
    })

    interceptor.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            localStorage.removeItem("token");
            window.location.href = '/login';
        }
    );
    return interceptor;
}