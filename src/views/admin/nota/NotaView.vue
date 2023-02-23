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
  </div>
</template>

<script>

import * as cursoService from '@/services/curso.service'

export default {
  data() {
    return {
      profesores: null
    }
  },
  mounted() {
    this.listaCurso()
  },
  methods: {
    async listaCurso() {
      const profe = await cursoService.cursosParaNotas();
      this.profesores = profe.data;
    }
  },
}
</script>

<style>

</style>