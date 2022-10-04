import { http } from "./http";

export function listarAsignaciones(page=1)
{
    return http().get(`/v1/asignacion?page=${page}`);
}
export function guardarAsignaciones(datos) 
{
    return http().post('/v1/asignacion/', datos);
}
export function mostrarAsignaciones(id) 
{
    return http().get('/v1/asignacion/', id);    
}
export function actualizarAsignaciones(id, datos)
{
    return http().patch('/v1/asginacion/'+id, datos);
}
export function eliminarAsignaciones(id)
{
    return http().delete(`/v1/asignacion/${id}`);
}