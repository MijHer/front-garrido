import { http } from './http';

export function listarCursos() {
    return http().get('/v1/curso');
}
export function guardarCursos(datos) {
    return http().post('/v1/curso', datos);
}
export function mostrarCursos(id) {
    return http().get('/v1/curso/'+id);
}
export function modificarCursos(id, datos) {
    return http().patch('/v1/curso/'+id, datos);
}
export function eliminarCursos(id) {
    return http().delete('/v1/curso/'+id);
}
export function asignarProfesor(id, datos) {
    return http().post(`/v1/curso/${id}/asignar-profesor`, datos);
}
export function quitarProfesor(id, datos) {
    return http().post(`/v1/curso/${id}/quitar-profesor`, datos);
}
export function cursosParaNotas() {
    return http().get('/v1/curso/vistacursos-nota');
}