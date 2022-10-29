<template>
  <div class="card">
    <h1>lista de asistencia</h1>
      <DataTable ref="dt" :value="cursos" v-model:selection="selected" dataKey="id" 
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
      <Column field="cur_nom" header="Curso" :sortable="true" style="min-width:12rem"></Column>
      <Column field="gra_nom" header="Grado" :sortable="true" style="min-width:10rem"></Column>
      <Column field="gra_seccion" header="sección" :sortable="true" style="min-width:10rem"></Column>
      <Column field="cur_estado" header="Estado" :sortable="true" style="min-width:16rem">
        <template #body="slotProps">
          {{slotProps.data.cur_estado == 1?"Activo":"Inactivo"}}
        </template>
      </Column>      
      <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
              <Button label="Asistencia" class="p-button-rounded p-button-info" @click="llamarAsistencia(slotProps.data)" />              
          </template>
      </Column>
      {{grados}}
    </DataTable>
    <!-- DIALOG PARA ABRIR MODAL Y LLAMAR LA ASISTENCIA -->
    <Dialog v-model:visible="asistenciaDialog" :style="{width: '950px'}" header="Registrar Asistencia" :modal="true" class="p-fluid">            
      <h4>Lista de alumnos</h4>
      <table class="table">
        <thead>
          <tr>
            <th>nombre</th>
            <th>apellido</th>
            <th>asistio</th>
            <th>tarde</th>
            <th>permiso</th>
            <th>permiso</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="alumno in alumnos" :key="alumno">
            <td>{{alumno.alu_nom}}</td>
            <td>{{alumno.alu_app +' '+ alumno.alu_apm}}</td>
            <td>                
            <Checkbox inputId="binary" v-model="pivot.asistencia" :binary="true" />
            <label for="binary"></label>
            </td>
            <td>                
            <Checkbox inputId="binary" v-model="pivot.falta" :binary="true" />
            <label for="binary"></label>
            </td>
            <td>                
            <Checkbox inputId="binary" v-model="pivot.tardanza" :binary="true" />
            <label for="binary"></label>
            </td>
            <td>                
            <Checkbox inputId="binary" v-model="pivot.permiso" :binary="true" />
            <label for="binary"></label>
            </td>
          </tr>
        </tbody>
      </table>                          
      <template #footer>
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
          <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
      </template>
    </Dialog>
  </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api';
import * as cursoService from '@/services/curso.service'
import * as profesorService from '@/services/profesor.service'
import * as gradoService  from '@/services/grado.service'
import * as alumnoService from '@/services/alumno.service'

export default {
  data() {
    return {
      cursos: null,
      profesores: null,
      filters: {},
      selected: null,
      grados: [],
      asistenciaDialog: false,
      alumnos: null,
      checked: false,
      pivot: {}
    }
  },
  created() {
      this.initFilters();
  },
  mounted() {
    this.listaCurso();
  },
  methods: {
    async listaCurso() {
      const cur = await cursoService.listarCursos();
      this.cursos = cur.data;
      const profe = await profesorService.listarProfesores();
      this.profesores = profe.data.data;
      const gra = await gradoService.listarGrados();
      this.grados = gra.data;
      const alu = await alumnoService.listarAlumnos();
      this.alumnos = alu.data.data;
    },
    llamarAsistencia() {
      this.asistenciaDialog = true;
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