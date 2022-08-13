<template>
  <div class="card">
    <Toolbar class="mb-4">      
        <template #end>
            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
            <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
        </template>
    </Toolbar>
    <DataTable ref="dt" :value="matriculas" v-model:selection="selectedMatriculas" dataKey="id" 
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
        <template #header>
            <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                <h5 class="mb-2 md:m-0 p-as-md-center">Alumnos Matriculados</h5>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Search..." />
                </span>
            </div>
        </template>
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="mat_cod_modular" header="Codigo Modular" :sortable="true" style="min-width:10rem"></Column>
        <Column field="alumno.alu_nom" header="Alumno" :sortable="true" style="min-width:16rem"></Column>
        <Column field="mat_nivel" header="Nivel" :sortable="true" style="min-width:8rem"></Column>
        <Column field="grado.gra_nom" header="Grado" :sortable="true" style="min-width:8rem"></Column>
        <Column field="mat_turno" header="Turno" :sortable="true" style="min-width:8rem"></Column>
        <Column field="mat_costo" header="Pago de matricula" :sortable="true" style="min-width:8rem"></Column>
        <Column field="mat_fecha" header="Fecha de matricula" :sortable="true" style="min-width:8rem"></Column>
        <Column field="distrito.dist_nom" header="Distrito" :sortable="true" style="min-width:8rem"></Column>
        <Column field="apoderado.apo_nom" header="Apoderado" :sortable="true" style="min-width:16rem"></Column>
        <Column :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
            </template>
        </Column>       
    </DataTable>
  </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api';
import * as matriculaService from '../../../services/matricula.service';
import * as alumnoService from '../../../services/alumno.service';
import * as gradoService from '@/services/grado.service';
import * as anioacademicoService from '@/services/anioacademico.service';
import * as distritoService from '@/services/distrito.service';
import * as apoderadoService from '@/services/apoderado.service';


export default {
    data() {
        return {
            matriculas: null,
            selectedMatriculas: null,
            matricula: {},
            filters: {},
            Dialog: false,
            alumnos: {},
            grados: {},
            anioacademicos: {},
            distritos: {},
            apoderados : {}
        }
    },
    created() {
        this.initFilters();
    },
    mounted() {
        this.listaMatricula();
    },
    methods: {
        async listaMatricula() {
            const {data} = await matriculaService.listarMatriculas();
            this.matriculas = data.data;
            const alu = await alumnoService.listarAlumnos();
            this.alumnos = alu.data.data;
            const grad = await gradoService.listarGrados();
            this.grados = grad.data;
            const anioaca = await anioacademicoService.listarAnioacademicos();
            this.anioacademicos = anioaca.data;
            const dist = await distritoService.listarDistritos();
            this.distritos = dist.data;
            const apo = await apoderadoService.listarApoderados();
            this.apoderados = apo.data.data;
        },
        matriculaNuevo() {
            this.Dialog = true;
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