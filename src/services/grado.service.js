import {http} from './http'

export function listarGrados()
{
    return http().get('/v1/grado');
}
export function guardarGrados(datos)
{
    return http().post('/v1/grado', datos);
}
export function mostrarGrados(id)
{
    return http().get('/v1/grado/'+id);
}
export function mofidicarGrados(id, datos)
{
    return http().patch('/v1/grado/'+id, datos);
}
export function eliminarGrados(id)
{
    return http().delete('/v1/grado/'+id)
}