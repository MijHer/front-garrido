<template>
  <div class="card">
    <Toast />
        <ConfirmDialog></ConfirmDialog>
    <Toolbar class="mb-4">
        <template #start>
            <Button label="Nuevo Rol" icon="pi pi-plus" class="p-button-success mr-2" @click="abrirDialog" />            
        </template>        
    </Toolbar>
    <DataTable ref="dt" :value="tipousuarios" v-model:selection="selectedTipousuario" dataKey="id" 
      :paginator="true" :rows="10" :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" responsiveLayout="scroll">
      <template #header>
          <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
          <h5 class="mb-2 md:m-0 p-as-md-center">Tipos de Usuarios</h5>
          <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText v-model="filters['global'].value" placeholder="Search..." />
          </span>
        </div>
      </template>
      <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
      <Column field="tipo_nom" header="Nombre" :sortable="true" style="min-width:16rem"></Column>
      <Column field="tipo_descripcion" header="Descripción" :sortable="true" style="min-width:16rem"></Column>
      <Column field="tipo_estado" header="Estado" :sortable="true" style="min-width:16rem">
        <template #body="slotProps">
            {{slotProps.data.tipo_estado == 1?"Activo":"Inactivo"}}
        </template>
      </Column>      
      <Column :exportable="false" header="Acciones" style="min-width:16rem">
          <template #body="slotProps">
              <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editTipousuario(slotProps.data)" />
              <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteTipousuario(slotProps.data)" />
          </template>
      </Column>
    </DataTable>
    <Dialog v-model:visible="Dialog" :style="{width: '450px'}" header="Tipo De Usuario" :modal="true" class="p-fluid">        
        <div class="field">
            <label for="tipo_nom">Nombre</label>
            <InputText id="tipo_nom" v-model.trim="tipousuario.tipo_nom" required="true" autofocus :class="{'p-invalid': submitted && !tipousuario.tipo_nom}" />
            <small class="p-error" v-if="submitted && !tipousuario.tipo_nom == '' ">Nombre es requerido.</small>
        </div>
        <div class="field">
            <label for="tipo_descripcion">Descripción</label>
            <InputText id="tipo_descripcion" v-model.trim="tipousuario.tipo_descripcion"  autofocus :class="{'p-invalid': submitted && !tipousuario.tipo_descripcion}" />            
        </div>
        <div class="field">
          <label for="estado" class="mb-3">Estado</label>
          <Dropdown id="estado" v-model="tipousuario.tipo_estado" :options="statuses" optionLabel="label" optionValue="value" placeholder="Seleciones Estado">            
          </Dropdown>
        </div>
          <template #footer>
              <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
              <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarTipousuario" />
          </template>
      </Dialog>
  </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api'
import * as tipousuarioService from '@/services/tipousuario.service'

export default {
  data() {
    return {
      tipousuarios: null,
      tipousuario: {},
      selectedTipousuario: null,
      submitted: false,
      statuses: [
        {label:'Activo', value:'1'},
        {label:'Inactivo', value:'0'}
      ],
      Dialog: false,
      estadoEdicion: false
    }
  },
  created() {
        this.initFilters();
    },
  mounted() {
    this.listaTipousuario();
  },
  methods: {
    async listaTipousuario() {
      const {data} = await tipousuarioService.listarTiposuarios();
      this.tipousuarios = data;
    },
    async guardarTipousuario() {
      let datos;
      if (this.estadoEdicion == true) {
        datos = await tipousuarioService.modificarTipousuario(this.tipousuario.id, this.tipousuario);
        this.tipousuario = datos;
      }
      else {
        datos = await tipousuarioService.guardarTipousuario(this.tipousuario);
        this.tipousuario = datos;
      }
      if (!datos.data.error) {
        this.listaTipousuario();
        this.cerrarDialog();
        this.estadoEdicion = false;
      }
      console.log(this.submitted);
    },
    editTipousuario(data) {
      this.tipousuario = data;
      this.abrirDialog();
      this.estadoEdicion = true;
    },
    abrirDialog() {
      this.Dialog = true;
    },
    cerrarDialog() {
      this.Dialog = false;
      this.tipousuario = {};
    },
    async confirmDeleteTipousuario(data) {
        this.$confirm.require({
        message: 'Esta seguro que desea eliminar ',
        header: 'Eliminar',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: async () => {
        data = await tipousuarioService.eliminarTipousuario(data.id)
        this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
        this.listaTipousuario();
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