<template>
  <div class="card">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <Toolbar class="mb-4">
        <template #start>
            <Button label="Nuevo Curso" icon="pi pi-plus" class="p-button-success mr-2" @click="nuevoCurso" />            
        </template>
        <template #end>
            <Button label="Excel" icon="pi pi-upload" class="p-button-primary mr-2" @click="exportToExcel($event)"  />
			<Button label="PDF" icon="pi pi-upload" class="p-button-help" @click="exportToPDF($event)"  />
        </template>
    </Toolbar>
    <!-- TABLA PARA MOSTRAR LA LISTA DE LOS CURSOS -->
    <DataTable ref="dt" :value="cursos" v-model:selection="selectedCursos" dataKey="id" 
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Cursos Registrados" responsiveLayout="scroll">
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
        <Column field="cur_nom" header="Nombre" :sortable="true" style="min-width:12rem"></Column>
        <Column field="cur_descripcion" header="Descripción" :sortable="true" style="min-width:12rem"></Column>
        <Column field="cur_grado" header="Estado" :sortable="true" style="min-width:12rem">
        <Column field="cur_registro" header="Registro" :sortable="true" style="min-width:12rem"></Column>
            <template #body ="slotProps">
                {{slotProps.data.cur_estado == 1?"Activo":"Inactico"}}
            </template>            
        </Column>        
        <Column :exportable="false" header="Acciones" style="min-width:12rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editCurso(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="confirmDeleteCurso(slotProps.data)" /> 
                <Button label="Asignar" class="p-button-rounded p-button-info mr-2" @click="modalAsignar(slotProps.data)" />
            </template>
        </Column>
    </DataTable>
    <!-- DIALOG PARA REGISTRAR CURSO NUEVO -->
    <Dialog v-model:visible="Dialog" :style="{width: '450px'}" header="Curso Nuevo" :modal="true" class="p-fluid">
        <div class="field">
            <label for="cur_nom">Nombre</label>
            <InputText id="cur_nom" v-model.trim="curso.cur_nom" required="true" autofocus :class="{'p-invalid': submitted && !curso.cur_nom}" />            
        </div>
        <div class="field">
            <label for="cur_descripcion">Descripción</label>
            <InputText id="cur_descripcion" v-model.trim="curso.cur_descripcion" required="true" autofocus :class="{'p-invalid': submitted && !curso.cur_descripcion}" />            
        </div>
        <div class="field">
            <label for="cur_estado">Estado</label>
            <Dropdown v-model="curso.cur_estado" :options="status" optionLabel="label" optionValue="value" required="true">
            </Dropdown>            
        </div>
        <div class="field">
            <label for="cur_registro">Fecha de Registro</label>
            <InputText id="cur_registro" v-model.trim="curso.cur_registro" required="true" autofocus :class="{'p-invalid': submitted && !curso.cur_registro}" />            
        </div>
        {{curso}}
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
            <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarCurso" />
        </template>
    </Dialog>
    <!-- DIALOG PARA ASIGNAR DOCENTE AL CURSO -->
    <Dialog header="Asignar Docente al Curso y Grado" v-model:visible="dialogAsignar" :style="{width: '1000px'}" :modal="true" class="p-fluid">
        <div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="profesor_id">Nombre</label>
                    <Dropdown id="profesor_id" v-model="pivot.profesor_id" :options="profesor" optionLabel="pro_nom" optionValue="id" placeholder="Selecione Docente">
                    </Dropdown>
                </div>
                <div class="field col">
                    <label for="profesor_id">A. Paterno</label>
                    <Dropdown id="profesor_id" disabled v-model="pivot.profesor_id" :options="profesor" optionLabel="pro_app" optionValue="id" placeholder="Selecione Docente">
                    </Dropdown>
                </div>
                <div class="field col">
                    <label for="profesor_id">A. Materno</label>
                    <Dropdown id="profesor_id" disabled v-model="pivot.profesor_id" :options="profesor" optionLabel="pro_apm" optionValue="id" placeholder="Selecione Docente">
                    </Dropdown>            
                </div>                
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="">curso</label>
                    <InputText id="" readonly  v-bind:value="nomCurso" required="true" />
                </div>
                <div class="field col">
                    <label for="">Descripción</label>
                    <InputText id="" readonly  v-bind:value="nomDescripcion" required="true" />
                </div>
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="grado_id">Grado</label>
                    <Dropdown id="grado_id" v-model="pivot.grado_id" :options="grados" :optionLabel="(grados) => grados.gra_nom +' - '+ grados.gra_seccion +' - '+ grados.gra_nivel" optionValue="id" placeholder="Selecione Grado">                        
                    </Dropdown>
                </div>
                <div class="field col">
                    <label for="grado_id">Nivel</label>
                    <Dropdown id="grado_id" disabled v-model="pivot.grado_id" :options="grados" optionLabel="gra_nivel" optionValue="id" placeholder="Selecione nivel">                        
                    </Dropdown>
                </div>
                <div class="field col">
                    <label for="seccion">Sección</label>
                    <Dropdown id="seccion" v-model="pivot.seccion" :options="grados" :optionLabel="(grados) => grados.gra_nom +' - '+ grados.gra_seccion +' - '+ grados.gra_nivel" optionValue="gra_seccion" placeholder="Selecione Sección">
                    </Dropdown>
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
            {{pivot}}
            <div>
                <!-- BOTON PARA AGREGAR DOCENTES AL CURSO -->
                <Button label="Agregar docente al curso" class="p-button-success" @click="agregarAsignacion" /> <br> 
            </div>
        </div>       
        <!-- TABLA PARA MOSTRAR LOS CURSOS ASISGNADOS A LOS DOCENTES (TABLA PIVOT) -->
        <h5>Lista de Docentes Asignados al Curso: {{nomCurso}}</h5>        
        <DataTable :value="profesores" responsiveLayout="scroll">
            <Column field="pro_nom" header="Nombre" style="min-width:10rem"></Column>
            <Column field="pro_app" header="A. Paterno" style="min-width:8rem"></Column>
            <Column field="pro_apm" header="A. Materno" style="min-width:8rem"></Column>
            <Column field="pivot.grado_id" header="Grado" style="min-width:8rem">                
            </Column>
            <Column field="pivot.seccion" header="Sección" style="min-width:6rem; text-align: center;">                
            </Column>
            <Column field="pivot.anioacademico_id" header="Periodo" style="min-width:8rem">                
            </Column>
            <Column field="pivot.estado" header="Estado" style="min-width:8rem">
                <template #body ="slotProps">
                    {{slotProps.data.pivot.estado == 1?"Activo":"Inactivo"}}
                </template>
            </Column>
            <!-- boton para eliminar a los docentes asignado a un curso -->
            <Column header="Acción" :exportable="false" style="min-width:6rem">
                <template #body="slotProps">
                    <Button icon="pi pi-times" class="p-button-rounded p-button-danger mr-2" @click="borrarAsignacion(slotProps.data)" /> <br> 
                </template>
            </Column>
        </DataTable>
        <template #footer>
            <Button label="Salir" class="p-button-danger mr-2" style="min-width:100%" @click="cerrarAsignar"/>
        </template>
    </Dialog>
  </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api'
import * as cursoService from '@/services/curso.service'
import * as gradoService from '@/services/grado.service'
import * as anioacademicoService from '@/services/anioacademico.service'
import * as profesorService from '@/services/profesor.service'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
    data() {
        return {
            submitted:false,
            cursos: null, //objeto para obtener la lista de cursos ya registrados en la tabla y mostraslos
            selectedCursos: null,
            selectedProfesores: null,
            Dialog: false,
            filters: {},
            dialogAsignar: false,
            curso: {}, // Objeto para llenar la tabla curso
            estado: false, // Estado para editar los cursos creados
            status: [
                {label: "Activo", value: 1},
                {label: "Inactivo", value: 0}
            ],
            status2: [
                {label: "Activo", value: 1},
                {label: "Inactivo", value: 0}
            ],
            profesores:[],
            grados: [],
            anioacademicos: [],
            profesor: {},
            pivot: {},
            nomCurso: '',
            nomDescripcion: '',
            date: ''
        }
    },
    created() {        
        this.initFilters();
    },
    mounted() {
        this.listaCurso();
        this.printdate();
    },
    methods: {
        async listaCurso () {
            const {data} = await cursoService.listarCursos();
            this.cursos = data;
            const grad = await gradoService.listarGrados();
            this.grados = grad.data;
            const anio = await anioacademicoService.listarAnioacademicos();
            this.anioacademicos = anio.data;
            const profe = await profesorService.listarProfesores();
            this.profesor = profe.data.data;
        },
        /* getgrado(id) {
            let nom = '';
            for (let i = 0; i < this.grados.length; i++) {
                const grado = this.grados[i];
                if (grado.id == id) {
                    nom = grado.gra_nom;
                }
            }
            return nom;
        }, */
        /* getseccion(id) {
            let sec = '';                     
            for (let i = 0; i < this.grados.length; i++) {
                const grado = this.grados[i];
                if (grado.id == id) {
                    sec = grado.gra_seccion;
                }
            }
            return sec;
        }, */        
        /* getanio(id) {
            let fecha = '';                     
            for (let i = 0; i < this.anioacademicos.length; i++) {
                const anioacademico = this.anioacademicos[i];
                if (anioacademico.id == id) {
                    fecha = anioacademico.anio_inicio;
                }
            }
            return fecha;
        }, */
        nuevoCurso() {
            this.curso = {};
            this.curso.cur_registro = this.date;
            this.Dialog = true;
        },
        cerrarDialog() {
            this.Dialog = false;           
        },
        printdate() {
            const date = new Date().toLocaleDateString();
            this.date = date;
        },
        async guardarCurso() {
            let datos;
            if (this.estado) {
                datos = await cursoService.modificarCursos(this.curso.id, this.curso);
                this.curso = datos;
            } else {
                datos = await cursoService.guardarCursos(this.curso);
                this.curso = datos;                
            }
            if(!datos.data.error) {
                this.listaCurso();
                this.cerrarDialog();
                this.estado = false;
                this.curso = {};
            }
        },
        editCurso(data) {
            this.curso = data;
            this.curso.cur_registro = this.date;
            this.estado = true;
            this.Dialog = true;
        },
        confirmDeleteCurso(data) {
            this.$confirm.require({
                message: 'Esta seguro que desea eliminar ',
                header: 'Eliminar',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: async () => {
                data = await cursoService.eliminarCursos(data.id)
                this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
                this.listaCurso();
                },
                reject: () => {
                this.$toast.add({severity:'error', summary:'Cancelado', detail:'Aceptaste Cancelar', life: 3000});
                }      
            });
        },
        async agregarAsignacion() {            
            const { data }  = await cursoService.asignarProfesor(this.curso.id, this.pivot);           
            this.listaCurso();
            this.profesores = data.data;
            this.pivot.anioacademico_id = '';
            this.pivot.estado = '';
        },
        modalAsignar(datos) {
            console.log(datos);
            this.curso.id = datos.id;
            this.profesores = datos.profesores;
            this.pivot.curso_id = datos.id;
            this.nomCurso = datos.cur_nom;
            this.nomDescripcion = datos.cur_descripcion;
            this.dialogAsignar = true;
        },
        cerrarAsignar() {
            this.dialogAsignar = false;
            this.pivot = {};
        },
        borrarAsignacion(pivot) {
            this.$confirm.require({
                message: 'Esta seguro que desea eliminar ',
                header: 'Eliminar',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: async () => {
                data = await cursoService.quitarProfesor(this.curso.id, pivot.id)
                this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
                this.listaCurso();
                },
                reject: () => {
                this.$toast.add({severity:'error', summary:'Cancelado', detail:'Aceptaste Cancelar', life: 3000});
                }      
            });
        },
        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        },
        //reporte en pdf
        async exportToPDF() {
            const doc = new jsPDF();
            const logoBase64 = await fetch('/images/logo-garrido.base64')
                .then(response => response.text());
            doc.addImage(logoBase64, 'PNG', 10, 10, 30, 20);
            // Título y sub titulo
            doc.setFontSize(8);
            doc.setFont('Helvetica', 'normal');
            doc.text('Institucion Educativa Particular', 85, 15);
            doc.setFontSize(8);
            doc.setFont('Helvetica', 'normal');
            doc.text('Andres Fernandez Garrido', 87, 20);
            doc.setFontSize(14);
            doc.setFont('Helvetica', 'bold');
            doc.text('Lista de Cursos Registrados', 72, 28);
            // Cabeceras y orden de las columnas
            const headers = [['Nombre', 'Descripcion', 'Fecha de Registro', 'Estado']];
            // Prepara los datos para la exportación
            const dataToExport = this.cursos.map(row => [
                row.cur_nom || '',
                row.cur_descripcion || '',
                row.cur_registro || '',
                row.cur_estado === 1 ? 'Activo' : 'Inactivo'
            ]);
            // Generando la tabla en el PDF
            doc.autoTable({
                head: headers,
                body: dataToExport,
                startY: 40 // Ajusta la posición de inicio de la tabla según la altura del título y el logo
            });
            // Descarga archivo PDF
            doc.save('cursos.pdf');
        },
        //reporte en excel
        exportToExcel() {
            // Define las cabeceras personalizadas y el orden de las columnas
            const headers = ['Nombre', 'Descripcion', 'Fecha de Registro', 'Estado'];            
            // Prepara los datos para la exportación
            const dataToExport = this.cursos.map(row => ({            
                'Nombre': row.cur_nom || '',
                'Descripcion': row.cur_descripcion || '',
                'Fecha de Registro': row.cur_registro || '',
                'Estado': row.cur_estado === 1 ? 'Activo' : 'Inactivo'
            }));
            // Crea una hoja de cálculo
            const worksheet = XLSX.utils.json_to_sheet(dataToExport, { header: headers });            
            // Crea un libro de trabajo
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Cursos");
            // Convierte el libro de trabajo a un archivo Excel y descarga
            XLSX.writeFile(workbook, "cursos.xlsx");
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