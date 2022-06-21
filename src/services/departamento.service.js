import {http} from './http'

export function listarDepartamentos()
{
    return http().get('/v1/departamento');
}
export function guardarDepartamentos(datos)
{
    return http().post('/v1/departamento', datos);
}
export function mostrarDepartamentos(id)
{
    return http().get('/v1/departamento/'+id);
}
export function mofidicarDepartamentos(id, datos)
{
    return http().patch('/v1/departamento/'+id, datos);
}
export function eliminarDepartamentos(id)
{
    return http().delete('/v1/departamento/'+id)
}