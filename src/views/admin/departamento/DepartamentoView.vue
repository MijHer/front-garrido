<template>
  <div class="card">
      <Toast />
        <ConfirmDialog></ConfirmDialog>
      <h1>Crear Departamento</h1>
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Departamento Nuevo" icon="pi pi-plus" class="p-button-success mr-2" @click="departamentoNuevo" />                
            </template>>
        </Toolbar>        
        <DataTable ref="dt" :value="departamentos" v-model:selection="selectedDepartamentos" dataKey="id" 
            :paginator="true" :rows="10" :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Departamentos" responsiveLayout="scroll">
            <template #header>
                <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                    <h5 class="mb-2 md:m-0 p-as-md-center">Departamentos</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Search..." />
                    </span>
                </div>
            </template>
            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>            
            <Column field="depa_nom" header="Nombre" :sortable="true" style="min-width:16rem"></Column>
            <Column field="dape_rgst" header="Registro" :sortable="true" style="min-width:16rem"></Column>
            <Column></Column>                
            <Column :exportable="false" header="Eliminar" style="min-width:16rem">
                <template #body="slotProps">                    
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="Dialog" :style="{width: '450px'}" header="Departamento Nuevo" :modal="true" class="p-fluid">            
            <div class="field">
                <label for="depa_nom">Nombre</label>
                <InputText id="depa_nom" v-model.trim="departamento.depa_nom" required="true" autofocus :class="{'p-invalid': submitted && !departamento.depa_nom}" />
            </div>
            <div class="field">
                <label for="dape_rgst">Fecha de Registro</label>
                <InputText id="dape_rgst" v-model.trim="departamento.dape_rgst" required="true" autofocus :class="{'p-invalid': submitted && !departamento.dape_rgst}" />
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarDepartamento" />
            </template>
        </Dialog>
  </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api';
import * as departamentoService from '../../../services/departamento.service'

export default {
    data() {
        return {
            submitted:false,
            departamentos: null,
            departamento: {},
            Dialog: false,
            selectedDepartamentos: null,
            date: ''
        }
    },
    created() {
        this.initFilters();
    },
    mounted() {
        this.listaDepartamento();
        this.printdate();
    },
    methods: {
       async listaDepartamento() {
        const {data} = await departamentoService.listarDepartamentos();
        this.departamentos = data;
       },
       cerrarDialog() {
           this.Dialog = false;
           this.departamento = {};

       },
       departamentoNuevo() {
           this.Dialog = true;
           this.departamento.dape_rgst = this.date;
       },
       printdate() {
            const date = new Date().toLocaleDateString();
            this.date = date;            
        },
       async guardarDepartamento() {
           const {data} = await departamentoService.guardarDepartamentos(this.departamento);
           this.departamento = data;
           this.Dialog = false;
           this.listaDepartamento();
       },
       async confirmDeleteProduct(data) {
            this.$confirm.require({
            message: 'Esta seguro que desea eliminar ',
            header: 'Eliminar',
            icon: 'pi pi-info-circle',
            acceptClass: 'p-button-danger',
            accept: async () => {
            data = await departamentoService.eliminarDepartamentos(data.id)
            this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
            this.listaDepartamento();
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