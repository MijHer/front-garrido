<template>
  <div class="card">
    <h4>Lista de cursos</h4>
    <DataTable ref="dt" :value="asistencias" v-model:selection="selectedAsistencias" dataKey="id" 
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
        <template #header>
          <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center">Manage Products</h5>
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
          </div>
        </template>
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="curso.cur_nom" header="Curso" :sortable="true" style="min-width:12rem"></Column>
        <Column field="grado.gra_nom" header="Grado" :sortable="true" style="min-width:16rem"></Column>           
        <Column :exportable="false" style="min-width:8rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
            </template>
        </Column>
    </DataTable>
  </div>
  <li>{{curso}}</li>
  <li>{{grado}}</li>
</template>

<script>

import { FilterMatchMode } from 'primevue/api';

import * as cursoService from '@/services/curso.service'
import * as gradoService from '@/services/grado.service'

export default {
    data() {
      return {       
        asistencias: null,
        selectedAsistencias: null,
        curso: {},
        grado: {}
      }
    },
    created() {
      this.initFilters();
    },
    mounted() {
      this.listaAsistencias();
    },
    methods: {
      async listaAsistencias() {
        const cur = await cursoService.listarCursos();
        this.curso = cur.data;
        console.log(this.curso);
        const gra = await gradoService.listarGrados();
        this.grado = gra.data;
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