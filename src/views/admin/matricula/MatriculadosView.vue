<template>
  <div class="card">
    <Toast />
      <ConfirmDialog></ConfirmDialog>
    <Toolbar class="mb-4">      
        <template #end>
            <Button label="Excel" icon="pi pi-upload" class="p-button-primary mr-2" @click="exportToExcel($event)"  />
			<Button label="PDF" icon="pi pi-upload" class="p-button-help" @click="exportToPDF($event)"  />
        </template>
    </Toolbar>
    <DataTable ref="dt" :value="matriculas" v-model:selection="selectedMatriculas" dataKey="id" 
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Matriculados" responsiveLayout="scroll">
        <template #header>
            <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                <h5 class="mb-2 md:m-0 p-as-md-center">Alumnos Matriculados</h5>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Search..." />
                </span>
            </div>
        </template>
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="mat_cod_modular" header="Codigo Modular" :sortable="true" style="min-width:10rem"></Column>
        <Column field="alumno.alu_nom" header="Nombre" :sortable="true" style="min-width:10rem"></Column>
        <Column field="alumno.alu_app" header="A. Paterno" :sortable="true" style="min-width:10rem"></Column>
        <Column field="alumno.alu_apm" header="A. Materno" :sortable="true" style="min-width:10rem"></Column>  
        <Column field="mat_nivel" header="Nivel" :sortable="true" style="min-width:10rem"></Column>
        <Column field="grado.gra_nom" header="Grado" :sortable="true" style="min-width:10rem"></Column>        
        <Column field="distrito.dist_nom" header="Distrito" :sortable="true" style="min-width:10rem"></Column>
        <Column field="apoderado.apo_nom" header="Apoderado" :sortable="true" style="min-width:10rem"></Column>
        <Column field="mat_estado" header="Estado" :sortable="true" style="min-width:10rem">
            <template #body="slotProps">
                {{slotProps.data.mat_estado == 1?"Activo":"Inactivo"}}
            </template>
        </Column>
        <Column :exportable="false" header="Acciones" style="min-width:14rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editarMatricula(slotProps.data)" />
                <Button icon="pi pi-file" class="p-button-rounded p-button-warning mr-2" @click="verMatricula(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="eliminarMatricula(slotProps.data)" />
            </template>
        </Column>       
    </DataTable>
    <!-- Dialog para modificar las matriculas -->
    <Dialog v-model:visible="Dialog" :style="{width: '1000px'}" header="Modificar Datos del Alumno" :modal="true" class="p-fluid">
        <div class="formgrid grid">
            <div class="field col">
            <label for="mat_cod_modular">Codigo Modular</label>
            <InputText id="mat_cod_modular" v-model="matricula.mat_cod_modular" required="true" rows="3" cols="20" />
            </div>
            <div class="field col">
                <label for="mat_fecha">Fecha Matricula</label>
                <InputText id="mat_fecha" v-model="matricula.mat_fecha" required="true" rows="3" cols="20" />
                <!-- <Calendar id="mat_fecha" v-model="matricula.mat_fecha" :showIcon="true" /> -->
            </div>
            <div class="field col">
                <label for="mat_costo">Costo Matricula</label>
                <InputText id="mat_costo" v-model="matricula.mat_costo" required="true" rows="3" cols="20" />
            </div>
        </div>
        <div class="field">
            <label for="alumno_id">Alumno</label>
            <InputText id="alumno_id" readonly v-bind:value="matricula.alumno.alu_nom + ' ' +matricula.alumno.alu_app + ' ' + matricula.alumno.alu_apm"  required="true" rows="3" cols="20" />         
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
                <label for="mat_repit">Repetitivo</label>
                <Dropdown id="mat_repit" v-model="matricula.mat_repit" :options="repite" optionLabel="label" optionValue="value" placeholder="Selecione">                        
                </Dropdown> 
            </div>
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
        <div class="field">
            <label for="mat_estado">Estado</label>
            <Dropdown id="mat_estado" v-model="matricula.mat_estado" :options="estado" optionLabel="label" optionValue="value" placeholder="Selecione Estado">                        
            </Dropdown> 
        </div>   
        <h5>Datos del Apoderado</h5>
        <div class="formgrid grid">
            <div class="field col">
            <label for="apo_nom">Nombre</label>                    
            <InputText style="min-width:19rem"  id="apoderado_id" readonly v-bind:value="matricula.apoderado.apo_nom" :options="apoderados" optionLabel="apo_nom" optionValue="id" required="true" rows="3" cols="20" />
            </div>
            <div class="field col">
                <label for="apo_app">Apellido Paterno</label>
                <!-- <InputText id="apo_app" v-model="matricula.apo_app" required="true" rows="3" cols="20" /> -->
                <label class="border" style="min-width:19rem" optionvalue="id" v-text="matricula.apoderado.apo_app"></label>
            </div>
            <div class="field col">
                <label for="apo_apm">Apellido Materno</label>
                <!-- <InputText id="apo_apm" v-model="matricula.apo_apm" required="true" rows="3" cols="20" /> -->
                <label class="border" style="min-width:19rem" optionvalue="id" v-text="matricula.apoderado.apo_apm"></label>
            </div>
        </div>
        <div class="formgrid grid">
            <div class="field col">
            <label for="apo_parentesco">Parentesco</label>
            <!-- <InputText id="apo_parentesco" v-model="matricula.apo_parentesco" required="true" rows="3" cols="20" /> -->
            <label class="border" style="min-width:19rem" optionvalue="id" v-text="matricula.apoderado.apo_vinculo"></label>
            </div>
            <div class="field col">
                <label for="apo_telf">Telefono</label>
                <!-- <InputText id="apo_telf" v-model="matricula.apo_telf" required="true" rows="3" cols="20" /> -->
                <label class="border" style="min-width:19rem" optionvalue="id" v-text="matricula.apoderado.apo_telf"></label>
            </div>
            <div class="field col">
                <label for="apo_dni">DNI</label>
                <!-- <InputText id="apo_dni" v-model="matricula.apo_dni" required="true" rows="3" cols="20" /> -->
                <label class="border" style="min-width:19rem" optionvalue="id" v-text="matricula.apoderado.apo_dni"></label>
            </div>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
            <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="actualizarMatricula" />
        </template>
    </Dialog>
    <Dialog v-model:visible="verDialog" :style="{width: '1000px'}" header="Datos del Alumno" :modal="true" class="p-fluid">
        <div class="formgrid grid">
            <div class="field col">
                <label for="mat_cod_modular">Codigo Modular</label>               
                <p rows="3" cols="20" v-text="matricula.mat_cod_modular"></p>               
            </div>
            <div class="field col">
                <label for="mat_fecha">Fecha Matricula</label>
                <p rows="3" cols="20" v-text="matricula.mat_fecha"></p>                
            </div>
            <div class="field col">
                <label for="mat_costo">Costo Matricula</label>
                <p rows="3" cols="20" v-text="matricula.mat_costo"></p>
            </div>
        </div>
        <div class="field">
            <label for="alumno_id">Alumno</label>
            <p rows="3" cols="20" v-text="matricula.alumno.alu_nom + ' ' +matricula.alumno.alu_app + ' ' + matricula.alumno.alu_apm"></p>            
        </div>
        <div class="formgrid grid">
            <div class="field col">
                <label for="mat_nivel">Nivel</label>
                <p rows="3" cols="20" v-text="matricula.mat_nivel"></p>
            </div>
            <div class="field col">
                <label for="mat_repit">Repetitivo</label>
                <p rows="3" cols="20" >
                    {{matricula.mat_repit == 1?"SI":"NO"}}
                </p>
                
            </div>
        </div>
        <div class="formgrid grid">
            <div class="field col">
                <label for="grado_id">Grado</label>
                <p rows="3" cols="20" v-text="matricula.grado.gra_nom +' '+matricula.grado.gra_seccion"></p>
            </div> 
            <div class="field col">
            <label for="anioacademico_id">Año Academico</label>
            <p rows="3" cols="20" v-text="matricula.anioacademico.anio_nom"></p>
            </div>
            <div class="field col">
                <label for="distrito_id">Distrito</label>
                <p rows="3" cols="20" v-text="matricula.distrito.dist_nom"></p>
            </div>
        </div>
        <div class="field">
            <label for="mat_estado">Estado</label>
            <p rows="3" cols="20">
                {{matricula.mat_estado == 1?"Activo":"Inactivo"}}
            </p>
            
        </div>   
        <h5>Datos del Apoderado</h5>
        <div class="formgrid grid">
            <div class="field col">
            <label for="apo_nom">Nombre</label>
            <p rows="3" cols="20" v-text="matricula.apoderado.apo_nom"></p> 
            </div>
            <div class="field col">
                <label for="apo_app">Apellido Paterno</label>
                <!-- <InputText id="apo_app" v-model="matricula.apo_app" required="true" rows="3" cols="20" /> -->
                <label class="border" style="min-width:19rem" optionvalue="id" v-text="matricula.apoderado.apo_app"></label>
            </div>
            <div class="field col">
                <label for="apo_apm">Apellido Materno</label>
                <!-- <InputText id="apo_apm" v-model="matricula.apo_apm" required="true" rows="3" cols="20" /> -->
                <label class="border" style="min-width:19rem" optionvalue="id" v-text="matricula.apoderado.apo_apm"></label>
            </div>
        </div>
        <div class="formgrid grid">
            <div class="field col">
            <label for="apo_parentesco">Parentesco</label>
            <!-- <InputText id="apo_parentesco" v-model="matricula.apo_parentesco" required="true" rows="3" cols="20" /> -->
            <label class="border" style="min-width:19rem" optionvalue="id" v-text="matricula.apoderado.apo_vinculo"></label>
            </div>
            <div class="field col">
                <label for="apo_telf">Telefono</label>
                <!-- <InputText id="apo_telf" v-model="matricula.apo_telf" required="true" rows="3" cols="20" /> -->
                <label class="border" style="min-width:19rem" optionvalue="id" v-text="matricula.apoderado.apo_telf"></label>
            </div>
            <div class="field col">
                <label for="apo_dni">DNI</label>                
                <p rows="3" cols="20" v-text="matricula.apoderado.apo_dni"></p>                
            </div>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
            <Button label="Imprimir" icon="pi pi-check" class="p-button-text" @click="imprimirMatricula" />
        </template>
    </Dialog>
  </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api'
import * as matriculaService from '../../../services/matricula.service'
import * as alumnoService from '../../../services/alumno.service'
import * as gradoService from '@/services/grado.service'
import * as anioacademicoService from '@/services/anioacademico.service'
import * as distritoService from '@/services/distrito.service'
import * as apoderadoService from '@/services/apoderado.service'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'


export default {
    data() {
        return {
            matriculas: null,
            selectedMatriculas: null,
            matricula: {},
            filters: {},
            Dialog: false,
            verDialog: false,
            alumno: {},
            grados: {},
            anioacademicos: {},
            distritos: {},
            apoderado : {},
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
                {label: 'Si Repite', value: 1},
                {label: 'No Repite', value: 0}
            ],
            estado: [
                {label: 'Activo', value: 1},
                {label: 'Inactivo', value: 0}
            ]
        }
    },
    created() {
        this.initFilters();
    },
    mounted() {
        this.listaMatricula();
    },
    methods: {
        async listaMatricula() {
            const {data} = await matriculaService.listarMatriculas();
            this.matriculas = data.data;
            const alu = await alumnoService.listarAlumnos();
            this.alumno = alu.data.data;
            const grad = await gradoService.listarGrados();
            this.grados = grad.data;
            const anioaca = await anioacademicoService.listarAnioacademicos();
            this.anioacademicos = anioaca.data;
            const dist = await distritoService.listarDistritos();
            this.distritos = dist.data;
            const apo = await apoderadoService.listarApoderados();
            this.apoderado = apo.data.data;
        },
        cerrarDialog() {
            this.Dialog = false;
            this.verDialog = false;
        },
        editarMatricula(data) {
            this.matricula = data;
            console.log(data);
            this.Dialog = true;
        },
        async actualizarMatricula() {
            let datos;
            datos = await matriculaService.modificarMatriculas(this.matricula.id, this.matricula);
            this.matricula = datos;
            this.cerrarDialog();
            this.listaMatricula();            
        },
        verMatricula(data) {
            this.matricula = data;
            this.verDialog = true;

        },
        eliminarMatricula(data) {
                this.$confirm.require({
                message: 'Esta seguro que desea eliminar ',
                header: 'Eliminar',
                icon: 'pi pi-info-circle',
                acceptClass: 'p-button-danger',
                accept: async () => {
                data = await matriculaService.eliminarMatriculas(data.id)
                this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
                this.listaMatricula();
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
            doc.text('Lista de Matriculados en General', 80, 28);
            // Cabeceras y orden de las columnas
            const headers = [['C. Modular','Nombre', 'A. Paterno', 'A. Materno', 'Nivel', 'Grado', 'F. Matricula', 'Estado']];
            // Prepara los datos para la exportación
            const dataToExport = this.matriculas.map(row => [
                row.mat_cod_modular || '',
                row.alumno.alu_nom || '',
                row.alumno.alu_app || '',
                row.alumno.alu_apm || '',
                row.mat_nivel || '',
                row.grado.gra_nom || '',
                row.mat_fecha || '',
                row.mat_estado === 1 ? 'Activo' : 'Inactivo'
            ]);
            // Generando la tabla en el PDF
            doc.autoTable({
                head: headers,
                body: dataToExport,
                startY: 40 // Ajusta la posición de inicio de la tabla según la altura del título y el logo
            });
            // Descarga archivo PDF
            doc.save('matriculas.pdf');
        },
        //reporte en excel
        exportToExcel() {
            // Define las cabeceras personalizadas y el orden de las columnas
            const headers = ['C. Modular','Nombre', 'A. Paterno', 'A. Materno', 'Nivel', 'Grado', 'F. Matricula', 'Estado'];            
            // Prepara los datos para la exportación
            const dataToExport = this.matriculas.map(row => ({            
                'C. Modular': row.mat_cod_modular || '',
                'Nombre': row.alumno.alu_nom || '',
                'A. Paterno': row.alumno.alu_app || '',
                'A. Materno': row.alumno.alu_apm || '',
                'Nivel': row.mat_nivel || '',
                'Grado': row.grado.gra_nom || '',
                'F. Matricula': row.mat_fecha || '',
                'Estado': row.mat_estado === 1 ? 'Activo' : 'Inactivo'
            }));
            // Crea una hoja de cálculo
            const worksheet = XLSX.utils.json_to_sheet(dataToExport, { header: headers });            
            // Crea un libro de trabajo
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Matriculas");
            // Convierte el libro de trabajo a un archivo Excel y descarga
            XLSX.writeFile(workbook, "matriculas.xlsx");
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