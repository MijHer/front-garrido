<template>
  <div class="card">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <Toolbar class="mb-4">
        <template #start>
            <Button label="Nuevo Curso" icon="pi pi-plus" class="p-button-success mr-2" @click="nuevoCurso" />            
        </template>
        <template #end>
            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
            <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
        </template>
    </Toolbar>
    <DataTable ref="dt" :value="cursos" v-model:selection="selectedCursos" dataKey="id" 
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
        <template #header>
            <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                <h5 class="mb-2 md:m-0 p-as-md-center">Lista de Cursos</h5>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Search..." />
                </span>
            </div>
        </template>
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="cur_nom" header="Nombre" :sortable="true" style="min-width:12rem"></Column>
        <Column field="cur_descripcion" header="Descripción" :sortable="true" style="min-width:16rem"></Column>
        <Column field="cur_grado" header="Estado" :sortable="true" style="min-width:16rem">
        <Column field="cur_registro" header="Registro" :sortable="true" style="min-width:16rem"></Column>
            <template #body ="slotProps">
                {{slotProps.data.cur_estado == 1?"Activo":"Inactico"}}
            </template>            
        </Column>        
        <Column :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editCurso(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteCurso(slotProps.data)" />
            </template>
        </Column>
    </DataTable>
    <Dialog v-model:visible="Dialog" :style="{width: '450px'}" header="Curso Nuevo" :modal="true" class="p-fluid">
        <div class="field">
            <label for="cur_nom">Nombre</label>
            <InputText id="cur_nom" v-model.trim="curso.cur_nom" required="true" autofocus :class="{'p-invalid': submitted && !curso.cur_nom}" />            
        </div>
        <div class="field">
            <label for="cur_descripcion">Descripción</label>
            <InputText id="cur_descripcion" v-model.trim="curso.cur_descripcion" required="true" autofocus :class="{'p-invalid': submitted && !curso.cur_descripcion}" />            
        </div>
        <div class="field">
            <label for="cur_estado">Estado</label>
            <Dropdown v-model.trim="curso.cur_estado" :options="status" optionLabel="label" optionValue="value" required="true">
            </Dropdown>            
        </div>
        <div class="field">
            <label for="cur_registro">Registro</label>
            <InputText id="cur_registro" v-model="curso.cur_registro" required="true" rows="3" cols="20" />
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
            <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarCurso" />
        </template>
        {{curso}}
    </Dialog>
  </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api';
import * as cursoService from '@/services/curso.service'

export default {
    data() {
        return {
            cursos: null,
            selectedCursos: null,
            Dialog: false,
            curso: {},
            estado: false,
            status: [
                {label: "Activo", value: '1'},
                {label: "Inactivo", value: '0'}
            ]
        }
    },
    created() {        
        this.initFilters();
    },
    mounted() {
        this.listaCurso();
    },
    methods: {
        async listaCurso () {
            const {data} = await cursoService.listarCursos();
            this.cursos = data;
        },
        nuevoCurso() {
            this.Dialog = true;
            this.curso = {};
        },
        cerrarDialog() {
            this.Dialog = false;           
        },
        async guardarCurso() {
            let datos;
            if (this.estado) {
                datos = await cursoService.modificarCursos(this.curso.id, this.curso);
                this.curso = datos;
            } else {
                datos = await cursoService.guardarCursos(this.curso);
                this.curso = datos;                
            }
            if(!datos.data.error) {
                this.listaCurso();
                this.cerrarDialog();
                this.estado = false;
                this.curso = {};
            }
        },
        editCurso(data) {
            this.curso = data;
            this.estado = true;
            this.Dialog = true;
        },
        confirmDeleteCurso(data) {
            this.$confirm.require({
                message: 'Esta seguro que desea eliminar ',
                header: 'Eliminar',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: async () => {
                data = await cursoService.eliminarCursos(data.id)
                this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
                this.listaCurso();
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