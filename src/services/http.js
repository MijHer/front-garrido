import axios from "axios";

const urlbase = "http://127.0.0.1:8000/api";
//const urlbase = "https://appbackgarrido.herokuapp.com/api";

export function http()
{
    const interceptor = axios.create({
        baseURL: urlbase,
        headers: {
            'Accept': 'aplication/json',
            'Content-Type': 'aplication/json'
        }
    })
    return interceptor;
}