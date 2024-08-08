<template>    
	<div :class="containerClass" @click="onWrapperClick">
        <AppTopBar @menu-toggle="onMenuToggle" />
        <div class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
        </div>

        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
            <AppFooter />
        </div>

		<AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" />
        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive">                
            </div>
        </transition>
	</div>
</template>

<script>
import AppTopBar from './AppTopbar.vue';
import AppMenu from './AppMenu.vue';
import AppConfig from './AppConfig.vue';
import AppFooter from './AppFooter.vue';
import Dashboard from '@/components/Dashboard.vue';

export default {
    
    emits: ['change-theme'],
    data() {
        return {
            layoutMode: 'static',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            menu : [
                {
                    label: 'Home',
                    items: [
                        {
                            label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/admin'
                        }
                    ]
                },
                {
                    label: 'Dashboard Alumno',
                    items:[
                        {
                            label: 'Datos Personales', icon: 'pi pi-fw pi-user', to: '/admin/dashalumno'
                        },
                        {
                            label: 'Historial de Notas', icon: 'pi pi-fw pi-book', to: '/admin/dashalumno'
                        },
                        {
                            label: 'Pagos', icon: 'pi pi-fw pi-dollar', to: '/admin/pagados'
                        },
                        {
                            label: 'Asistencia', icon: 'pi pi-fw pi-list', to: '/admin/dashalumno'
                        }
                    ]
                },
                {
                    label: 'Gestinar Registros', icon: 'pi pi-fw pi-search',
                    items: [
                        {
                            label: 'Alumnos', icon: 'pi pi-fw pi-user', to: '/admin/alumno',
                        },
                        {
                            label: 'Profesores', icon: 'pi pi-fw pi-user', to: '/admin/profesor',
                        },
                        {
                            label: 'Apoderado', icon: 'pi pi-fw pi-user', to: '/admin/apoderado',
                        }
                    ]
                },
                {
                    label: 'Pagos', icon: 'pi pi-fw pi-search',
                    items: [
                        {
                            label: 'Realizar Pago', icon: 'pi pi-fw pi-dollar', to: '/admin/pago',
                        },                        
                        {
                            label: 'Pagos Realizados', icon: 'pi pi-fw pi-dollar', to: '/admin/pagado',
                        }
                    ]
                },
                {
                    label: 'Detalles Academicos', icon: 'pi pi-fw pi-search',
                    items: [
                        {
                            label: 'Detalles', icon: 'pi pi-fw pi-cog', to: '/admin/anioacademico',
                        },
                        {
                            label: 'Cursos', icon: 'pi pi-fw pi-folder-open', to: '/admin/curso',
                        },
                        {
                            label: 'Grado', icon: 'pi pi-fw pi-server', to: '/admin/grado',
                        },
                    ]
                 },
                 {
                    label: 'Dashboard Profesor', icon: 'pi pi-fw pi-search',
                    items: [
                        {
                            label: 'Lista de Asistencia', icon: 'pi pi-fw pi-list', to: '/admin/asistencia',
                        },
                        {
                            label: 'Registro de Notas', icon: 'pi pi-fw pi-book', to: '/admin/nota',
                        }
                    ]
                 },
                 {
                    label: 'Gestion de Lugar', icon: 'pi pi-fw pi-search',
                    items: [
                        {
                            label: 'Departamento', icon: 'pi pi-fw pi-map-marker', to: '/admin/departamento',
                        },
                        {
                            label: 'Provincia', icon: 'pi pi-fw pi-map-marker', to: '/admin/provincia',
                        },
                        {
                            label: 'Distrito', icon: 'pi pi-fw pi-map-marker', to: '/admin/distrito',
                        }
                    ]
                 },
                 {
                    label:'Gestion Matricula', icon: 'pi pi-fw pi-search',
                    items: [
                        {
                            label: 'Matricula', icon: 'pi pi-fw pi-check-square', to: '/admin/matricula',
                        },
                        {
                            label: 'Matriculados', icon: 'pi pi-fw pi-list', to: '/admin/matriculados',
                        }                       
                    ]
                 },
                 {
                    label:'Usuario', icon: 'pi pi-fw pi-search',
                    items: [
                        {
                            label: 'Usuarios Registrados', icon: 'pi pi-fw pi-users', to: '/admin/usuario',
                        },
                        {
                            label: 'Tipo de Usuario', icon: 'pi pi-fw pi-user-edit', to: '/admin/tipousuario',
                        }                      
                    ]
                 }				
            ]
           
        }
    },
    watch: {
        $route() {
            this.menuActive = false;
            this.$toast.removeAllGroups();
        }
    },
    methods: {
        onWrapperClick() {
            if (!this.menuClick) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }

            this.menuClick = false;
        },
        onMenuToggle() {
            this.menuClick = true;

            if (this.isDesktop()) {
                if (this.layoutMode === 'overlay') {
					if(this.mobileMenuActive === true) {
						this.overlayMenuActive = true;
					}

                    this.overlayMenuActive = !this.overlayMenuActive;
					this.mobileMenuActive = false;
                }
                else if (this.layoutMode === 'static') {
                    this.staticMenuInactive = !this.staticMenuInactive;
                }
            }
            else {
                this.mobileMenuActive = !this.mobileMenuActive;
            }

            event.preventDefault();
        },
        onSidebarClick() {
            this.menuClick = true;
        },
        onMenuItemClick(event) {
            if (event.item && !event.item.items) {
                this.overlayMenuActive = false;
                this.mobileMenuActive = false;
            }
        },
		onLayoutChange(layoutMode) {
			this.layoutMode = layoutMode;
		},
        addClass(element, className) {
            if (element.classList)
                element.classList.add(className);
            else
                element.className += ' ' + className;
        },
        removeClass(element, className) {
            if (element.classList)
                element.classList.remove(className);
            else
                element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        isDesktop() {
            return window.innerWidth >= 992;
        },
        isSidebarVisible() {
            if (this.isDesktop()) {
                if (this.layoutMode === 'static')
                    return !this.staticMenuInactive;
                else if (this.layoutMode === 'overlay')
                    return this.overlayMenuActive;
            }

            return true;
        }
    },
    computed: {
        containerClass() {
            return ['layout-wrapper', {
                'layout-overlay': this.layoutMode === 'overlay',
                'layout-static': this.layoutMode === 'static',
                'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                'layout-mobile-sidebar-active': this.mobileMenuActive,
				'p-input-filled': this.$primevue.config.inputStyle === 'filled',
				'p-ripple-disabled': this.$primevue.config.ripple === false
            }];
        },
        logo() {
            return (this.$appState.darkTheme) ? "" : "";
        }
    },
    beforeUpdate() {
        if (this.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    },
    components: {
        'AppTopBar': AppTopBar,
        'AppMenu': AppMenu,
        'AppConfig': AppConfig,
        'AppFooter': AppFooter,
        'Dashboard': Dashboard,
    }
}
</script>

<style lang="scss">
@import './App.scss';
</style>
