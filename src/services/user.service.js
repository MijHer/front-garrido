import { http } from './http'

export function login(datos)
{
    return http().post('/v1/user/login', datos);
}