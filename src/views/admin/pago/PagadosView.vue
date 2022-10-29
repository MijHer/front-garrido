<template>
  <div class="card">
      <h1>Lista de Pensiones Pagadas</h1>
      <Toolbar class="mb-4">      
        <template #end>
            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
            <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
        </template>
      </Toolbar>
      <DataTable ref="dt" :value="pagos" v-model:selection="selectedPagos" dataKey="id" 
          :paginator="true" :rows="10" :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
          <template #header>
              <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                <h5 class="mb-2 md:m-0 p-as-md-center">Lista de Pensiones</h5>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Search..." />
                </span>
              </div>
          </template>
          <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
          <Column field="alumno.alu_nom" header="Alumno" :sortable="true" style="min-width:12rem"></Column>
          <Column field="pago_fecha" header="Fecha de pago" :sortable="true" style="min-width:10rem"></Column>
          <Column field="pago_monto" header="Monto" :sortable="true" style="min-width:10rem"></Column>         
          <Column field="pago_concepto" header="Concepto" :sortable="true" style="min-width:12rem"></Column>
          <Column field="pago_periodo" header="Periodo" :sortable="true" style="min-width:12rem"></Column>
          <Column :exportable="false" style="min-width:8rem">
              <template #body="slotProps">
                  <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProduct(slotProps.data)" />
                  <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" @click="confirmDeleteProduct(slotProps.data)" />
              </template>
          </Column>          
      </DataTable>
  </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api';
import * as pagoService from '../../../services/pago.service';
import * as alumnoService from '@/services/alumno.service';

export default {
  data() {
    return {
      pagos: null,
      selectedPagos: null,
      filters: {},
      alumnos: {}
    }
  },
  created() {
      this.initFilters();
  },
  mounted() {
    this.listaPagos();
  },
  methods: {
    async listaPagos() {
      const {data} = await pagoService.listarPagos();
      this.pagos = data;
      const alu = await alumnoService.listarAlumnos();
      this.alumnos = alu.data.data;
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