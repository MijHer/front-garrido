<template>
  <div class="card">
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Registar Apoderado" icon="pi pi-plus" class="p-button-success mr-2" @click="abrirDialog" />
                <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
            </template>

            <template #end>
                <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
            </template>
        </Toolbar>
        <DataTable ref="dt" :value="apoderados" v-model:selection="selectedApoderados" dataKey="id" 
            :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
            <template #header>
                <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                    <h5 class="mb-2 md:m-0 p-as-md-center">Lista de Apoderados</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                    </span>
                </div>
            </template>
            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="apo_nom" header="Nombres" :sortable="true" style="min-width:10rem"></Column>
            <Column field="apo_app" header="A. Paterno" :sortable="true" style="min-width:10rem"></Column>
            <Column field="apo_apm" header="A. Materno" :sortable="true" style="min-width:10rem"></Column>            
            <Column field="apo_vinculo" header="Vínculo" :sortable="true" style="min-width:10rem"></Column>            
            <Column field="apo_dni" header="DNI" :sortable="true" style="min-width:10rem"></Column>
            <Column field="apo_estado" header="Estado" :sortable="true" style="min-width:10rem">
                <template #body="slotProps">
                    {{slotProps.data.apo_estado == 1?"Activo":"Inactivo"}}
                </template>
            </Column>            
            <Column :exportable="false" style="min-width:10rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editarApoderados(slotProps.data)" />
                    <Button icon="pi pi-user" class="p-button-rounded p-button-info mr-2" @click="verApoderados(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <!-- DIALOG PARA CREAR UN APODERADO NUEVO -->
        <Dialog v-model:visible="dialog" :style="{width: '1000px'}" header="Nuevo Apoderado" :modal="true" class="p-fluid">            
            <div class="formgrid grid">            
                <div class="field col">
                    <label for="apo_nom">Nombre</label>
                    <InputText id="apo_nom" v-model.trim="apoderado.apo_nom" required="true" autofocus :class="{'p-invalid': submitted && !apoderado.apo_nom}" />
                    <small class="p-error" v-if="submitted && !apoderado.apo_nom">Nombre es requerido.</small>
                </div>
                <div class="field col">
                    <label for="apo_app">A. Paterno</label>
                    <InputText id="apo_app" v-model.trim="apoderado.apo_app" required="true" autofocus :class="{'p-invalid': submitted && !apoderado.apo_app}" />
                    <small class="p-error" v-if="submitted && !apoderado.apo_app">Apellido requerido.</small>
                </div>
                <div class="field col">
                    <label for="apo_apm">A. Materno</label>
                    <InputText id="apo_apm" v-model.trim="apoderado.apo_apm" required="true" autofocus :class="{'p-invalid': submitted && !apoderado.apo_apm}" />
                    <small class="p-error" v-if="submitted && !apoderado.apo_apm">Apellido requerido.</small>
                </div>
            </div>
            <div class="formgrid grid">            
                <div class="field col">
                    <label for="apo_dni">DNI</label>
                    <InputText id="apo_dni" v-model.trim="apoderado.apo_dni" required="true" autofocus :class="{'p-invalid': submitted && !apoderado.apo_dni}" />
                    <small class="p-error" v-if="submitted && !apoderado.apo_dni">DNI es requerido.</small>
                </div>
                <div class="field col">
                    <label for="apo_telf">Teléfono</label>
                    <InputText id="apo_telf" v-model.trim="apoderado.apo_telf" required="true" autofocus :class="{'p-invalid': submitted && !apoderado.apo_telf}" />
                    <small class="p-error" v-if="submitted && !apoderado.apo_telf">Telefóno requerido.</small>
                </div>
                <div class="field col">
                    <label for="apo_dir">Dirección</label>
                    <InputText id="apo_dir" v-model.trim="apoderado.apo_dir" required="true" autofocus :class="{'p-invalid': submitted && !apoderado.apo_dir}" />
                    <small class="p-error" v-if="submitted && !apoderado.apo_dir">Dirección requerido.</small>
                </div>
            </div>
            <div class="formgrid grid">            
                <div class="field col">
                    <label for="apo_fnac">Fecha de nacimiento</label>
                    <!-- <InputText id="apo_dir" v-model="apoderado.apo_fnac" required="true" /> -->
                    <Calendar id="apo_fnac" v-model="apoderado.apo_fnac" :showIcon="true"  hourFormat="12" dateFormat="dd/mm/yy" />
                </div>
                <div class="field col">
                    <label for="apo_vinculo">Vínculo</label>
                    <InputText id="apo_vinculo" v-model.trim="apoderado.apo_vinculo" required="true" autofocus :class="{'p-invalid': submitted && !apoderado.apo_vinculo}" />
                    <small class="p-error" v-if="submitted && !apoderado.apo_vinculo">Apellido requerido.</small>
                </div>
                <div class="field col">
                    <label for="apo_grado_inst">Grado de instrucción</label>
                    <InputText id="apo_grado_inst" v-model.trim="apoderado.apo_grado_inst" required="true" autofocus :class="{'p-invalid': submitted && !apoderado.apo_grado_inst}" />
                    <small class="p-error" v-if="submitted && !apoderado.apo_grado_inst">Apellido requerido.</small>
                </div>
            </div>
            <div class="formgrdi grid">
                <div class="field col">
                    <label for="apo_estado">Estado</label>                    
                    <Dropdown id="apo_estado" v-model="apoderado.apo_estado" :options="status" optionLabel="label" optionValue="value" placeholder="Selecione Estado">                                            
                    </Dropdown>
                </div>              
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardaApoderado" />
            </template>
        </Dialog>
        <!-- DIALOG PARA MOSTRAR DATOS DEL APODERADO -->
        <Dialog v-model:visible="verDialog" :style="{width: '1000px', text: 'center'}" header="Datos del Apoderado" :modal="true" class="p-fluid">
            <div class="card">
                <div class="formgrid grid">                     
                    <div class="field col">
                        <label for="apo_nom"><b>Nombre:</b></label>
                        <p style="min-width:16rem" v-text="apoderado.apo_nom"></p>
                    </div>
                    <div class="field col">
                        <label for="apo_app">A. Paterno:</label>
                        <p style="min-width:16rem" v-text="apoderado.apo_app"></p>
                    </div>
                    <div class="field col">
                        <label for="apo_apm">A. Materno:</label>
                        <p style="min-width:16rem" v-text="apoderado.apo_apm"></p>          
                    </div>
                </div>                    
                <div class="formgrid grid">
                    <div class="field col">
                        <label for="apo_dni">DNI:</label>
                        <p style="min-width:16rem" v-text="apoderado.apo_dni"></p>          
                    </div>
                    <div class="field col">
                        <label for="apo_telf">Telefóno:</label>
                        <p style="min-width:16rem" v-text="apoderado.apo_telf"></p>          
                    </div>
                    <div class="field col">
                        <label for="apo_dir">Dirección:</label>
                        <p style="min-width:16rem" v-text="apoderado.pro_sexo"></p>          
                    </div>
                    
                </div>
                <div class="formgrid grid">
                    <div class="field col">
                        <label for="apo_fnac">Fecha de nacimiento:</label>
                        <p style="min-width:16rem" v-text="apoderado.apo_fnac"></p>
                    </div>
                    <div class="field col">
                        <label for="apo_vinculo">Vínculo:</label>
                        <p style="min-width:16rem" v-text="apoderado.apo_vinculo"></p>
                    </div>
                    <div class="field col">
                        <label for="apo_grado_inst">Grado de instrucción:</label>
                        <p style="min-width:16rem" v-text="apoderado.apo_grado_inst"></p>
                    </div>                    
                </div>
                <div class="formgrid grid">
                    <div class="field col">
                        <label for="apo_estado">Estado:</label>                         
                        <p style="min-width:16rem" v-if="apoderado.apo_estado == 1" >Activo
                        </p>
                        <p style="min-width:16rem" v-else>Inactivo
                        </p>
                    </div>
                    <div class="field col"></div>
                    <div class="field col"></div>
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
import * as apoderadoService from '../../../services/apoderado.service';

export default {
    data() {
        return {
            apoderados: null,
            selectedApoderados: null,
            filters: {},
            dialog: false,
            apoderado: {},
            submitted: false,
            estadoEdicion: false,
            verDialog: false,
            status: [
                    {label: 'ACTIVO', value: '1'},
                    {label: 'INACTIVO', value: '0'}
                ]
        }
    },
    created() {
        this.initFilters();
    },
    mounted() {        
        this.listaApoderado()
    },
    methods: {
        async listaApoderado() {
            const { data } = await apoderadoService.listarApoderados();
            this.apoderados = data.data;           
        },
        abrirDialog() {
            this.apoderado = {};
            this.dialog = true;
        },
        cerrarDialog() {
            this.dialog = false;
        },
        async guardaApoderado() {
            let datos;
            if (this.estadoEdicion) {
                datos= await apoderadoService.modificarApoderados(this.apoderado.id, this.apoderado);
                this.apoderado = datos;
            }
            else {
                datos = await apoderadoService.guardarApoderados(this.apoderado);
                this.apoderado = datos;
            }
            if(!datos.data.error) {
                this.listaApoderado();
                this.cerrarDialog();
                this.estadoEdicion = false;
                this.apoderado = {};
            }
        },
        editarApoderados(data) {
            this.apoderado = data;
            this.estadoEdicion = true;
            this.dialog = true;
        },
        verApoderados(data) {
            this.apoderado = data;
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
                data = await apoderadoService.eliminarApoderados(data.id)
                this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
                this.listaApoderado();
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