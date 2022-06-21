import { http } from "./http";

export function listarDistritos(page=1)
{
    return http().get(`/v1/distrito?page=${page}`);
}
export function guardarDistritos(datos)
{
    return http().post('/v1/distrito', datos);
}
export function mostarDistritos(id)
{
    return http().get('/v1/distrito/'+id);
}
export function modificarDistritos(id, datos)
{
    return http().patch('/v1/distrito/'+id, datos);
}
export function eliminarDistritos(id)
{
    return http().delete(`/v1/distrito/${id}`);
}