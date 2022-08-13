import { http } from './http';

export function listarAsistencias() {
    return http().get('/v1/asistencia');
}