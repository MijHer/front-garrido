import { http } from './http'

export function login(datos)
{
    return http().post('/v1/user/login', datos);
}
export function listarUsuarios() {
    return http().get('/v1/user/index');
}
export function guardarUsuarios(datos) {
    return http().post('/v1/user/registro', datos);
}
export function mostrarUsuarios(id) {
    return http().get('/v1/user/show/'+ id);
}
export function modificarUsuarios(id, datos) {
    return http().patch('/v1/user/update/'+id, datos);
}
export function eliminarUsuarios(id) {
    return http().delete('/v1/user/destroy/'+ id);
}
export function contarUsers() {
    return http().get('/v1/user/contar-users');
}
