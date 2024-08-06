<template>
  <div class="card">
    <h1>Matricula Nuevo</h1>
    <div class="p-fluid">
        <div class="field" >
            <label >Imgrese DNI del Alumno</label>
            <InputText v-model="dni"  required="true" rows="3" cols="20" />
        </div>
        <Button label="Buscar" @click="buscarPersona()" />
    </div>
    <!-- SE MUESTRA EL DIALOG SI EL DNI NO ES ECONTRADO -->
    <Dialog header="DNI no existe" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :modal="true" :style="{width: '20vw'}">
        <p>Ingrese nuevamente el DNI</p>
        <template #footer>
            <Button label="Aceptar" class="p-button-danger" @click="closeBasic" autofocus />
        </template>
    </Dialog>
      <!-- DIALOG SE MUESTRA CUANDO EL DNI DEL ALUMNO ES ECONTRADO -->
    <Dialog v-model:visible="Dialog" :style="{width: '900px'}" header="Datos del Alumno" :modal="true" class="p-fluid">
      <div class="formgrid grid">
        <div class="field col">
          <label for="mat_cod_modular">Codigo Modular</label>
          <InputText id="mat_cod_modular" v-model="matricula.mat_cod_modular" required="true" rows="3" cols="20" autofocus />
        </div>
        <div class="field col">
            <label for="mat_hora">Hora de Matricula</label>
            <InputText id="mat_hora" readonly v-model="matricula.mat_hora" required="true" rows="3" cols="20" />            
        </div>
        <div class="field col">
            <label for="mat_fecha">Fecha de Matricula</label>
            <InputText id="mat_fecha" readonly v-model="matricula.mat_fecha"  required="true" rows="3" cols="20" />
        </div>
      </div>
      <div class="field">
          <label for="alumno_id">Alumno</label>
          <InputText id="alumno_id" readonly v-bind:value="alumno.alumno.alu_nom + ' ' +alumno.alumno.alu_app + ' ' + alumno.alumno.alu_apm"  required="true" rows="3" cols="20" />
      </div>
      <div class="formgrid grid">
        <div class="field col">
            <label for="mat_costo">Costo Matricula</label>
            <Dropdown id="mat_costo" v-model="matricula.mat_costo" :options="anioacademicos" optionLabel="anio_detalle" optionValue="anio_detalle" placeholder="Selecione costo">                        
            </Dropdown>
        </div>                
        <div class="field col">
            <label for="mat_repit">Repetitivo</label>
            <Dropdown id="mat_repit" v-model="matricula.mat_repit" :options="repite" optionLabel="label" optionValue="value" placeholder="Selecione">                        
            </Dropdown> 
        </div>        
      </div>
      <div class="formgrid grid">
        <div class="field col">
            <label for="grado_id">Grado</label>
            <Dropdown id="grado_id" v-model="matricula.grado_id" :options="grados" :optionLabel="(grados) => grados.gra_nom +' - '+ grados.gra_seccion + ' - ' + grados.gra_nivel" optionValue="id" placeholder="Selecione Grado Academico">                        
            </Dropdown>
        </div>
        <div class="field col">
            <label for="grado_id">Sección</label>
            <Dropdown id="grado_id" disabled v-model="matricula.grado_id" :options="grados" optionLabel="gra_seccion" optionValue="id" placeholder="Selecione Grado Academico">                        
            </Dropdown>
        </div>
        <div class="field col">
            <label for="mat_nivel">Nivel</label>
            <Dropdown id="mat_nivel" v-model="matricula.mat_nivel" :options="nivel" optionLabel="label" optionValue="value" placeholder="Selecione Nivel Academico">                        
            </Dropdown>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col">
          <label for="anioacademico_id">Año Academico</label>
          <Dropdown id="anioacademico_id" v-model="matricula.anioacademico_id" :options="anioacademicos" optionLabel="anio_nom" optionValue="id" placeholder="Seleccione Año Academico">
          </Dropdown>
        </div>     
        <div class="field col">
            <label for="distrito_id">Distrito</label>
              <Dropdown id="distrito_id" v-model="matricula.distrito_id" :options="distritos" optionLabel="dist_nom" optionValue="id" placeholder="Selecione Dsitrito">
            </Dropdown>            
        </div>        
      </div>
      <div class="field col">
          <label for="mat_estado">Estado</label>
          <Dropdown id="mat_estado" v-model="matricula.mat_estado" :options="estado" optionLabel="label" optionValue="value" placeholder="Selecione Estado">                        
          </Dropdown>
      </div>
      <h5>Datos del Apoderado</h5>
      <div class="formgrid grid">
        <div class="field col">
          <label for="apo_nom">Nombre</label>                    
           <InputText style="min-width:19rem"  id="apoderado_id" readonly v-bind:value="alumno.alumno.apoderado.apo_nom" required="true" rows="3" cols="20" />
        </div>
        <div class="field col">
            <label for="apo_app">Apellido Paterno</label>
            <label class="border" style="min-width:19rem" v-text="alumno.alumno.apoderado.apo_app"></label>
        </div>
        <div class="field col">
            <label for="apo_apm">Apellido Materno</label>
            <label class="border" style="min-width:19rem" v-text="alumno.alumno.apoderado.apo_apm"></label>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col">
          <label for="apo_parentesco">Parentesco</label>
          <label class="border" style="min-width:19rem" v-text="alumno.alumno.apoderado.apo_vinculo"></label>
        </div>
        <div class="field col">
            <label for="apo_telf">Telefono</label>
            <label class="border" style="min-width:19rem" v-text="alumno.alumno.apoderado.apo_telf"></label>
        </div>
        <div class="field col">
            <label for="apo_dni">DNI</label>
            <label class="border" style="min-width:19rem" v-text="alumno.alumno.apoderado.apo_dni"></label>
        </div>
      </div>
      <template #footer>
          <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
          <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarMatricula" />
      </template>      
    </Dialog>   
  </div>
</template>

<script>
import * as alumnoService from '@/services/alumno.service'
import * as gradoService from '@/services/grado.service'
import * as anioacademicoService from '@/services/anioacademico.service'
import * as apoderadoService from '@/services/apoderado.service'
import * as matriculaService from '@/services/matricula.service'
import * as distritoServide from '@/services/distrito.service'

export default {
    data() {
        return {
          dni: '',
          alumno: null,
          Dialog: false,
          matricula: {},
          grados: {},
          anioacademicos: {},
          apoderados: {},
          distritos: {},
          nivel: [
              {label: 'Inicial', value: 'Inicial'},
              {label: 'Primaria', value: 'Primaria'},
              {label: 'Secundaria', value: 'Secundaria'}
          ],
          turno: [
              {label: 'Mañana', value: 'Mañana'},
              {label: 'Tarde', value: 'Tarde'}
              ],
          repite: [
              {label: 'No Repite', value: 0},
              {label: 'Si Repite', value: 1}
          ],
          estado: [
              {label: 'Activo', value: 1},
              {label: 'Inactivo', value: 0}
          ],
          displayModal: false,
          date: '',
          time: ''
        }
    },
    mounted() {
        this.listaElementos();
        this.printDate();
        this.printTime();
    },    
    methods: {
      
      async buscarPersona() {       
          const {data} = await alumnoService.buscar(this.dni);
          this.alumno = data;
          console.log(this.alumno);
          if (this.dni ==  data.alumno.alu_nmr_doc) {
            this.matricula.apoderado_id = data.alumno.apoderado.id;
            this.matricula.alumno_id = data.alumno.id;
            this.matricula.mat_hora = this.time;
            this.matricula.mat_fecha = this.date;
            this.Dialog = true;
          }
          else {
            this.displayModal = true;
          }
      },
      
      closeBasic() {
          this.displayModal = false;
      },
      async listaElementos() {
        const grad = await gradoService.listarGrados();
        this.grados = grad.data;
        const anio = await anioacademicoService.listarAnioacademicos();
        this.anioacademicos = anio.data;
        const apo = await apoderadoService.listarApoderados();
        this.apoderados = apo.data.data;
        const dist = await distritoServide.listarDistritos();
        this.distritos = dist.data;
      },
      printDate() {
        const date = new Date().toLocaleDateString();
        this.date = date;
      },
      printTime() {
        const time = new Date();
        const formattedTime = new Intl.DateTimeFormat('default', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).format(time);
        
        this.time = formattedTime;
      },
      async guardarMatricula() {
        let datos;
        datos = await matriculaService.guardarMatriculas(this.matricula);
        this.matricula = datos;
        this.cerrarDialog();
      },
      cerrarDialog() {
        this.Dialog = false;
        this.alumno = {};
        this.dni = '';
      }
    },    
}
</script>

<style lang="scss" scoped>
.border {
  border:  solid 1px;
  border-color: rgb(201, 198, 198);
  padding: 11px;
  border-radius: 5px;
}
</style>