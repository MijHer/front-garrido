<template>
  <div class="card">
    <Toast />
        <ConfirmDialog></ConfirmDialog>
    <h1>Distrito</h1>
    <Toolbar class="mb-4">
        <template #start>
            <Button label="Nuevo Distrito" icon="pi pi-plus" class="p-button-success mr-2" @click="nuevoDistrito" />
        </template>
    </Toolbar>
    <DataTable ref="dt" :value="distritos" v-model:selection="selectedDistritos" dataKey="id" 
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Distritos" responsiveLayout="scroll">
        <template #header>
            <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                <h5 class="mb-2 md:m-0 p-as-md-center">Distritos</h5>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                </span>
            </div>
        </template>
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="dist_nom" header="Distrito" :sortable="true" style="min-width:16rem"></Column>        
        <Column field="provincia.prov_nom" header="Provincia" :sortable="true" style="min-width:16rem"></Column>        
        <Column field="provincia.departamento.depa_nom" header="Departamento"  :sortable="true" style="min-width:16rem"></Column>
        <Column field="dist_rgst" header="Registro" :sortable="true" style="min-width:16rem"></Column>
        <Column :exportable="false" header="Acciones" style="min-width:16rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editDistrito(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteProduct(slotProps.data)" />
            </template>
        </Column>        
    </DataTable>    
    <Dialog v-model:visible="Dialog" :style="{width: '450px'}" header="Distrito Nuevo" :modal="true" class="p-fluid">        
        <div class="field">
            <label for="dist_nom">Nombre</label>
            <InputText  id="dist_nom" autofocus v-model="distrito.dist_nom" required="true"/>
        </div>
        <div class="field">
            <label for="provincia_id" class="mb-3">Provincia</label>
            <Dropdown id="provincia_id" v-model="distrito.provincia_id" :options="provincia" optionLabel="prov_nom" optionValue="id" placeholder="Selecione Provincia">               
            </Dropdown>
        </div>
        <div class="field">
            <label for="dist_rgst" class="mb-3">Fecha de Registro</label>
            <InputText  id="dist_rgst" autofocus v-model="distrito.dist_rgst" required="true"/>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
            <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarDistrito" />
        </template>
    </Dialog>
  </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api';
import * as provinciaService from '@/services/provincia.service';
import * as distritoService from '@/services/distrito.service';
import * as departamentoService from '@/services/departamento.service';

export default {
    data() {
        return {
            distritos: null,
            selectedDistritos: null,
            filters: {},
            distrito: {},
            Dialog: false,
            provincia: {},
            departamento: {},
            estadoEdicion: false,
            date: ''
        }
    },
    created() {
        this.initFilters();
    },
    mounted() {
        this.listaDistrito();
        this.printdate();
    },
    methods: {        
        async listaDistrito() {
            const {data} = await distritoService.listarDistritos();
            this.distritos = data;
            const prov = await provinciaService.listarProvincias();
            this.provincia = prov.data.data;
            const depa = await departamentoService.listarDepartamentos();
            this.departamento = depa.data;
        },
        nuevoDistrito() {
            this.distrito = {};
            this.distrito.dist_rgst = this.date;
            this.Dialog = true;
        },
        cerrarDialog() {
            this.Dialog = false;
        },
        printdate() {
            const date = new Date().toLocaleDateString();
            this.date = date;            
        },
        async guardarDistrito() {
            let datos;
            if (this.estadoEdicion) {
                datos = await distritoService.modificarDistritos(this.distrito.id, this.distrito);
                this.distrito = datos;                
            }
            else {
                datos = await distritoService.guardarDistritos(this.distrito);
                this.distrito = datos;
            }
            if(!datos.data.error) {
                this.listaDistrito();
                this.cerrarDialog();
                this.estadoEdicion = false;
                this.distrito = {};
            }
        },
        editDistrito(data) {
            this.distrito = data;
            this.distrito.dist_rgst = this.date;
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
            data = await distritoService.eliminarDistritos(data.id)
            this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
            this.listaDistrito();
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