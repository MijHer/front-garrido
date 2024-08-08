<template>
  <div class="card">
      <h1>Lista de Pagos Realizadosss</h1>
      <Toolbar class="mb-4">      
        <template #end>
            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" chooseLabel="Import" class="mr-2 inline-block" />
            <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
        </template>
      </Toolbar>        
        <div v-if="alumnos">
        <DataTable :value="alumnos.pagos" responsiveLayout="scroll">
            <Column field="pago_periodo" header="Periodo" style="min-width:18rem"></Column>
            <Column field="pago_concepto" header="Concepto de Pago" style="min-width:18rem"></Column>
            <Column field="pago_fecha" header="Fecha" style="min-width:18rem"></Column>
            <Column field="pago_monto" header="Monto" style="min-width:18rem"></Column>
        </DataTable>
        </div>
  </div>
</template>

<script>

import * as pagoService from '@/services/pago.service'
import * as alumnoService from '@/services/alumno.service'

export default {
  data() {
    return {
      pagos: {},
      alumnos: {}
    }
  }, 
  mounted() {
    this.listaPagos();
  },
  methods: {
    async listaPagos() {
      const pag = await pagoService.listarPagos();
      this.pagos = pag.data;
      const alu = await alumnoService.muestraPago();
      this.alumnos = alu.data;
      console.log(this.alumnos);
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