<template>
  <div class="card" v-if="profesores">
    <h1>Registro de Notas (pantalla principal de notas)</h1>
    <DataTable :value="profesores.cursos" responsiveLayout="scroll">
      <Column field="cur_nom" header="Curso" :sortable="true" style="min-width:10rem"></Column>
      <Column field="pivot.grado.gra_nom" header="Grado" :sortable="true" style="min-width:10rem"></Column>
      <Column field="pivot.seccion" header="Sección" :sortable="true" style="min-width:10rem"></Column>       
      <Column :exportable="false" header="Calificaciones" style="min-width:10rem">
          <template #body="slotProps">
              <Button label="Notas" class="p-button-rounded p-button-info" @click="registrarNotas(slotProps.data)" />              
          </template>
      </Column>
    </DataTable>
    <!-- DIALOG PARA REGISTRAR LAS NOTAS HACIENDO USO DEL MODAL*/ -->
    <Dialog v-model:visible="notasDialog" :style="{width: '950px'}" header="Registrar Notas" :modal="true" class="p-fluid">      
      <div class="formgrid grid">
        <div class="field col">
          <label for="profesor">Profesor</label>
          <InputText id="profesor" readonly v-model.trim="profesores.pro_nom" autofocus />
        </div>
        <div class="field col">
          <label for="fecha">Fecha</label>
          <InputText id="fecha" readonly v-model.trim="fecha" autofocus />
        </div>
        <div class="field col">
          <label for="hora">Hora</label>
          <InputText id="hora" readonly v-model.trim="hora" autofocus />
        </div>
      </div>
      <div hidden>
        <InputText id="anioacademico_id" v-model.trim="anioacademico_id" hidden autofocus />
      </div>
      <div class="formgrid grid">
        <div class="field col custom-field">
          <label for="anioacademico_id" class="custom-label">Curso</label>
          <label class="custom-value">{{ cursoNombre }}</label>
        </div>
        <div class="field col custom-field">
          <label for="anioacademico_id" class="custom-label">Grado</label>
          <label class="custom-value">{{ gradoNombre }}</label>
        </div>
        <div class="field col">
          <label for="hora">Seccion</label>
          <InputText id="seccion" readonly v-model.trim="sec" autofocus />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>nota 1</th>
            <th>nota 2</th>
            <th>nota 3</th>
            <th>nota 4</th>
            <th>nota 5</th>
            <th>nota 6</th>
            <th>promedio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="alumno in alumnos" :key="alumno.alumno_id">
            <td>{{alumno.alu_nom}}</td>
            <td>{{alumno.alu_app}} {{alumno.alu_apm}}</td>
            <td><InputText id="nota1" v-model.trim="alumno.nota1" autofocus  /></td>
            <td><InputText id="nota2" v-model.trim="alumno.nota2" autofocus  /></td>
            <td><InputText id="nota3" v-model.trim="alumno.nota3" autofocus  /></td>
            <td><InputText id="nota4" v-model.trim="alumno.nota4" autofocus  /></td>
            <td><InputText id="nota5" v-model.trim="alumno.nota5" autofocus  /></td>
            <td><InputText id="nota6" v-model.trim="alumno.nota6" autofocus  /></td>
            <td><InputText id="promedio" v-model.trim="alumno.promedio" autofocus  /></td>
          </tr>
        </tbody>
      </table>
      <div class="field">
        <label for="obs">Observación</label>
        <Textarea id="obs" v-model="obs" rows="3" />
      </div>
      <template #footer>
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="cancelarNotas"/>
          <Button label="Guardar Notas" icon="pi pi-check" class="p-button-text" @click="guardarNotas" />
      </template>
    </Dialog>
  </div>
</template>

<script>

import * as cursoService from '@/services/curso.service'
import * as alumnoService from '@/services/alumno.service'

export default {
  data() {
    return {
      profesores: null,
      notasDialog: false,
      alumnos: [],
      curso_id: '',
      grado_id: '',
      seccion: '',
      date: '',
      time: '',
      cursoNombre: '',
      gradoNombre: ''
    }
  },
  mounted() {
    this.listaCurso();
    this.printDate();
    this.printTime();
  },
  methods: {
    async listaCurso() {
      const profe = await cursoService.cursosParaNotas();
      this.profesores = profe.data;
      /* const alu = await alumnoService.listarAlumnos();
      this.alumnos = alu.data.data; */
    },
    cancelarNotas() {
      this.notasDialog = false;
    },
    //SE MUESTRA EN EL MODAL DE REGISTRO DE NOTAS
    async registrarNotas(datos) {
      console.log(datos);
      this.curso_id = datos.id;
      this.grado_id = datos.pivot.grado.id;
      this.seccion = datos.pivot.grado.gra_seccion;
      this.profesor_id = datos.pivot.profesor_id;
      this.anioacademico_id = datos.pivot.anioacademico_id;
      this.hora = this.time;
      this.fecha = this.date;
      this.sec = datos.pivot.seccion;
      this.cursoNombre = datos.cur_nom;
      this.gradoNombre = datos.pivot.grado.gra_nom;
      const alu = await alumnoService.listarAlumnosCursoGradoSecciones(this.curso_id, this.grado_id, this.seccion);
      this.alumnos = alu.data;
      this.anio_nombre = datos.anio_nom;
      this.notasDialog = true;
    },
    // GUARDA LAS NOTAS INSERTADAS EN EL MODAL DE REGISTRO DE NOTAS
    async guardarNotas() {
      const notas = {curso_id:this.curso_id, 
                      grado_id:this.grado_id, 
                      sec:this.sec, 
                      profesor_id:this.profesor_id, 
                      anioacademico_id:this.anioacademico_id, 
                      hora:this.hora, 
                      fecha:this.fecha, 
                      alumnos:this.alumnos, 
                      obs:this.obs, 
                      promedio:this.promedio };
      await alumnoService.guardarNotas(notas);
    },
    printTime() {
      const time = new Date();
      const formattedTime = new Intl.DateTimeFormat('default', {
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit',
        hour12: false
      }).format(time);
      this.time = formattedTime;
    },
    printDate() {
      const date = new Date().toLocaleDateString();
      this.date = date;
    }
  },
}
</script>

<style>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-family: Arial, sans-serif;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #ddd;
  }

  input[type="text"] {
    width: 100%;
    padding: 6px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  /* Adjusting width for specific columns */
  th:nth-child(1), td:nth-child(1) {
    width: 15%;
  }
  
  th:nth-child(2), td:nth-child(2) {
    width: 20%;
  }
  .custom-field {
    display: flex;
    flex-direction: column;
  }

  .custom-label {
      margin-bottom: 0.5rem;
  }

  .custom-value {
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      padding: 0.740rem 0.75rem;
      background-color: #ffffff;
  }
</style>