import {http} from './http'

export function listarTiposuarios() {
    return http().get('/v1/tipousuario');
}
export function guardarTipousuario(datos) {
    return http().post('/v1/tipousuario', datos);
}
export function mostrarTipousuario(id) {
    return http().get('/v1/tipousuario/'+id);
}
export function modificarTipousuario(id, datos) {
    return http().patch('/v1/tipousuario/'+id, datos);
}
export function eliminarTipousuario(id) {
    return http().delete('/v1/tipousuario/'+id);
}