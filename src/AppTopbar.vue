<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img alt="Logo" :src="topbarImage()" />
			<span style="color:#6EB6D1;">FERNANDO GARRIDO</span>
		</router-link>
		<button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</button>
		<button class="p-link layout-topbar-menu-button layout-topbar-button"
			v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>		
		<ul class="layout-topbar-menu hidden lg:flex origin-top">
			<!-- <li>
				<button class="p-link layout-topbar-button">
					<i class="pi pi-calendar"></i>
					<span>Events</span>
				</button>
			</li> -->
			<!-- <li>
				<button class="p-link layout-topbar-button">
					<i class="pi pi-cog"></i>
					<span>Settings</span>
				</button>
			</li> -->
			<li>
				<span> <b> {{ $store.state.usuario }} </b> </span>
				<button class="p-link layout-topbar-button bg-primary" @click="verPerfil()" :modal="true">
					<i class="pi pi-user"></i>
					<span>Perfil</span>
				</button>
			</li>
		</ul>
		<Dialog header="Datos del Perfil" v-model:visible="DialogPerfil" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '55vw'}"  :modal="true">
			<div class="formgrid grid">
				<div class="field col">
				<label for="name">Nombre</label>          
				<p style="min-width:16rem" v-text="user.name"></p>
				</div>
				<div class="field col">
					<label for="usu_dni">DNI</label>
					<InputText id="usu_dni" readonly v-text="user.usu_dni"   required="true" autofocus  />          
				</div>
				<div class="field col">
					<label for="usu_telf">Telefono</label>
					<InputText id="usu_telf" v-model.trim="user.usu_telf" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_telf}" />          
				</div>
			</div>
			<div class="formgrid grid">
				<div class="field col">
				<label for="email">Correo</label>
				<InputText id="email" v-model.trim="user.email" required="true" autofocus :class="{'p-invalid': submitted && !user.email}" />          
				</div>      
				<div class="field col">
				<label for="usu_user">Usuario</label>
				<InputText id="usu_user" v-model.trim="user.usu_user" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_user}" />          
				</div>
				<div class="field col">
					<label for="password">Contraseña</label>
					<InputText id="password" v-model.trim="user.password" required="true" autofocus :class="{'p-invalid': submitted && !user.password}" />          
				</div>
			</div>
			<div class="formgrid grid">
				<div class="field col">
				<label for="usu_dir">Dirección</label>
				<InputText id="usu_dir" v-model.trim="user.usu_dir" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_dir}" />
				</div>
				<div class="field col">
				<div class="field col">
					<label for="usu_rgst">Fecha y Hora de Registro</label>
					<InputText id="usu_dir" readonly v-model.trim="user.usu_rgst" required="true" autofocus />
				</div>
				</div>
				<div class="field col"></div>
			</div>       
			<div class="formgrid grid">          
				<div class="field col">
				<label for="tipousuario.tipo_nom" class="mb-3">Rol</label>
				<Dropdown id="tipousuario.tipo_nom" disabled v-model="user.tipousuario_id" :options="tipousuarios" optionLabel="tipo_nom" optionValue="id" placeholder="Seleciona Rol">      
				</Dropdown>
				</div>               
			</div>
			{{users}}
            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="cerrarDialog" class="p-button-text" />
            </template>
        </Dialog>
	</div>
</template>

<script>

import * as userService from '@/services/user.service'
import * as tipousuarioService from '@/services/tipousuario.service'

export default {
	data() {
		return {
			DialogPerfil: false,			
			user: {},
			users: null,
			tipoususario: null
		}
	},
	mounted() {
		this.listarUsuarios();
	},
    methods: {
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
		onTopbarMenuToggle(event) {
            this.$emit('topbar-menu-toggle', event);
        },
		topbarImage() {
			return this.$appState.darkTheme ? 'images/logo-garrido.png' : 'images/logo-garrido.png';
		},
		cerrarDialog() {
			this.DialogPerfil = false;
		},
		async listarUsuarios() {
			const { data } = await userService.perfilUsuario();
			this.users = data;			
		},
		verPerfil(id) {
			console.log(id);
			this.DialogPerfil = true;
		}
    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
}
</script>
<style scoped lang="scss">
.p-button {
    margin: 0.3rem .5rem;
    min-width: 10rem;
}

p {
    margin: 0;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-dialog .p-button {
    min-width: 6rem;
}
</style>