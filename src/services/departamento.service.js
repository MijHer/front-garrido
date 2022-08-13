import { http } from "./http";

export function listarDepartamentos(page=1)
{
    return http().get(`/v1/departamento?page=${page}`);
}
export function guardarDepartamentos(datos)
{
    return http().post('/v1/departamento', datos);
}
export function mostarDepartamentos(id)
{
    return http().get('/v1/departamento/'+id);
}
export function modificarDepartamentos(id, datos)
{
    return http().patch('/v1/departamento/'+id, datos);
}
export function eliminarDepartamentos(id)
{
    return http().delete(`/v1/departamento/${id}`);
}