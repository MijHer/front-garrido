<template>
<div class="card">
  <h1>Lista de Pensiones Pagadas</h1>
    <DataTable ref="dt" :value="alumnos" v-model:selection="selectedAlumnos" dataKey="id" 
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
        <template #header>
            <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                <h5 class="mb-2 md:m-0 p-as-md-center">Alumnos</h5>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                </span>
            </div>
        </template>
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="alu_nom" header="Nombre" :sortable="true" style="min-width:12rem"></Column>
        <Column field="alu_app" header="Apellido P." :sortable="true" style="min-width:12rem"></Column>
        <Column field="alu_apm" header="Apellido M." :sortable="true" style="min-width:12rem"></Column>
        <Column field="alu_nmr_doc" header="DNI" :sortable="true" style="min-width:12rem"></Column>               
        <Column header="Detalles" :exportable="false" style="min-width:12rem">
            <template #body="slotProps">
                <Button icon="pi pi-file" class="p-button-rounded p-button-warning mr-2" @click="verPago(slotProps.data)" />                
            </template>
        </Column>
    </DataTable>
    <!-- DIALOG PARA EDITAR EL PAGO -->
    <Dialog v-model:visible="Dialog" :style="{width: '900px'}" header="MODIFICAR PAGO REALIZADO" :modal="true" class="p-fluid">       
        <div class="field">
            <label for="alumno_id">Alumno</label>
            <InputText id="alumno_id" readonly v-model="nombreAlu" required="true" rows="3" cols="20" />
        </div> 
        <div class="formgrid grid">
            <div class="field col">
                <label for="pago_fecha">Fecha de Pago</label>
                <InputText id="pago_fecha" readonly v-model="pago.pago_fecha"  dateFormat="yy-dd-mm" required="true" rows="3" cols="20" />
            </div>
            <div class="field col">
                <label for="pago_hora">Hora de Pago</label>
                <InputText id="pago_fecha" readonly v-model="pago.pago_hora" required="true" rows="3" cols="20" />                
            </div>
        </div>
          <div class="field">
            <label for="pago_monto">Precio de Pensión</label>
            <InputText id="pago_monto" readonly v-model="pago.pago_monto" required="true" rows="3" cols="20" />                
        </div>
          <div class="field">
            <label for="pago_concepto">Concepto de Pago</label>
            <InputText id="pago_concepto" v-model="pago.pago_concepto" required="true" rows="3" cols="20" />                
        </div>
          <div class="field">
            <label for="pago_periodo">Periodo Correspondiente</label>
            <InputText id="pago_periodo" v-model="pago.pago_periodo" required="true" rows="3" cols="20" />                
        </div>        
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
            <Button label="Modificar" icon="pi pi-check" class="p-button-text" @click="actualizarPago" />
        </template>
    </Dialog>
    <!-- DIALOG PARA VER LOS PAGOS RELIZADOS POR EL ALUMNO -->
    <Dialog header="PAGOS REALZADOS DE PENSIONES" v-model:visible="verDialog" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '60vw'}" :modal="true">
        <div class="formgrid grid">
            <div class="field">
                <label  for="alumno_id">Alumno</label>
                <p v-text="nombreAlu"></p>
            </div> 
        </div>
        <div v-if="alumno">
            <DataTable :value="alumno.pagos" responsiveLayout="scroll">
                <Column field="pago_periodo" header="Periodo" style="min-width:8rem"></Column>
                <Column field="pago_concepto" header="Concepto de Pago" style="min-width:8rem"></Column>
                <Column field="pago_monto" header="Monto" style="min-width:8rem"></Column>
                <Column field="pago_fecha" header="Fecha" style="min-width:8rem"></Column>
                <Column header="Editar" :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editarPago(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>           
        </div>
        <template #footer>
            <Button label="Cerrar" icon="pi pi-times" @click="closeModal" class="p-button-text"/>
        </template>
    </Dialog>
</div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api'
import * as alumnoService from '@/services/alumno.service'
import * as pagoService from '@/services/pago.service'

export default {
    data() {
        return {
            alumnos: null,
            selectedAlumnos: null,
            filters: {},
            Dialog: false,
            pagos: null,
            pago: {},
            verDialog: false,
            nombreAlu: '',
            alumno: {}
        }
    },
    created() {
        this.initFilters();
    },
    mounted() {
        this.listaAlumno();
    },
    methods: {
        async listaAlumno() {
            const alu = await alumnoService.listarAlumnos();
            this.alumnos = alu.data.data;
            const pag = await pagoService.listarPagos();
            this.pagos = pag.data;
        },
        cerrarDialog() {
            this.Dialog = false;
        },
        editarPago(data) {
            console.log(data);
            this.pago = data;
            /* this.pago.pago_monto = data.pagos.pago_monto; */
            this.Dialog = true;
        },
        async actualizarPago() {
            const { data } = await pagoService.mofidicarPagos(this.pago.id, this.pago);
            this.pago = data;
            this.Dialog = false;
        },
        verPago(data) {
            this.alumno = data;
            this.nombreAlu = data.alu_nom + ' ' + data.alu_app + ' ' + data.alu_apm;
            this.verDialog = true;
        },
        closeModal() {
            this.verDialog = false;
        },
        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }        
    }
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