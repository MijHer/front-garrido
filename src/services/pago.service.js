import {http} from './http'

export function listarPagos()
{
    return http().get('/v1/pago');
}
export function guardarPagos(datos)
{
    return http().post('/v1/pago', datos);
}
export function mostrarPagos(id)
{
    return http().get('/v1/pago/'+id);
}
export function mofidicarPagos(id, datos)
{
    return http().patch('/v1/pago/'+id, datos);
}
export function eliminarPagos(id)
{
    return http().delete('/v1/pago/'+id)
}
export function contarPagos() {
    return http().get('/v1/pago/contar-pagos');
}