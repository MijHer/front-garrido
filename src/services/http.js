import axios from "axios";

const urlbase = "https://colegiogarrido.edu.pe:8000/api";
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
            if(error.response.status === 401){
                localStorage.removeItem("token");
                window.location.href = "/login"
            }
            if(error.response.status === 404){                
                window.alert('rede');
            }

            return Promise.reject(error);
            /* localStorage.removeItem("token");            
            window.location.href = '/login'; */
        }
    );
    return interceptor;
}