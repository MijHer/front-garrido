import { http } from "./http";

export function listarAlumnos(page=1)
{
    return http().get(`/v1/alumno?page=${page}`);
}
export function listarAlumnosCursoGradoSeccion(curso_id, grado_id, seccion) {
    return http().get(`/v1/alumno-curso/${curso_id}/grado/${grado_id}/seccion=${seccion}`);
}
export function guardarAlumnos(datos)
{
    return http().post('/v1/alumno', datos);
}
export function mostarAlumnos(id)
{
    return http().get('/v1/alumno/'+id);
}
export function modificarAlumnos(id, datos)
{
    return http().patch('/v1/alumno/'+id, datos);
}
export function eliminarAlumnos(id)
{
    return http().delete(`/v1/alumno/${id}`);
}
export function buscar(dni) {
    return http().get(`/v1/alumno/buscar?q=${dni}`);
}
export function guardarNotas(datos) {
    return http().post('/v1/alumno/registrar-notas', datos);
}
export function asistenciaAlu(datos) {
    return http().post('/v1/alumno/registrar-asistencia', datos);
}
export function contarAlumnos() {
    return http().get('/v1/alumno/contar-alumnos');
}
export function muestraPago() {
    return http().get('/v1/alumno/pago-alumno');
}