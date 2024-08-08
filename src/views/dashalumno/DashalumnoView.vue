<template>
<Toast />
    <ConfirmDialog></ConfirmDialog>
  <div class="card">
    <h1>Datos Personales desde dash alumno carpeta</h1>
    <div class="formgrid grid">
        <div class="field col-12 md:col-12 lg:col-5" style="margin-top: 25px;">            
            <img src="../../../../public/images/logo-usuario.png" alt="Usuario" style="width: 200px; display:block; margin:auto;">
            <p style="font-weight: bold; text-align:center; margin-top: 10px;" v-text="users.name"></p>
        </div>
        <div class="field col-12 md:col-12 lg:col-7">
            <div class="formgrid grid mt-5">
                <div class="field col">
                    <label for="" style="font-weight: bold;">DNI :</label>
                </div>
                <div class="field col">
                    <label v-text="users.usu_dni"></label>
                </div>
            </div>
            <div class="formgrid grid mt-5">
                <div class="field col">
                    <label for="" style="font-weight: bold;">Correo :</label>
                </div>
                <div class="field col">
                    <label v-text="users.email"></label>
                </div>
            </div>
            <div class="formgrid grid mt-5">
                <div class="field col">
                    <label for="" style="font-weight: bold;">Usuario :</label>
                </div>
                <div class="field col">
                    <label v-text="users.usu_user"></label>
                </div>
            </div>
            <div class="formgrid grid mt-5">
                <div class="field col">
                    <label for="" style="font-weight: bold;">Dirección :</label>
                </div>
                <div class="field col">
                    <label v-text="users.usu_dir"></label>
                </div>
            </div>
            <div class="formgrid grid mt-5">
                <div class="field col">
                    <label for="" style="font-weight: bold;">Celular :</label>
                </div>
                <div class="field col">
                    <label v-text="users.usu_telf"></label>
                </div>
            </div>            
            <div class="field mt-5">
                <Button label="Modificar" class=" p-button-success mr-2" @click="editarUsuario" />
            </div>
        </div>
    </div>
    <Dialog header="Datos Personales" v-model:visible="dialogModificar" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '30vw'}" :modal="true">        
        <div class="formgrid grid">
            <div class="field col-12 sm:col-4" >
                <label for="" style="font-weight: bold; margin-top: 9px;">DNI:</label>
            </div>
            <div class="field col-12 sm:col-8">
                <InputText id="email" v-model.trim="user.usu_dni" required="true" style=" width: 100%;" />
            </div>
        </div>
        <div class="formgrid grid">
            <div class="field col-12 sm:col-4">
                <label for="" style="font-weight: bold; margin-top: 9px;">Correo:</label>
            </div>
            <div class="field col-12 sm:col-8">
                <InputText id="email" v-model.trim="user.email" style=" width: 100%;" required="true"/>
            </div>
        </div>
        <div class="formgrid grid">
            <div class="field col-12 sm:col-4">
                <label for="" style="font-weight: bold; margin-top: 9px;">Contraseña:</label>
            </div>
            <div class="field col-12 sm:col-8">
                <Password id="password" v-model="user.password" placeholder="Contraseña" :toggleMask="true" inputClass="w-full" style=" width: 100%;"></Password>                
            </div>
        </div>
        <div class="formgrid grid">
            <div class="field col-12 sm:col-4">
                <label for="" style="font-weight: bold; margin-top: 9px;">Usuario:</label>
            </div>
            <div class="field col-12 sm:col-8">
                <InputText id="email" v-model.trim="user.usu_user" style=" width: 100%;" required="true"/>
            </div>
        </div>
        <div class="formgrid grid">
            <div class="field col-12 sm:col-4">
                <label for="" style="font-weight: bold; margin-top: 9px;">Direccion:</label>
            </div>
            <div class="field col-12 sm:col-8">
                <InputText id="email" v-model.trim="user.usu_dir" style=" width: 100%;" required="true"/>
            </div>
        </div>
        <div class="formgrid grid">
            <div class="field col-12 sm:col-4">
                <label for="" style="font-weight: bold; margin-top: 9px;">Celular:</label>
            </div>
            <div class="field col-12 sm:col-8">
                <InputText id="email" v-model.trim="user.usu_telf" style=" width: 100%;" required="true"/>
            </div>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" @click="cerrarModal" class="p-button-text"/>
            <Button label="Aceptar" icon="pi pi-check" @click="guardarUsuario" autofocus />
        </template>
    </Dialog>
  </div>
</template>

<script>
import * as userService from '@/services/user.service'
export default {
    data() {
        return {
            users: {}, /* OBJETO PARA CAPTURAR LOS DATOS QUE VIENE DEL PERFIL DE USUARIO */
            user: {},  /* OBJETO PARA REALIZAR EL LLENADO DE DATOS Y MODIFICAR */
            dialogModificar: false
        }
    },
    mounted() {
        this.mostrarPerfil();
    },
    methods: {
        async mostrarPerfil() {
            const use = await userService.perfilUsuario();
            this.users = use.data;
        },
        cerrarModal() {
            this.dialogModificar = false;
        },
        editarUsuario() {
            this.user = this.users;
            console.log(this.user);
            this.dialogModificar = true;
        },
        async guardarUsuario() {
            const user = await userService.modificarUsuarios(this.user.id, this.user);
            this.user = user.data;
            this.cerrarModal();
        }        
    }
}
</script>

<style>

</style>