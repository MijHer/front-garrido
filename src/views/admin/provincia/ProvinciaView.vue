<template>
  <div class="card">
    <Toast />
        <ConfirmDialog></ConfirmDialog>
    <h1>Provincias</h1>
    <Toolbar class="mb-4">
        <template #start>
            <Button label="Nueva Provincia" icon="pi pi-plus" class="p-button-success mr-2" @click="abrirDialog" />
        </template>
    </Toolbar>
    <DataTable ref="dt" :value="provincias" v-model:selection="selectedPronvicias" dataKey="id" 
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Provincias" responsiveLayout="scroll">
        <template #header>
            <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                <h5 class="mb-2 md:m-0 p-as-md-center">Provincias</h5>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                </span>
            </div>
        </template>
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="prov_nom" header="Provincia" :sortable="true" style="min-width:16rem"></Column>
        <Column field="departamento.depa_nom" header="Departamento" :sortable="true" style="min-width:16rem"></Column>
        <Column field="prov_rgst" header="Registro" :sortable="true" style="min-width:16rem"></Column>        
        <Column :exportable="false" header="Acciones" style="min-width:16rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editProvincia(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteProduct(slotProps.data)" />
            </template>
        </Column>
    </DataTable>
    <Dialog v-model:visible="Dialog" :style="{width: '450px'}" header="Provincia Nueva" :modal="true" class="p-fluid">        
        <div class="field">
            <label for="prov_nom">Nombre</label>
            <InputText  id="prov_nom" v-model="provincia.prov_nom" required="true" autofocus />
        </div>        
        <div class="field">
            <label for="departamento_id" class="mb-3">Departamento</label>
            <Dropdown id="departamento_id" v-model="provincia.departamento_id" :options="departamentos" optionLabel="depa_nom" optionValue="id" placeholder="Selecione Departamento">               
            </Dropdown>
        </div>
        <div class="field">
            <label for="prov_rgst">Fecha de Registro</label>
            <InputText  id="prov_rgst" v-model="provincia.prov_rgst" required="true" autofocus />
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
            <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarProvincia" />
        </template>
    </Dialog>
  </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api';
import * as provinciaService from '../../../services/provincia.service';
import * as departamentoService from '../../../services/departamento.service';

export default {
    data() {
        return {
            provincias: null,
            selectedPronvicias: null,
            filters: {},
            provincia: {},
            Dialog: false,
            submitted: false,
            departamentos: {},
            estadoEdicion: false,
            date: ''
        }
    },
    created() {
        this.initFilters();
    },
    mounted() {
        this.listaProvincia();
        this.printdate();
    },
    methods: {
        async listaProvincia() {
            const {data} = await provinciaService.listarProvincias();
            this.provincias = data.data;
            const depa = await departamentoService.listarDepartamentos();
            this.departamentos = depa.data;
        },
        //nuevaProvincia = abrirDialog
        abrirDialog () {
            this.provincia = {};
            this.submitted =false;
            this.provincia.prov_rgst = this.date;
            this.Dialog = true;            
        },
        cerrarDialog() {
            this.Dialog = false;
            this.submitted = false;
        },
        printdate() {
            const date = new Date().toLocaleDateString();
            this.date = date;            
        },
        async guardarProvincia() {
            let datos;
            if (this.estadoEdicion) {
                datos = await provinciaService.modificarProvincias(this.provincia.id, this.provincia);
                this.provincia = datos;
            } else {
                datos = await provinciaService.guardarProvincias(this.provincia);
                this.provincia = datos;
            }
            if(!datos.data.error) {
                this.listaProvincia();
                this.cerrarDialog();
                this.estadoEdicion = false;
                this.provincia = {};
            }
        },
        editProvincia(data) {
            this.provincia = data;
            this.provincia.prov_rgst = this.date;
            this.estadoEdicion = true;
            this.Dialog = true;
        },
        async confirmDeleteProduct(data) {
            this.$confirm.require({
            message: 'Esta seguro que desea eliminar ',
            header: 'Eliminar',
            icon: 'pi pi-info-circle',
            acceptClass: 'p-button-danger',
            accept: async () => {
            data = await provinciaService.eliminarProvincias(data.id)
            this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
            this.listaProvincia();
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