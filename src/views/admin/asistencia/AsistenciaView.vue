<template>
  <div class="card" v-if="profesores">
    <h1>Registrar Asistencia</h1>    
      <DataTable :value="profesores.cursos" responsiveLayout="scroll">
      <Column field="cur_nom" header="Curso" :sortable="true" style="min-width:10rem"></Column>
      <Column field="pivot.grado.gra_nom" header="Grado" :sortable="true" style="min-width:10rem"></Column>
      <Column field="pivot.seccion" header="Sección" :sortable="true" style="min-width:10rem"></Column>       
      <Column :exportable="false" header="Asistencia" style="min-width:10rem">
          <template #body="slotProps">
              <Button label="Asistencia" class="p-button-rounded p-button-info" @click="llamarAsistencia(slotProps.data)" />              
          </template>
      </Column>
    </DataTable>    
    <!-- DIALOG PARA ABRIR MODAL Y LLAMAR LA ASISTENCIA -->
    <Dialog v-model:visible="asistenciaDialog" :style="{width: '950px'}" header="Registrar Asistencia" :modal="true" class="p-fluid">      
      {{curso}}
      {{alumnoData}}      
      <div class="formgrid grid">        
        <div class="field col">
          <label for="anioacademico">Año Academico</label>
          <InputText id="anioacademico" v-model.trim="anioacademico_id" autofocus  />
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col">
          <label for="curso">Curso</label>
          <InputText id="curso" v-model.trim="curso_id" autofocus  />
        </div>
        <div class="field col">
          <label for="grado">Grado</label>
          <InputText id="grado" v-model.trim="grado_id" autofocus  />
        </div>
        <div class="field col">
          <label for="seccion">Seccion</label>
          <InputText id="seccion" v-model.trim="seccion" autofocus  />
        </div>
      </div>
      <div class="formgrid grid">        
        <div class="field col">
          <label for="hora">Hora</label>
          <InputText readonly id="hora" v-model.trim="hora" autofocus  />
        </div>
        <div class="field col">
          <label for="fecha">Fecha</label>
          <InputText id="fecha" v-model.trim="fecha" autofocus  />
        </div>
      </div>
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
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="cancelarAsistencia"/>
          <Button label="Registrar Asistencia" icon="pi pi-check" class="p-button-text" @click="guardarAsistencia" />
      </template>
    </Dialog>
  </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api'
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
      /* pivot: {}, */
      alumnoData: [],
      curso_id: null,
      grado_id: null,
      seccion: null,
      fecha: null,
      hora: null,
      mostrar: [],
      time: '',
      date: '',
      graNom: ''
    }
  },
  created() {
      this.initFilters();
  },
  mounted() {
    this.listaCurso();
    this.printTime();
    this.printDate();
  },
  methods: {
    async listaCurso() {
      const profe = await profesorService.cursosParaAsistencia();
      this.profesores = profe.data; /* LISTA PARA MOSTRAR EL NOMBRE DEL DOCENTE CUANDO SE APERTUA EL MODAL DE ASISTENCIA */
      console.log(this.profesores);
      const gra = await gradoService.listarGrados();
      this.grados = gra.data; /* LISTA PARA MOSTRAR EL NOMBRE DEL GRADO CUANDO SE APERTUA EL MODAL DE ASISTENCIA */
      
    },
    printTime() {
      const time = new Date().toLocaleTimeString();
      this.time = time;
    },
    printDate() {
      const date = new Date().toLocaleDateString();
      this.date = date;
    },
    async llamarAsistencia(curs) {
      console.log(curs);
      this.curso_id =  curs.id;
      this.anioacademico_id = curs.pivot.anioacademico_id;
      this.grado_id = curs.pivot.grado_id;
      this.seccion = curs.pivot.seccion;
      this.hora = this.time;
      this.fecha = this.date;
      const alu = await alumnoService.listarAlumnosCursoGradoSeccion(this.curso_id, this.grado_id, this.seccion);
      this.alumnos = alu.data;
      this.alumnoData = [];
      this.alumnos.forEach(alumno => {
        const {id, alu_nom, alu_app, alu_apm} = alumno.alumno;
        this.alumnoData.push({id, alu_nom, alu_app,alu_apm,
        asistencia: true,
        falta: false,
        tardanza: false,
        permiso: false
        })
      });
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
        anioacademico_id: this.anioacademico_id,
        curso_id: this.curso_id,
        grado_id: this.grado_id,
        seccion: this.seccion,
        fecha: this.fecha,
        hora: this.hora,
        alumnos: this.alumnoData
      }
      this.asistenciaDialog = false;
      await alumnoService.asistenciaAlu(asistencia);
    },
    cancelarAsistencia() {
      this.asistenciaDialog = false;
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