import {http} from './http'

export function listarNivels()
{
    return http().get('/v1/nivel');
}
export function guardarNivels(datos)
{
    return http().post('/v1/nivel', datos);
}
export function mostrarNivels(id)
{
    return http().get('/v1/nivel/'+id);
}
export function mofidicarNivels(id, datos)
{
    return http().patch('/v1/nivel/'+id, datos);
}
export function eliminarNivels(id)
{
    return http().delete('/v1/nivel/'+id)
}