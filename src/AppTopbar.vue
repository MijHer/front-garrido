<template>
	<div class="layout-topbar">
		<router-link to="/" class="layout-topbar-logo">
			<img alt="Logo" :src="topbarImage()" />
			<span style="color:#6EB6D1;">ANDRES FERNANDEZ GARRIDO</span>
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
			<li>
				<span> <b> {{ $store.state.usuario }} </b> </span>
				<button class="p-link layout-topbar-button bg-primary" @click="verPerfil" :modal="true">
					<i class="pi pi-user"></i>
					<span>Perfil</span>
				</button>
			</li>
			<li>
				<button class="p-link layout-topbar-button" @click="logout" style="background: #73C6DB; color: white;">
					<i class="pi pi-sign-out"></i>
					<span>Cerrar Sessión</span>
				</button>
			</li>
		</ul>
		<Dialog header="Datos del Perfil" v-model:visible="DialogPerfil" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '45vw'}"  :modal="true">
			<div class="formgrid grid">
				<div class="field col custom-field">
					<label for="nombre" class="custom-label">Nombre</label>
					<label class="custom-value" v-text="users.name"></label>
				</div>
			</div>
			<div class="formgrid grid">
				<div class="field col custom-field">
					<label for="usu_dni" class="custom-label">DNI</label>
					<label class="custom-value" v-text="users.usu_dni"></label>
				</div>
				<div class="field col custom-field">
					<label for="usu_telf" class="custom-label">Telefono</label>
					<label class="custom-value" v-text="users.usu_telf"></label>
				</div>
				<div class="field col custom-field">
					<label for="email" class="custom-label">Correo</label>
					<label class="custom-value" v-text="users.email"></label>
				</div>			 -->
			</div>
			<div class="formgrid grid">
				<div class="field col custom-field">
					<label for="usu_user" class="custom-label">Usuario</label>
					<label class="custom-value" v-text="users.usu_user"></label>
				</div>
				<div class="field col custom-field">
					<label for="usu_dir" class="custom-label">Direccion</label>
					<label class="custom-value" v-text="users.usu_dir"></label>
				</div>
			</div>			
            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" @click="cerrarDialog" class="p-button-text" />
            </template>
        </Dialog>
	</div>
</template>

<script>

import * as userService from '@/services/user.service'

export default {
	data() {
		return {
			DialogPerfil: false,			
			user: {},
			users: null,
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
		logout() {
			localStorage.clear();
			this.$router.push({name: 'Login'});
		},
		cerrarDialog() {
			this.DialogPerfil = false;
		},
		async listarUsuarios() {
			const { data } = await userService.perfilUsuario();
			this.users = data;
		},
		verPerfil() {
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