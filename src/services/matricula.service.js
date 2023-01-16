import { http } from "./http";

export function listarMatriculas(page=1)
{
    return http().get(`/v1/matricula?page=${page}`);
}
export function guardarMatriculas(datos)
{
    return http().post('/v1/matricula', datos);
}
export function mostarMatriculas(id)
{
    return http().get('/v1/matricula/'+id);
}
export function modificarMatriculas(id, datos)
{
    return http().patch('/v1/matricula/'+id, datos);
}
export function eliminarMatriculas(id)
{
    return http().delete(`/v1/matricula/${id}`);
}
export function contarMatriculas()
{
    return http().get('/v1/matricula/contar-matriculados');
}