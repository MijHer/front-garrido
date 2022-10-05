<template>
  <div class="card">
      <Toast />
        <ConfirmDialog></ConfirmDialog>
      <h2>Crear Año academico</h2>
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Crear Año Academico" icon="pi pi-plus" class="p-button-success mr-2" @click="anioacademicoNuevo" />                
            </template>>
        </Toolbar>
        <DataTable :value="anioacademicos" responsiveLayout="scroll">
            <Column field="anio_nom" header="Nombre"></Column>
            <Column field="anio_detalle" header="Detalle"></Column>
            <Column field="anio_inicio" header="Inicio"></Column>
            <Column field="anio_fin" header="Fin"></Column>
            <Column field="anio_estado" header="Estado">
                <template #body="slotProps">
                    {{slotProps.data.anio_estado == 1?"Activo":"Inactivo"}}
                </template>
            </Column>          
            <Column :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="borrarAnio(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="DialogAnio" :style="{width: '450px'}" header="Año Academico Nuevo" :modal="true" class="p-fluid">            
            <div class="field">
                <label for="anoi_nom">Nombre</label>
                <InputText id="anoi_nom" v-model.trim="anioacademico.anio_nom" required="true" autofocus :class="{'p-invalid': submitted && !anioacademico.anio_nom}" />
                <small class="p-error" v-if="submitted && !anioacademico.anio_nom">Nombre es requerido.</small>
            </div>
            <div class="field">
                <label for="anio_detalle">Detalle</label>
                <InputText id="anio_detalle" v-model="anioacademico.anio_detalle" required="true" rows="3" cols="20" />
            </div>
            <div class="field">
                <label for="anio_inicio">Fecha Inicio</label>                
                <Calendar inputId="icon" v-model="anioacademico.anio_inicio" :showIcon="true" />
            </div>
            <div class="field">
                <label for="anio_fin">Fecha Fin</label>
                <Calendar inputId="icon" v-model="anioacademico.anio_fin" :showIcon="true" />
            </div>
            <div class="field">
                <label for="anio_estado" class="mb-3">Estado</label>
                <Dropdown id="anio_estado" v-model="anioacademico.anio_estado" :options="statusAnoi" optionLabel="label" optionValue="value" placeholder="Selecione Estado">                        
                </Dropdown>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialogAnio"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarAnioacademico" />
            </template>
        </Dialog>        
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api'
import * as anioacademicoService from '../../../services/anioacademico.service.js'


export default {
    data() {
        return {
            anioacademicos: null,
            anioacademico: {},            
            filters: {},
            DialogAnio: false,            
            statusAnoi: [
                {label: 'ACTIVO', value: '1'},
                {label: 'INACTIVO', value: '0'}
                ]
        }
    },    
    mounted() {
        this.listaAnioacademico();        
    },
    methods: {
       async listaAnioacademico() {
        const {data} = await anioacademicoService.listarAnioacademicos();
        this.anioacademicos = data;
       },       
       cerrarDialogAnio() {
           this.DialogAnio = false;
       },
       cerrarDialog() {
           this.DialogGrado = false;
       },
       anioacademicoNuevo() {
           this.DialogAnio = true;
       },        
       async guardarAnioacademico() {
           const {data} = await anioacademicoService.guardarAnioacademicos(this.anioacademico);
           this.anioacademico = data;
           this.DialogAnio = false;
           this.listaAnioacademico();
       },       
       async borrarAnio(data) {
            this.$confirm.require({
            message: 'Esta seguro que desea eliminar ',
            header: 'Eliminar',
            icon: 'pi pi-info-circle',
            acceptClass: 'p-button-danger',
            accept: async () => {
            data = await anioacademicoService.eliminarAnioacademicos(data.id)
            this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
            this.listaAnioacademico();
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