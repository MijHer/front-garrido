import { http } from "./http";

export function listarProvincias(page=1)
{
    return http().get(`/v1/provincia?page=${page}`);
}
export function guardarProvincias(datos)
{
    return http().post('/v1/provincia', datos);
}
export function mostarProvincias(id)
{
    return http().get('/v1/provincia/'+id);
}
export function modificarProvincias(id, datos)
{
    return http().patch('/v1/provincia/'+id, datos);
}
export function eliminarProvincias(id)
{
    return http().delete(`/v1/provincia/${id}`);
}