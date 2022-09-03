<template>
  <div class="card">    
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Registar Profesor" icon="pi pi-plus" class="p-button-success mr-2" @click="abrirDialog" />
                <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
            </template>

            <template #end>
                <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
            </template>
        </Toolbar>
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
                    <InputText id="pro_distrito" v-model.trim="profesor.pro_distrito" required="true" autofocus :class="{'p-invalid': submitted && !profesor.pro_distrito}" />
                    <small class="p-error" v-if="submitted && !profesor.pro_distrito">Campo Requerido.</small>
                </div>
                <div class="field col">
                    <label for="user_id">Usuario</label>
                    <InputText id="user_id" v-model.trim="profesor.user_id" required="true" autofocus :class="{'p-invalid': submitted && !profesor.user_id}" />
                    <small class="p-error" v-if="submitted && !profesor.user_id">Campo Requerido.</small>
                </div>
                <div class="field col">
                    <label for="pro_estado">Estado</label>
                    <Dropdown id="pro_estado" v-model="profesor.pro_estado" :options="status" optionLabel="label" optionValue="value" placeholder="Selecione Pais">                        
                    </Dropdown>                    
                </div>
            </div>
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
            <Column field="pro_nom" header="Nombres" :sortable="true" style="min-width:16rem"></Column>
            <Column field="pro_app" header="A. Paterno" :sortable="true" style="min-width:16rem"></Column>
            <Column field="pro_apm" header="A. Materno" :sortable="true" style="min-width:16rem"></Column>
            <Column field="pro_estado" header="Estado" :sortable="true" style="min-width:16rem">
                <template #body="slotProps">
                    {{slotProps.data.pro_estado == 1?"Activo":"Inactivo"}}
                </template>
            </Column>
            <Column field="pro_telf" header="Telefono" :sortable="true" style="min-width:16rem"></Column>            
            <Column field="pro_especialidad" header="Especialidad" :sortable="true" style="min-width:16rem"></Column>            
            <Column :exportable="false" style="min-width:16rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editarProfesores(slotProps.data)" />
                    <Button icon="pi pi-bookmark" class="p-button-rounded p-button-secondary mr-2" @click="verProfesores(slotProps.data)" />
                    <Button icon="pi pi-user" class="p-button-rounded p-button-info mr-2" @click="asignarRol(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>            
        </DataTable>
        <Dialog v-model:visible="verDialog" :style="{width: '900', text: 'center'}" header="Datos del Profesor" :modal="true" class="p-fluid">
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
                <div class="field">
                    <label for="pro_estado">Estado</label>
                    <p style="min-width:16rem" v-text="profesor.pro_estado"></p>
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

import { FilterMatchMode } from 'primevue/api';
import * as profesorService from '../../../services/profesor.service';

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
                {label: 'MASCULINO', value: 'masculino'},
                {label: 'FEMENINO', value:'femenino'}
            ],
            statusInstruc: [
                {label: 'PRIMARIA', value: 'primaria'},
                {label: 'SECUNDARIA', value: 'secundaria'},
                {label: 'TECNICO', value: 'tecnico'},
                {label: 'UNIVERSITARIA', value: 'universitaria'},
            ],
            statusPais: [
                {label: 'AGENTINA', value: 'AGENTINA'},
                {label: 'BOLIVIA', value: 'BOLIVIA'},
                {label: 'BRASIL', value: 'BRASIL'},
                {label: 'COLOMBIA', value: 'COLOMBIA'},
                {label: 'CHILE', value: 'CHILE'},
                {label: 'ECUADOR', value: 'ECUADOR'},
                {label: 'PARAGUAY', value: 'PARAGUAY'},                
                {label: 'PERÚ', value: 'PERÚ'},
                {label: 'VENEZUELA', value: 'VENEZUELA'},
                {label: 'URUGUAY', value: 'URUGUAY'},
            ],
            status: [
                {label: 'ACTIVO', value:'1'},
                {label: 'INACTIVO', value:'0'}
            ]
        }
    },
    created() {
        this.initFilters();
    },
    mounted() {
        this.listaProfesor()
    },
    methods: {
        async listaProfesor() {
            const { data } = await profesorService.listarProfesores();
            this.profesores = data.data;
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
            this.profesor = data;
            this.verDialog = true;
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