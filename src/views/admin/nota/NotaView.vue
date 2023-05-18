<template>
  <div class="card" v-if="profesores">
    <h1>Registro de Notas</h1>
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
    <Dialog v-model:visible="notasDialog" :style="{width: '950px'}" header="Registrar Notas" :modal="true" class="p-fluid">
      <div class="field">
        <label for="profesor">profesor</label>
        <InputText id="profesor" v-model.trim="profesor_id" autofocus />
      </div>
      <div class="formgrid grid">
        <div class="field col">
          <label for="anioacademico_id">Año</label>
          <InputText id="anioacademico_id" v-model.trim="anioacademico_id" autofocus />
        </div>
        <div class="field col">
          <label for="fecha">Fecha</label>
          <InputText id="fecha" v-model.trim="fecha" autofocus />
        </div>
        <div class="field col">
          <label for="hora">Hora</label>
          <InputText id="hora" v-model.trim="hora" autofocus />
        </div>
        <div class="field col">
          <label for="hora">seccion</label>
          <InputText id="seccion" v-model.trim="sec" autofocus />
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
            <th>promedio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(alumno,index) in alumnos" :key="index">
            <td>{{alumno.alumno.alu_nom}}</td>
            <td>{{alumno.alumno.alu_app}}{{alumno.alumno.alu_apm}}</td>
            <td><InputText id="nota1" v-model.trim="alumno.nota1" autofocus  /></td>
            <td><InputText id="nota2" v-model.trim="alumno.nota2" autofocus  /></td>
            <td><InputText id="nota3" v-model.trim="alumno.nota3" autofocus  /></td>
            <td><InputText id="nota4" v-model.trim="alumno.nota4" autofocus  /></td>
            <td><InputText id="promedio" v-model.trim="alumno.promedio" autofocus  /></td>
          </tr>
        </tbody>
      </table>
      <div class="field">
        <label for="textarea">Observación</label>
        <Textarea id="textarea" v-model="value10" rows="3" />
      </div>
      <template #footer>
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="cancelarNotas"/>
          <Button label="Registrar Notas" icon="pi pi-check" class="p-button-text" @click="guardarNotas" />
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
      time: ''
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
      const alu = await alumnoService.listarAlumnosCursoGradoSeccion(this.curso_id, this.grado_id, this.seccion);
      this.alumnos = alu.data;
      this.notasDialog = true;
    },
    printTime() {
      const time = new Date().toLocaleTimeString();
      this.time = time;
    },
    printDate() {
      const date = new Date().toLocaleDateString();
      this.date = date;
    },
    async guardarNotas() {
      const notas = {curso_id:this.curso_id, grado_id:this.grado_id, sec:this.sec, profesor_id:this.profesor_id, anioacademico_id:this.anioacademico_id, hora:this.hora, fecha:this.fecha, alumnos:this.alumnos, obs:this.obs, promedio:this.promedio };
      await alumnoService.guardarNotas(notas);
    }
  },
}
</script>

<style>

</style>