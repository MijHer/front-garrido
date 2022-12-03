<template>
  <div class="card">
    <h1>lista de asistencia</h1>
      <DataTable :value="profesores" responsiveLayout="scroll">
      <Column field="pivot.grado_id" header="Grado" :sortable="true" style="min-width:10rem"></Column>       
      <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
              <Button label="Asistencia" class="p-button-rounded p-button-info" @click="llamarAsistencia(slotProps.data)" />              
          </template>
      </Column>
    </DataTable>
    <!-- DIALOG PARA ABRIR MODAL Y LLAMAR LA ASISTENCIA -->
    <Dialog v-model:visible="asistenciaDialog" :style="{width: '950px'}" header="Registrar Asistencia" :modal="true" class="p-fluid">            
      <h4>Lista de alumnos</h4>
      {{curso_id}}
      {{alumnoData}}
      <table class="table">
        <thead>
          <tr>
            <th>nombre</th>
            <th>apellido</th>
            <th>asistio</th>
            <th>tarde</th>
            <th>falto</th>
            <th>permiso</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(alumno, index) in alumnoData" :key="index">
            <td>{{alumno.alu_nom}}</td>
            <td>{{alumno.alu_app +' '+ alumno.alu_apm}}</td>
            <td>                
            <Checkbox @change="cambiarValor(alumno, 1)" v-model="alumno.asistencia" :binary="true" />            
            </td>
            <td>                
            <Checkbox @change="cambiarValor(alumno, 2)" v-model="alumno.falta" :binary="true" />            
            </td>
            <td>                
            <Checkbox @change="cambiarValor(alumno, 3)" v-model="alumno.tardanza" :binary="true" />            
            </td>
            <td>                
            <Checkbox @change="cambiarValor(alumno, 4)" v-model="alumno.permiso" :binary="true" />            
            </td>
          </tr>
        </tbody>
      </table>                          
      <template #footer>
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
          <Button label="Registrar Asistencia" icon="pi pi-check" class="p-button-text" @click="guardarAsistencia" />
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
      selected: null,
      grados: [],
      asistenciaDialog: false,
      alumnos: null,
      checked: false,
      pivot: {
        asistencia: true,
        falta: false,
        tardanza: true,
        permiso: false
      },
      alumnoData: [],
      curso_id: null,
      mostrar: []

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
      this.cursos = cur.data; /* LISTA PARA MOSTRAR EL NOMBRE DEL CURSO CUANDO SE APERTUA EL MODAL DE ASISTENCIA */
      console.log(this.cursos);
      const profe = await profesorService.listarProfesores();
      this.profesores = profe.data.data; /* LISTA PARA MOSTRAR EL NOMBRE DEL DOCENTE CUANDO SE APERTUA EL MODAL DE ASISTENCIA */
      const gra = await gradoService.listarGrados();
      this.grados = gra.data; /* LISTA PARA MOSTRAR EL NOMBRE DEL GRADO CUANDO SE APERTUA EL MODAL DE ASISTENCIA */
      const alu = await alumnoService.listarAlumnos();
      this.alumnos = alu.data.data;
      this.alumnos.forEach(alumno => {
        const {id, alu_nom, alu_app, alu_apm} = alumno;
        this.alumnoData.push({id, alu_nom, alu_app,alu_apm, asistencia: true,
        falta: false,
        tardanza: true,
        permiso: false})
      });
    },
    llamarAsistencia(curs) {
      this.curso_id = curs.id;
      this.asistenciaDialog = true;
    },
    cambiarValor(alumno, dato) {
      if (dato == 1) {
        alumno.asistencia = true;
        alumno.falta = false;
        alumno.tardanza = false;
        alumno.permiso = false;
      }
      if (dato == 2) {
        alumno.asistencia = false;
        alumno.falta = true;
        alumno.tardanza = false;
        alumno.permiso = false;
      }
      if (dato == 3) {
        alumno.asistencia = false;
        alumno.falta = false;
        alumno.tardanza = true;
        alumno.permiso = false;
      }
      if (dato == 4) {
        alumno.asistencia = false;
        alumno.falta = false;
        alumno.tardanza = false;
        alumno.permiso = true;
      }
    },
    async guardarAsistencia() {
      const asistencia = {
        curso_id: this.curso_id,
        alumnos: this.alumnoData
      }
      this.asistenciaDialog = false;
      await alumnoService.asistenciaAlu(asistencia);
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