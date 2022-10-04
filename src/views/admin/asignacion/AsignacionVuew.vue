<template>
  <div class="card">
    <Toolbar class="mb-4">
        <template #start>
            <Button label="Asignar Curso" icon="pi pi-plus" class="p-button-success mr-2" @click="asignarNuevo" />
        </template>        
    </Toolbar>
    <DataTable ref="dt" :value="asignados" v-model:selection="selectedAsignados" dataKey="id" 
      :paginator="true" :rows="10" :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
      <template #header>
          <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center">Cursos Asignados</h5>
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
          </div>
      </template>
      <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
      <Column field="profesor.pro_nom" header="Profesor" :sortable="true" style="min-width:12rem"></Column>
      <Column field="curso.cur_nom" header="Curso" :sortable="true" style="min-width:16rem"></Column>      
      <Column field="grado.gra_nom" header="Grado" :sortable="true" style="min-width:10rem"></Column>
      <Column field="grado.gra_nom" header="Sección" :sortable="true" style="min-width:10rem"></Column>
      <Column field="anioacademico.anio_inicio" header="Periodo Academico" :sortable="true" style="min-width:10rem"></Column>      
      <Column field="estado" header="Estado" :sortable="true" style="min-width:10rem">
        <template #body="slotProps">
          {{slotProps.data.estado = 1 ?"Activo":"Inactivo"}}
        </template>
      </Column>
      <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
              <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteProduct(slotProps.data)" />
          </template>
      </Column>
    </DataTable>
    <Dialog v-model:visible="Dialog" :style="{width: '700px'}" header="Product Details" :modal="true" class="p-fluid">
      <div class="field">
        <label for="profesor_id" class="mb-3">Profesor</label>
        <Dropdown id="profesor_id" v-model="asignar.profesor_id" :options="profesor" optionLabel="cur_nom" optionValue="id" placeholder="Selecione Profesor">          
        </Dropdown>
      </div>      
      <template #footer>
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
          <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
      </template>
    </Dialog>
  </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api'
import * as cursoService from '@/services/curso.service'
import * as anioacademicoService from '@/services/anioacademico.service'
import * as profesorService from '@/services/profesor.service'
import * as gradoService from '@/services/grado.service'
import * as asisgnacionService  from '@/services/asignacion.service'

export default {
  data() {
    return {
      asignados: null,
      selectedAsignados: null,
      Dialog: false,
      asignar: {},
      curso: {},
      anioacademico: {},
      profesor: {},
      grado: {}
    }
  },
  created() {
      this.initFilters();
  },
  mounted() {
    this.listaAsignaciones();
  },
  methods: {
    async listaAsignaciones() {
      const {data} = await asisgnacionService.listarAsignaciones();
      this.asignados = data.data;
      const cur = await cursoService.listarCursos();
      this.curso = data.cur;
      const anio = await anioacademicoService.listarAnioacademicos();
      this.anioacademico = data.anio;
      const prof = await profesorService.listarProfesores();
      this.profesor = data.prof;
      const gra = await gradoService.listarGrados();
      this.grado = data.grado;
    },
    asignarNuevo () {
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