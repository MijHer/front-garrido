import { http } from './http';

export function listarProfesores(page=1)
{
    return http().get(`/v1/profesor?page=${page}`);
}
export function guardarProfesores(datos)
{
    return http().post('/v1/profesor', datos);
}
export function mostrarProfesores(id)
{
    return http().get('/v1/profesor/'+id);
}
export function modificarProfesores(id, datos)
{
    return http().patch('/v1/profesor/'+id, datos);
}
export function eliminarProfesores(id)
{
    return http().delete(`/v1/profesor/${id}`);
}
export function buscara(dnip) {
    return http().get(`/v1/profesor/buscara?p=${dnip}`);
}
export function cursosParaAsistencia() {
    return http().get('/v1/profesor/vistacursos-asistencia');
}
export function contarProfesoresSi()
{
    return http().get('/v1/profesor/contar-profesores');
}
export function contarProfesores()
{
    return http().get('/v1/profesor/contar-profesorestotal');
}