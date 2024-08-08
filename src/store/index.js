import { createStore } from 'vuex'

 export default createStore({
   state: {
     usuario: null    
   },
   mutations: {
     actualizaUsuario(state, user) {
       state.usuario = user
     }
   },
   actions: {
     ingresaUsuario(context, u) {
       context.commit("actualizaUsuario", u)
     }
   },
   getters: {
     estaAutenticado(state) {
       return state.usuario;
     }
   },
   modules: {
   }
 })

