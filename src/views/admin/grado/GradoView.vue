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
            <Column field="gra_nom" header="Nombre" :sortable="true"  style="min-width:12rem"></Column>
            <Column field="gra_seccion" header="Sección" :sortable="true"  style="min-width:12rem"></Column>
            <Column field="gra_nivel" header="Nivel" :sortable="true"  style="min-width:12rem"></Column>
            <Column field="gra_registro" header="Registro" :sortable="true"  style="min-width:12rem"></Column>
            <Column field="gra_estado" header="Estado" :sortable="true"  style="min-width:12rem">
                <template #body="slotProps">
                    {{slotProps.data.gra_estado == 1?"Activo":"Inactivo"}}                    
                </template>
            </Column>
            <Column :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editarGrado(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="borrarGrado(slotProps.data)" /> <br>
                    <Button label="Asignar" class="p-button-rounded p-button-info mt-2" @click="cursoAsignar(slotProps.data.cursos)" />
                </template>
            </Column>
        </DataTable>
        <!-- DIALOG PARA CREAR UN GRADO -->
        <Dialog v-model:visible="DialogGrado" :style="{width: '450px'}" header="Grado Academico Nuevo" :modal="true" class="p-fluid">            
            <div class="field">
                <label for="gra_nom">Nombre</label>
                <InputText id="gra_nom" v-model="grado.gra_nom" required="true" autofocus />
                <label for="gra_seccion">Sección</label>
                <InputText id="gra_seccion" v-model="grado.gra_seccion" required="true" autofocus />
                <div class="field">
                    <label for="gra_nivel" class="mb-3">Nivel</label>
                    <Dropdown id="gra_nivel" v-model="grado.gra_nivel" :options="nivel" optionLabel="label" optionValue="value"  placeholder="Selecione Nivel Academico">                        
                    </Dropdown>
                </div>
                <label for="gra_registro">Fecha de Registro</label>
                <Calendar inputId="icon" v-model="grado.gra_registro" :showIcon="true" />
                <div class="field">
                    <label for="gra_estado" class="mb-3">Estado</label>
                    <Dropdown id="gra_estado" v-model="grado.gra_estado" :options="statusGra" optionLabel="label" optionValue="value" placeholder="Selecione Estado">                        
                    </Dropdown>
                </div>
            </div>           
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarGrado" />                
            </template>          
        </Dialog>
        <!-- DIALOG PARA ASIGNAR CURSO AL GRADO -->
        <Dialog header="Asignar Curso para Grado" v-model:visible="dialogAsignar" :style="{width: '1000px'}" :modal="true" class="p-fluid">
        <div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="curso_id">Curso</label>
                    <Dropdown id="curso_id" v-model="pivot.curso_id" :options="curso" optionLabel="cur_nom" optionValue="id" placeholder="Selecione Docente">
                    </Dropdown>
                </div>                
                <div class="field col">
                    <label for="grado_id">Grado</label>
                    <!-- <InputText  id="grado_id" v-model="pivot.grado_id" required="true"/> -->
                    <Dropdown id="grado_id" v-model="pivot.grado_id" :options="grados" optionLabel="gra_nom" optionValue="id" placeholder="Selecione Docente">
                    </Dropdown>
                </div>
            </div>
            <div class="formgrid grid">                
                <div class="field col">
                    <label for="anioacademico">Periodo</label>
                    <Dropdown id="anioacademico" v-model="pivot.anioacademico" :options="anioacademicos" optionLabel="anio_inicio" optionValue="id" placeholder="Selecione Periodo">
                    </Dropdown>            
                </div>
            </div>
            <div class="field col">
                <label for="estado">Estado</label>
                <Dropdown id="estado" v-model="pivot.estado" :options="status2" optionLabel="label" optionValue="value" placeholder="Selecione Estado">
                </Dropdown>            
            </div>                       
            <div>
                <!-- BOTON PARA AGREGAR DOCENTES AL CURSO -->
                <Button label="Agregar curso" class="p-button-success" @click="agregarAsignacion()" /> <br> 
            </div>
            {{pivot}}
        </div> 
        <h5>Lista de Cursos Asignados</h5>
        <DataTable :value="cursos" responsiveLayout="scroll">
            <label for="">{{grados}}</label>
            <Column field="gra_nom" header="Grado" style="min-width:8rem"></Column>
            <Column field="pivot.curso_id" header="Curso" style="min-width:8rem">
                <!-- <template #body ="slotProps">
                    {{getCurso(slotProps.data.pivot.curso_id)}}
                </template> -->
            </Column>
            <Column field="pivot.anioacademico" header="Periodo" style="min-width:8rem"></Column>            
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
            <Button label="Cancelar" class="p-button-danger mr-2" @click="cerrarAsignar" />
            <Button label="Aceptar" class="p-button-info mr-2" @click="cerrarAsignar" /> 
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
                {label: 'ACTIVO', value: '1'},
                {label: 'INACTIVO', value: '0'}
            ],
            status2: [
                {label: "Activo", value: '1'},
                {label: "Inactivo", value: '0'}
            ],
            estadoedicion: false,
            dialogAsignar: false,
            cursos: [],
            curso: {},
            anioacademicos: {}, /* OBJETO PARA RECIBIR Y MOSTRAR LA LISTA DE LOS AÑOS ACADEMICOS */
            pivot: {}
        }
    },
    created() {
        this.initFilters();
    },
    mounted() {
        this.listaGrado();
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
            this.DialogGrado = true;
            this.grado = {};
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
       cursoAsignar(curs) {
            this.cursos = curs;        
            this.dialogAsignar = true;
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