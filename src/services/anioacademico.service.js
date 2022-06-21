import {http} from './http'

export function listarAnioacademicos()
{
    return http().get('/v1/anioacademico');
}
export function guardarAnioacademicos(datos)
{
    return http().post('/v1/anioacademico', datos);
}
export function mostrarAnioacademicos(id)
{
    return http().get('/v1/anioacademico/'+id);
}
export function mofidicarAnioacademicos(id, datos)
{
    return http().patch('/v1/anioacademico/'+id, datos);
}
export function eliminarAnioacademicos(id)
{
    return http().delete('/v1/anioacademico/'+id)
}