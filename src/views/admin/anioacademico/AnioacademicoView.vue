<template>
  <div class="card">
      <Toast />
        <ConfirmDialog></ConfirmDialog>
      <h2>Crear Año academico</h2>
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Crear Año Academico" icon="pi pi-plus" class="p-button-success mr-2" @click="anioacademicoNuevo" />                
            </template>>
        </Toolbar>
        <DataTable :value="anioacademicos" responsiveLayout="scroll">
            <Column field="anio_nom" header="Nombre"></Column>
            <Column field="anio_detalle" header="Detalle"></Column>
            <Column field="anio_inicio" header="Inicio"></Column>
            <Column field="anio_fin" header="Fin"></Column>
            <Column field="anio_estado" header="Estado">
                <template #body="slotProps">
                    {{slotProps.data.anio_estado == 1?"Activo":"Inactivo"}}
                </template>
            </Column>          
            <Column :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="borrarAnio(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="DialogAnio" :style="{width: '450px'}" header="Año Academico Nuevo" :modal="true" class="p-fluid">            
            <div class="field">
                <label for="anoi_nom">Nombre</label>
                <InputText id="anoi_nom" v-model.trim="anioacademico.anio_nom" required="true" autofocus :class="{'p-invalid': submitted && !anioacademico.anio_nom}" />
                <small class="p-error" v-if="submitted && !anioacademico.anio_nom">Nombre es requerido.</small>
            </div>
            <div class="field">
                <label for="anio_detalle">Detalle</label>
                <InputText id="anio_detalle" v-model="anioacademico.anio_detalle" required="true" rows="3" cols="20" />
            </div>
            <div class="field">
                <label for="anio_inicio">Fecha Inicio</label>                
                <Calendar inputId="icon" v-model="anioacademico.anio_inicio" :showIcon="true" />
            </div>
            <div class="field">
                <label for="anio_fin">Fecha Fin</label>
                <Calendar inputId="icon" v-model="anioacademico.anio_fin" :showIcon="true" />
            </div>
            <div class="field">
                <label for="anio_estado" class="mb-3">Estado</label>
                <Dropdown id="anio_estado" v-model="anioacademico.anio_estado" :options="statusAnoi" optionLabel="label" optionValue="value" placeholder="Selecione Estado">                        
                </Dropdown>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialogAnio"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarAnioacademico" />
            </template>
        </Dialog>
        <h2>Crear Grado Academico</h2>                
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Crear Grado Academico" icon="pi pi-plus" class="p-button-success mr-2" @click="gradoNuevo" />
            </template>
            <template #end>
                <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
            </template>
        </Toolbar>
        <DataTable ref="dt" :value="grados" v-model:selection="selectedGrados" dataKey="id" 
            :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
            <template #header>
                <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                    <h5 class="mb-2 md:m-0 p-as-md-center">Lista de Grados</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                    </span>
                </div>
            </template>
            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="gra_nom" header="Nombre" :sortable="true"  style="min-width:12rem"></Column>
            <Column field="gra_seccion" header="Sección" :sortable="true"  style="min-width:12rem"></Column>
            <Column field="gra_nivel" header="Nivel" :sortable="true"  style="min-width:12rem"></Column>
            <Column field="gra_registro" header="Registro" :sortable="true"  style="min-width:12rem"></Column>
            <Column field="gra_estado" header="Estado" :sortable="true"  style="min-width:12rem">
                <template #body="slotProps">
                    {{slotProps.data.gra_estado == 1?"Activo":"Inactivo"}}
                </template>
            </Column>
            <Column :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editarGrado(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="borrarGrado(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="DialogGrado" :style="{width: '450px'}" header="Grado Academico Nuevo" :modal="true" class="p-fluid">            
            <div class="field">
                <label for="gra_nom">Nombre</label>
                <InputText id="gra_nom" v-model="grado.gra_nom" required="true" autofocus />
                <label for="gra_seccion">Sección</label>
                <InputText id="gra_seccion" v-model="grado.gra_seccion" required="true" autofocus />
                <div class="field">
                    <label for="gra_nivel" class="mb-3">Nivel</label>
                    <Dropdown id="gra_nivel" v-model="grado.gra_nivel" :options="nivel" optionLabel="label" optionValue="value"  placeholder="Selecione Nivel Academico">                        
                    </Dropdown>
                </div>
                <label for="gra_registro">Fecha de Registro</label>
                <Calendar inputId="icon" v-model="grado.gra_registro" :showIcon="true" />
                <div class="field">
                    <label for="gra_estado" class="mb-3">Estado</label>
                    <Dropdown id="gra_estado" v-model="grado.gra_estado" :options="statusGra" optionLabel="label" optionValue="value" placeholder="Selecione Estado">                        
                    </Dropdown>
                </div>
            </div>           
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarGrado" />
            </template>          
        </Dialog>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import * as anioacademicoService from '../../../services/anioacademico.service.js';
import * as gradoService from '../../../services/grado.service';

export default {
    data() {
        return {
            anioacademicos: null,
            anioacademico: {},
            grados: null,
            grado: {},
            filters: {},
            DialogGrado: false,
            DialogAnio: false,
            selectedGrados: null,
            statusAnoi: [
                {label: 'ACTIVO', value: '1'},
                {label: 'INACTIVO', value: '0'}
                ],
            nivel: [
                {label: 'Inicial', value: 'Inicial'},
                {label: 'Primaria', value: 'Primaria'},
                {label: 'Secundaria', value: 'Secundaria'}
            ],
            statusGra: [
                {label: 'ACTIVO', value: '1'},
                {label: 'INACTIVO', value: '0'}
            ],
            estadoedicion: false
        }
    },
    created() {
        this.initFilters();
    },
    mounted() {
        this.listaAnioacademico();
        this.listaGrado();
    },
    methods: {
       async listaAnioacademico() {
        const {data} = await anioacademicoService.listarAnioacademicos();
        this.anioacademicos = data;
       },
       async listaGrado() {
        const {data} = await gradoService.listarGrados();
        this.grados = data;
       },
       cerrarDialogAnio() {
           this.DialogAnio = false;
       },
       cerrarDialog() {
           this.DialogGrado = false;
       },
       anioacademicoNuevo() {
           this.DialogAnio = true;
       },
        gradoNuevo() {
            this.DialogGrado = true;
        },
       async guardarAnioacademico() {
           const {data} = await anioacademicoService.guardarAnioacademicos(this.anioacademico);
           this.anioacademico = data;
           this.DialogAnio = false;
           this.listaAnioacademico();
       },
       async guardarGrado() {
            let datos;
            if (this.estadoedicion) {
                datos = await gradoService.mofidicarGrados(this.grado.id, this.grado);
                this.grado = datos;
            }
            else {
                datos = await gradoService.guardarGrados(this.grado);
                this.grado = datos;
            }
            if (!datos.data.error) {
                this.estadoedicion = false;
                this.DialogGrado = false;
                this.listaGrado();
            }
       },
       editarGrado(data) {
            this.grado = data;
            this.DialogGrado = true;
            this.estadoedicion = true;
       },
       async borrarGrado(data) {
            this.$confirm.require({
            message: 'Esta seguro que desea eliminar ',
            header: 'Eliminar',
            icon: 'pi pi-info-circle',
            acceptClass: 'p-button-danger',
            accept: async () => {
            data = await gradoService.eliminarGrados(data.id)
            this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
            this.listaGrado();
            },
            reject: () => {
            this.$toast.add({severity:'error', summary:'Cancelado', detail:'Aceptaste Cancelar', life: 3000});
            }
        });
       },
       async borrarAnio(data) {
            this.$confirm.require({
            message: 'Esta seguro que desea eliminar ',
            header: 'Eliminar',
            icon: 'pi pi-info-circle',
            acceptClass: 'p-button-danger',
            accept: async () => {
            data = await anioacademicoService.eliminarAnioacademicos(data.id)
            this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
            this.listaAnioacademico();
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