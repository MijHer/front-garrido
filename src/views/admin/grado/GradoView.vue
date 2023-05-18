<template>
    <div class="card">
        <Toast />
            <ConfirmDialog></ConfirmDialog>
        <h2>Crear Grado Academico</h2>                
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Crear Grado Academico" icon="pi pi-plus" class="p-button-success mr-2" @click="gradoNuevo" />
            </template>
            <template #end>
                <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
            </template>
        </Toolbar>
        <!-- TABLA PARA MOTRAR LA LISTA DE LOS GRADOS -->
        <DataTable ref="dt" :value="grados" v-model:selection="selectedGrados" dataKey="id" 
            :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
            <template #header>
                <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                    <h5 class="mb-2 md:m-0 p-as-md-center">Lista de Grados</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                    </span>
                </div>
            </template>
            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="gra_nom" header="Grado" :sortable="true"  style="min-width:10rem"></Column>
            <Column field="gra_seccion" header="Sección" :sortable="true"  style="min-width:10rem"></Column>
            <Column field="gra_nivel" header="Nivel" :sortable="true"  style="min-width:10rem"></Column>
            <Column field="gra_registro" header="Registro" :sortable="true"  style="min-width:10rem"></Column>
            <Column field="gra_estado" header="Estado" :sortable="true"  style="min-width:10rem">
                <template #body="slotProps">
                    {{slotProps.data.gra_estado == 1?"Activo":"Inactivo"}}                    
                </template>
            </Column>
            <Column :exportable="false" header="Acciones" style="min-width:10rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editarGrado(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="borrarGrado(slotProps.data)" />
                    <Button label="Asignar" class="p-button-rounded p-button-info mt-2" @click="modalAsignar(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <!-- DIALOG PARA CREAR UN GRADO -->
        <Dialog v-model:visible="DialogGrado" :style="{width: '450px'}" header="Grado Academico Nuevo" :modal="true" class="p-fluid">            
            <div class="field">
                <label for="gra_nom">Nombre</label>
                <InputText id="gra_nom" v-model="grado.gra_nom" required="true" autofocus />
            </div>
            <div class="field">
                <label for="gra_seccion">Sección</label>
                <InputText id="gra_seccion" v-model="grado.gra_seccion" required="true" autofocus />
            </div>                
            <div class="field">
                <label for="gra_nivel" class="mb-3">Nivel</label>
                <Dropdown id="gra_nivel" v-model="grado.gra_nivel" :options="nivel" optionLabel="label" optionValue="value"  placeholder="Selecione Nivel Academico">                        
                </Dropdown>
            </div>
            <div class="field">
                <label for="gra_registro">Fecha de Registro</label>
                <InputText id="gra_registro" v-model="grado.gra_registro" required="true" autofocus />
            </div>
            <div class="field">
                <label for="gra_estado" class="mb-3">Estado</label>
                <Dropdown id="gra_estado" v-model="grado.gra_estado" :options="statusGra" optionLabel="label" optionValue="value" placeholder="Selecione Estado">                        
                </Dropdown>
            </div>            
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarGrado" />                
            </template>          
        </Dialog>
        <!-- DIALOG PARA ASIGNAR CURSO AL GRADO -->
        <Dialog header="Asignar Curso para Grado" v-model:visible="dialogAsignar" :style="{width: '950px'}" :modal="true" class="p-fluid">
        <div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="curso_id">Curso</label>
                    <Dropdown id="curso_id" v-model="pivot.curso_id" :options="curso" optionLabel="cur_descripcion" optionValue="id" placeholder="Selecione Curso">
                    </Dropdown>
                </div>                
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="grado_id">Grado</label>
                    <InputText id="grado_id" readonly  v-bind:value="graNom" required="true" />
                </div>
                <div class="field col">
                    <label for="seccion">Sección</label>
                    <InputText id="seccion" readonly  v-bind:value="secNom" required="true" />
                </div>
                <div class="field col">
                    <label for="nivel">Nivel</label>
                    <InputText id="nivel" readonly  v-bind:value="nivNom" required="true" />
                </div>
            </div>
            <div class="formgrid grid">                
                <div class="field col">
                    <label for="anioacademico_id">Periodo</label>
                    <Dropdown id="anioacademico_id" v-model="pivot.anioacademico_id" :options="anioacademicos" optionLabel="anio_inicio" optionValue="id" placeholder="Selecione Periodo">
                    </Dropdown>            
                </div>
                <div class="field col">
                    <label for="estado">Estado</label>
                    <Dropdown id="estado" v-model="pivot.estado" :options="status2" optionLabel="label" optionValue="value" placeholder="Selecione Estado">
                    </Dropdown>            
                </div>
            </div>
            <div>
                <!-- BOTON PARA AGREGAR DOCENTES AL CURSO -->
                <Button label="Agregar curso" class="p-button-success" @click="agregarAsignacion" /> <br> 
            </div>
        </div>
        {{pivot}}
        <h5>Lista de Cursos Asignados: {{graNom}}</h5>
        <DataTable :value="cursos" responsiveLayout="scroll">           
            <Column field="cur_nom" header="Curso" style="min-width:8rem">                
            </Column>
            <Column field="pivot.seccion" header="Sección" style="min-width:8rem"></Column>
            <Column field="pivot.nivel" header="Nivel" style="min-width:8rem"></Column>
            <Column field="pivot.anioacademico_id" header="Periodo" style="min-width:8rem"></Column>
            <Column field="pivot.estado" header="Estado" style="min-width:8rem">
                <template #body=slotProps>
                    {{slotProps.data.pivot.estado == 1?"Activo":"Inactivo"}}
                </template>
            </Column>
            <!-- boton para eliminar a los docentes asignado a un curso -->
            <Column header="Acción" :exportable="false" style="min-width:6rem">
                <template #body="slotProps">
                    <Button icon="pi pi-times" class="p-button-rounded p-button-danger mr-2" @click="confirmDeleteCurso(slotProps.data)" /> <br> 
                </template>
            </Column>
        </DataTable>      
        <template #footer>
            <Button label="Salir" class="p-button-danger mr-2 " style="min-width:100%" @click="cerrarAsignar" />
        </template>
        </Dialog>   
    </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api'
import * as gradoService from '@/services/grado.service'
import * as cursoService from '@/services/curso.service'
import * as anioacademicoService from '@/services/anioacademico.service'

export default {
    data() {
        return {
            grados: null,
            grado: {},
            filters: {},
            DialogGrado: false,
            selectedGrados: null,
            nivel: [
                {label: 'Inicial', value: 'Inicial'},
                {label: 'Primaria', value: 'Primaria'},
                {label: 'Secundaria', value: 'Secundaria'}
            ],
            statusGra: [
                {label: 'Activo', value: 1},
                {label: 'Inactivo', value: 0}
            ],
            status2: [
                {label: "Activo", value: 1},
                {label: "Inactivo", value: 0}
            ],
            estadoedicion: false,
            dialogAsignar: false,
            cursos: [],
            curso: {},
            anioacademicos: {}, /* OBJETO PARA RECIBIR Y MOSTRAR LA LISTA DE LOS AÑOS ACADEMICOS */
            pivot: {},
            graNom: '',
            secNom: '',
            nivnom: '',
            date: ''
        }
    },
    created() {
        this.initFilters();
    },
    mounted() {
        this.listaGrado();
        this.printdate();
    },
    methods: {
        async listaGrado() {
            const {data} = await gradoService.listarGrados();
            this.grados = data;
            const cur = await cursoService.listarCursos();
            this.curso = cur.data;
            const anio = await anioacademicoService.listarAnioacademicos();
            this.anioacademicos = anio.data;
       },
       cerrarDialog() {
            this.DialogGrado = false;
       },
       cerrarAsignar() {
            this.dialogAsignar = false;
            this.pivot = {};
       },
       gradoNuevo() {
            this.grado = {};
            this.grado.gra_registro = this.date
            this.DialogGrado = true;
        },
        printdate() {
            const date = new Date().toLocaleDateString();
            this.date = date;
        },
        async guardarGrado() {
            let datos;
            if (this.estadoedicion) {
                datos = await gradoService.mofidicarGrados(this.grado.id, this.grado);
                this.grado = datos;
            }
            else {
                datos = await gradoService.guardarGrados(this.grado);
                this.grado = datos;
            }
            if (!datos.data.error) {
                this.estadoedicion = false;
                this.DialogGrado = false;
                this.listaGrado();
            }
       },
       editarGrado(data) {
            this.grado = data;
            this.grado.gra_registro = this.date
            this.DialogGrado = true;
            this.estadoedicion = true;
       },
       async borrarGrado(data) {
            this.$confirm.require({
            message: 'Esta seguro que desea eliminar ',
            header: 'Eliminar',
            icon: 'pi pi-info-circle',
            acceptClass: 'p-button-danger',
            accept: async () => {
            data = await gradoService.eliminarGrados(data.id)
            this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
            this.listaGrado();
            },
            reject: () => {
            this.$toast.add({severity:'error', summary:'Cancelado', detail:'Aceptaste Cancelar', life: 3000});
            }
        });
       },
       /* FUNCIONES PARA AGREGAR CURSO A LOS GRADOS */       
        async agregarAsignacion() {
            const { data } = await gradoService.asignarCurso(this.grado.id, this.pivot);
            this.cursos = data.data;
            this.listaGrado();
            /* this.pivot = {}; */
            this.pivot.anioacademico_id = '';
            this.pivot.estado = '';            
       },
       modalAsignar(datos) {
            this.cursos = datos.cursos;
            this.grado.id = datos.id;
            this.pivot.grado_id = datos.id;
            this.pivot.seccion = datos.gra_seccion;
            this.pivot.nivel = datos.gra_nivel;
            this.graNom = datos.gra_nom;
            this.secNom = datos.gra_seccion;
            this.nivNom = datos.gra_nivel;
            this.dialogAsignar = true;            
       },
       cerrarAsignar() {
            this.dialogAsignar = false;
            this.pivot = {};
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