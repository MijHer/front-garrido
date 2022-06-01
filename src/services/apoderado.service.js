import { http } from "./http";

export function listarApoderados(page=1)
{
    return http().get(`/v1/apoderado?page=${page}`);
}
export function guardarApoderados(datos)
{
    return http().post('/v1/apoderado', datos);
}
export function mostarApoderados(id)
{
    return http().get('/v1/apoderado/'+id);
}
export function modificarApoderados(id, datos)
{
    return http().patch('/v1/apoderado/'+id, datos);
}
export function eliminarApoderados(id)
{
    return http().delete(`/v1/apoderado/${id}`);
}