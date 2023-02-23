<template>
  <div class="card">    
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Registar Profesor" icon="pi pi-plus" class="p-button-success mr-2" @click="abrirDialog" />
            </template>
            <template #end>
                <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
            </template>
        </Toolbar>
        <!-- DIALOG PARA CREAR UN NUEVO PROFESOR -->
        <Dialog v-model:visible="dialog" :style="{width: '1000px'}" header="Datos del Docente" :modal="true" class="p-fluid">            
            <div class="formgrid grid">            
                <div class="field col">
                    <label for="pro_nom">Nombre</label>
                    <InputText id="pro_nom" v-model.trim="profesor.pro_nom" required="true" autofocus :class="{'p-invalid': submitted && !profesor.pro_nom}" />
                    <small class="p-error" v-if="submitted && !profesor.pro_nom">Nombre es requerido.</small>
                </div>
                <div class="field col">
                    <label for="pro_app">A. Paterno</label>
                    <InputText id="pro_app" v-model.trim="profesor.pro_app" required="true" autofocus :class="{'p-invalid': submitted && !profesor.pro_app}" />
                    <small class="p-error" v-if="submitted && !profesor.pro_app">Apellido requerido.</small>
                </div>
                <div class="field col">
                    <label for="pro_apm">A. Materno</label>
                    <InputText id="pro_apm" v-model.trim="profesor.pro_apm" required="true" autofocus :class="{'p-invalid': submitted && !profesor.pro_apm}" />
                    <small class="p-error" v-if="submitted && !profesor.pro_apm">Apellido requerido.</small>
                </div>
            </div>
            <div class="formgrid grid">            
                <div class="field col">
                    <label for="pro_dire">Dirección</label>
                    <InputText id="pro_dire" v-model.trim="profesor.pro_dire" required="true" autofocus :class="{'p-invalid': submitted && !profesor.pro_dire}" />
                    <small class="p-error" v-if="submitted && !profesor.pro_dire">direccion es requerido.</small>
                </div>
                <div class="field col">
                    <label for="pro_telf">Teléfono</label>
                    <InputText id="pro_telf" v-model.trim="profesor.pro_telf" required="true" autofocus :class="{'p-invalid': submitted && !profesor.pro_telf}" />
                    <small class="p-error" v-if="submitted && !profesor.pro_telf">Telefono requerido.</small>
                </div>
                <div class="field col">
                    <label for="pro_correo">Correo</label>
                    <InputText id="pro_correo" v-model.trim="profesor.pro_correo" required="true" autofocus :class="{'p-invalid': submitted && !profesor.pro_correo}" />
                    <small class="p-error" v-if="submitted && !profesor.pro_correo">Correo requerido.</small>
                </div>                
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="pro_sexo">Sexo</label>
                    <Dropdown id="pro_sexo" v-model="profesor.pro_sexo" :options="statusSexo" optionLabel="label" optionValue="value" placeholder="Selecione Estado">                        
                    </Dropdown>                    
                </div>
                <div class="field col">
                    <label for="pro_dni">DNI</label>
                    <InputText id="pro_dni" v-model.trim="profesor.pro_dni" required="true" autofocus :class="{'p-invalid': submitted && !profesor.pro_dni}" />
                    <small class="p-error" v-if="submitted && !profesor.pro_dni">DNI es requerido.</small>
                </div>
                <div class="field col">
                    <label for="pro_grado_instruccion">Grado de instruccion</label>
                    <Dropdown id="pro_grado_instruccion" v-model="profesor.pro_grado_instruccion" :options="statusInstruc" optionLabel="label" optionValue="value" placeholder="Selecione Estado">                        
                    </Dropdown>                    
                </div>                
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="pro_especialidad">Especialidad</label>
                    <InputText id="pro_especialidad" v-model.trim="profesor.pro_especialidad" required="true" autofocus :class="{'p-invalid': submitted && !profesor.pro_especialidad}" />
                    <small class="p-error" v-if="submitted && !profesor.pro_especialidad">Campo Requerido.</small>
                </div>
                <div class="field col">
                    <label for="pro_pais">Pais</label>
                    <Dropdown id="pro_pais" v-model="profesor.pro_pais" :options="statusPais" optionLabel="label" optionValue="value" placeholder="Selecione Pais">                        
                    </Dropdown>                    
                </div>
                <div class="field col">
                    <label for="pro_fnac">Fecha de nacimiento</label>                    
                    <Calendar id="pro_fnac" v-model="profesor.pro_fnac" :showIcon="true" />
                </div>
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="pro_distrito">Distrito</label>
                    <!-- <InputText id="pro_distrito" v-model.trim="profesor.pro_distrito" required="true" autofocus :class="{'p-invalid': submitted && !profesor.pro_distrito}" />
                    <small class="p-error" v-if="submitted && !profesor.pro_distrito">Campo Requerido.</small> -->
                    <Dropdown id="pro_distrito" v-model="profesor.pro_distrito" :options="distritos" optionLabel="dist_nom" optionValue="dist_nom" placeholder="Selecione distrito">                        
                    </Dropdown>
                </div>                
                <div class="field col">
                    <label for="pro_estado">Estado</label>
                    <Dropdown id="pro_estado" v-model="profesor.pro_estado" :options="status" optionLabel="label" optionValue="value" placeholder="Selecione Pais">                        
                    </Dropdown>
                </div>
            </div>
            {{profesor}}
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardaProfesor" />
            </template>
        </Dialog>
        <DataTable ref="dt" :value="profesores" v-model:selection="selectedProfesores" dataKey="id" 
            :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
            <template #header>
                <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                    <h5 class="mb-2 md:m-0 p-as-md-center">Lista de Profesores</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                    </span>
                </div>
            </template>
            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="pro_nom" header="Nombres" :sortable="true" style="min-width:10rem"></Column>
            <Column field="pro_app" header="A. Paterno" :sortable="true" style="min-width:10rem"></Column>
            <Column field="pro_apm" header="A. Materno" :sortable="true" style="min-width:10rem"></Column>
            <Column field="pro_estado" header="Estado" :sortable="true" style="min-width:10rem">
                <template #body="slotProps">
                    {{slotProps.data.pro_estado == 1?"Activo":"Inactivo"}}
                </template>
            </Column>
            <Column field="pro_telf" header="Telefono" :sortable="true" style="min-width:10rem"></Column>
            <Column field="pro_especialidad" header="Especialidad" :sortable="true" style="min-width:10rem"></Column>            
            <Column :exportable="false" header="Acciones" style="min-width:16rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editarProfesores(slotProps.data)" />
                    <Button icon="pi pi-file" class="p-button-rounded p-button-warning mr-2" v-if="slotProps.data.user != null" @click="verProfesores(slotProps.data)" />
                    <Button icon="pi pi-user" class="p-button-rounded p-button-info mr-2" v-if="slotProps.data.user == null" @click="asignarUsers(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>            
        </DataTable>
        <!-- DIALOG PARA ASIGANR USUARIO AL PROFESOR -->
        <Dialog v-model:visible="DialogUsers" :style="{width: '950px'}" header="Asignación de Usuario" :modal="true" class="p-fluid">
            <div class="formgrid grid">
                <div class="field col">
                <label for="name">Nombres</label>          
                <InputText id="name" readonly v-model.trim="user.name" required="true" autofocus :class="{'p-invalid': submitted && !user.name}" />          
                </div>
                <div class="field col">
                    <label for="pro_apm">Apellido Paterno</label>
                    <InputText id="pro_apm" readonly v-model="Apaterno"   required="true" autofocus  />
                </div>
                <div class="field col">
                    <label for="usu_telf">Apellido Materno</label>
                    <InputText id="usu_telf" readonly v-model="Amaterno" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_telf}" />          
                </div>
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="usu_dni">DNI</label>
                    <InputText id="usu_dni" readonly v-model.trim="user.usu_dni"   required="true" autofocus  />          
                </div>
                <div class="field col">
                    <label for="usu_telf">Telefono</label>
                    <InputText id="usu_telf" v-model.trim="user.usu_telf" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_telf}" />          
                </div>
                <div class="field col">
                    <label for="email">Correo</label>
                    <InputText id="email" v-model.trim="user.email" required="true" autofocus :class="{'p-invalid': submitted && !user.email}" />          
                </div>
            </div>
            <div class="formgrid grid">                      
                <div class="field col">
                <label for="usu_user">Usuario</label>
                <InputText id="usu_user" v-model.trim="user.usu_user" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_user}" />          
                </div>
                <div class="field col">
                    <label for="password">Contraseña</label>
                    <!-- <InputText id="password" v-model.trim="user.password" required="true" autofocus :class="{'p-invalid': submitted && !user.password}" /> -->
                    <Password id="password" v-model.trim="user.password" placeholder="Contraseña" :toggleMask="true" class="w-full" inputClass="w-full" ></Password>
                </div>
                <div class="field col">
                    <label for="usu_dir">Dirección</label>
                    <InputText id="usu_dir" v-model.trim="user.usu_dir" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_dir}" />
                </div>
            </div>
            <div class="formgrid grid">                
                <div class="field col">                    
                    <label for="usu_rgst">Fecha y Hora de Registro</label>
                    <InputText id="usu_dir" v-model.trim="user.usu_rgst" required="true" autofocus />          
                    <!-- <Calendar inputId="usu_rgst" v-model="user.usu_rgst" :showTime="true" :showSeconds="true" :showIcon="true" /> -->                
                </div>
                <div class="field col">
                    <label for="usu_estado">Estado</label>
                    <Dropdown id="usu_estado" v-model="user.usu_estado" :options="estados" optionLabel="label" optionValue="value" placeholder="Seleciona Rol">      
                    </Dropdown>
                </div>
                <div class="field col">
                    <label for="tipousuario.tipo_nom" >Rol</label>
                    <Dropdown id="tipousuario.tipo_nom" v-model="user.tipousuario_id" :options="tipousuarios" optionLabel="tipo_nom" optionValue="id" placeholder="Seleciona Rol">      
                    </Dropdown>
                </div> 
            </div>
            {{user}} <br> <br>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarUsers"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarUsers" />
            </template>
        </Dialog>
        <!-- DIALOG PARA VER DETALLES DEL PROFESOR -->
        <Dialog v-model:visible="verDialog" :style="{width: '900px', text: 'center'}" header="Datos del Profesor" :modal="true" class="p-fluid">
            <div class="card">
                <div class="formgrid grid">                     
                    <div class="field col">
                        <label for="pro_nom"><b>Nombre:</b></label>
                        <p style="min-width:16rem" v-text="profesor.pro_nom"></p>
                    </div>
                    <div class="field col">
                        <label for="pro_app"><b>A. Paterno:</b></label>
                        <p style="min-width:16rem" v-text="profesor.pro_app"></p>
                    </div>
                    <div class="field col">
                        <label for="pro_apm"><b>A. Materno:</b></label>
                        <p style="min-width:16rem" v-text="profesor.pro_apm"></p>          
                    </div>
                </div>
                    
                <div class="formgrid grid">
                    <div class="field col">
                        <label for="pro_dire"><b>Dirección:</b></label>
                        <p style="min-width:16rem" v-text="profesor.pro_dire"></p>          
                    </div>
                    <div class="field col">
                        <label for="pro_telf"><b>Telefóno:</b></label>
                        <p style="min-width:16rem" v-text="profesor.pro_telf"></p>          
                    </div>
                    <div class="field col">
                        <label for="pro_sexo"><b>Sexo:</b></label>
                        <p style="min-width:16rem" v-text="profesor.pro_sexo"></p>          
                    </div>
                    
                </div>
                <div class="formgrid grid">
                    <div class="field col">
                        <label for="pro_dni"><b>DNI:</b></label>
                        <p style="min-width:16rem" v-text="profesor.pro_dni"></p>          
                    </div>
                    <div class="field col">
                        <label for="pro_grado_instruccion"><b>Grado de instrucción:</b></label>
                        <p style="min-width:16rem" v-text="profesor.pro_grado_instruccion"></p>
                    </div>
                    <div class="field col">
                        <label for="pro_especialidad"><b>Especialidad:</b></label>
                        <p style="min-width:16rem" v-text="profesor.pro_especialidad"></p>
                    </div>
                    
                </div>
                <div class="formgrid grid">
                    <div class="field col">
                        <label for="pro_pais"><b>Pais:</b></label>
                        <p style="min-width:16rem" v-text="profesor.pro_pais"></p>
                    </div>
                    <div class="field col">
                        <label for="pro_fnac"><b>Fecha de nacimiento:</b></label>
                        <p style="min-width:16rem" v-text="profesor.pro_fnac"></p>
                    </div>
                    <div class="field col">
                        <label for="pro_distrito"><b>Distrito:</b></label>
                        <p style="min-width:16rem" v-text="profesor.pro_distrito"></p>
                    </div>                                   
                </div>
                <div class="formgrid grid">
                    <div class="field col">
                        <label for="pro_estado">Estado</label>
                        <p>
                            {{profesor.pro_estado == 1?"Activo":"Inactivo"}}
                        </p>
                    </div>
                    <div class="field col">
                        <label for="pro_estado">Rol</label>
                        <p style="min-width:16rem" v-text="rolNom"></p>                        
                    </div>
                    <div class="field col">
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarVerDialog()"/>
                <Button label="Imprimir" icon="pi pi-check" class="p-button-text" @click="imprimirFicha()" />
            </template>
        </Dialog>
  </div>
  
</template>

<script>

import { FilterMatchMode } from 'primevue/api'
import * as profesorService from '@/services/profesor.service'
import * as userService from '@/services/user.service'
import * as tipousuarioService from '@/services/tipousuario.service'
import * as distritoService from '@/services/distrito.service'

export default {
    data() {
        return {
            profesores: null,
            selectedProfesores: null,
            filters: {},
            dialog: false,
            profesor: {},
            submitted: false,
            estadoEdicion: false,
            verDialog: false,
            statusSexo: [
                {label: 'Masculino', value: 'Masculino'},
                {label: 'Femenino', value:'Femenino'}
            ],
            statusInstruc: [
                {label: 'Primaria', value: 'Primaria'},
                {label: 'Secundaria', value: 'Secundaria'},
                {label: 'Tenico', value: 'Tenico'},
                {label: 'Universitaria', value: 'Universitaria'},
            ],
            statusPais: [
                {label: 'Agentina', value: 'Agentina'},
                {label: 'Bolivia', value: 'Bolivia'},
                {label: 'Brasil', value: 'Brasil'},
                {label: 'Colombia', value: 'Colombia'},
                {label: 'Chile', value: 'Chile'},
                {label: 'Ecuador', value: 'Ecuador'},
                {label: 'Paraguay', value: 'Paraguay'},                
                {label: 'Perú', value: 'Perú'},
                {label: 'Venezuela', value: 'Venezuela'},
                {label: 'Uruguay', value: 'Uruguay'},
            ],
            status: [
                {label: 'Activo', value: 1},
                {label: 'Inactivo', value: 0}
            ],
            DialogUsers: false,
            user: {},
            tipousuarios: [],
            users: null,
            rolNom: '',
            Apaterno: '',
            Amaterno: '',
            estados: [
                {label:"Activo", value: 1},
                {label:"Inactivo", value: 0}
            ],
            date: '',
            time: '',
            distritos: {}
        }
    },
    created() {
        this.initFilters();
    },
    mounted() {
        this.listaProfesor()
        this.printDate();
        this.printTime();
    },
    methods: {
        async listaProfesor() {
            const { data } = await profesorService.listarProfesores();
            this.profesores = data.data;
            const tipouser = await tipousuarioService.listarTiposuarios();
            this.tipousuarios = tipouser.data;
            const usu = await userService.listarUsuarios();
            this.users = usu.data;
            const dist = await distritoService.listarDistritos();
            this.distritos = dist.data;
        },
        abrirDialog() {
            this.dialog = true;
            this.profesor = {};
        },
        cerrarDialog() {
            this.dialog = false;
        },
        async guardaProfesor() {
            let datos;
            if (this.estadoEdicion) {
                datos = await profesorService.modificarProfesores(this.profesor.id, this.profesor);
                this.profesor = datos;              
            }
            else {
                datos = await profesorService.guardarProfesores(this.profesor);
                this.profesor = datos;
            }
            if(!datos.data.error) {
                this.listaProfesor();
                this.cerrarDialog();
                this.estadoEdicion = false;
                this.profesor = {};
            }
        },
        editarProfesores(data) {
            this.profesor = data;
            this.estadoEdicion = true;
            this.dialog = true;
        },
        verProfesores(data) {
            console.log(data);
            this.profesor = data;
            this.rolNom = data.user.tipousuario.tipo_nom;
            this.verDialog = true;
        },
        asignarUsers(datos) {
            this.user = datos;
            this.user.name = datos.pro_nom;
            this.user.usu_dni = datos.pro_dni;
            this.user.email = datos.pro_correo;
            this.user.usu_dir = datos.pro_dire;
            this.user.usu_telf = datos.pro_telf;
            this.user.profesor_id = datos.id;
            this.Apaterno = datos.pro_app;
            this.Amaterno = datos.pro_apm
            this.user.usu_rgst = this.date +' '+ this.time;
            this.DialogUsers = true;            
        },
        printDate() {
            const date = new Date().toLocaleDateString();
            this.date = date;
        },
        printTime() {
            const time = new Date().toLocaleTimeString();
            this.time = time;
        },
        async guardarUsers() {
            const { data } = await userService.guardarUsuarios(this.user);
            this.user = data;
            this.cerrarUsers();
            this.listaProfesor();
        },
        cerrarUsers() {
            this.DialogUsers = false;
        },
        cerrarVerDialog() {
            this.verDialog = false;
        },
        confirmDeleteProduct(data) {
            this.$confirm.require({
                message: 'Esta seguro que desea eliminar ',
                header: 'Eliminar',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: async () => {
                data = await profesorService.eliminarProfesores(data.id)
                this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
                this.listaProfesor();
                },
                reject: () => {
                this.$toast.add({severity:'error', summary:'Cancelado', detail:'Aceptaste Cancelar', life: 3000});
                }      
            });
        },
        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
            margin-bottom: 0.25rem;
        }
	}
}
</style>