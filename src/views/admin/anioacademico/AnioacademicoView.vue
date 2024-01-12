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
            <Column field="anio_nom" header="Nombre del año" style="min-width:20rem"></Column>
            <Column field="anio_inicio" header="Inicio de Periódo" style="min-width:8rem"></Column>
            <Column field="anio_fin" header="Fin de Periódo" style="min-width:8rem"></Column>
            <Column field="anio_detalle" header="Matrícula S/." style="min-width:8rem"></Column>
            <Column field="anio_pension_inicial" header="Inicial S/." style="min-width:8rem"></Column>
            <Column field="anio_pension_primaria" header="Primaria S/." style="min-width:8rem"></Column>
            <Column field="anio_pension_secundaria" header="Secundaria S/." style="min-width:8rem"></Column>
            <Column field="anio_estado" header="Estado" style="min-width:10rem">            
                <template #body="slotProps" >
                    <div>                        
                        <Button v-if="slotProps.data.anio_estado == 0" label="Activar" value="Activar" class="p-button-danger mr-2" @click="activarAnio(slotProps.data)" />
                        <Tag class="mr-2" style="font-size: 15px; padding:10px 18px;" severity="success" value="Activo" v-else></Tag>
                    </div>                    
                </template>
            </Column>
            <Column :exportable="false" header="Acción" style="min-width:10rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" v-if="slotProps.data.anio_estado == 1" @click="editarAnio(slotProps.data)" />
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mr-2" v-if="slotProps.data.anio_estado == 1" @click="borrarAnio(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <!-- DIALOG PARA CREAR DETALLES DEL AÑO ACADEMICO -->
        <Dialog v-model:visible="DialogAnio" :style="{width: '800px'}" header="Año Academico Nuevo" :modal="true" class="p-fluid">            
            <div class="formgrid grid">
                <div class="field col">
                    <label for="anoi_nom">Nombre</label>
                    <InputText id="anoi_nom" v-model.trim="anioacademico.anio_nom" required="true" autofocus :class="{'p-invalid': submitted && !anioacademico.anio_nom}" />
                    <small class="p-error" v-if="submitted && !anioacademico.anio_nom">Nombre es requerido.</small>
                </div>                
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="anio_inicio">Fecha Inicio</label>                
                    <Calendar inputId="icon" v-model="anioacademico.anio_inicio" :showIcon="true" />
                </div>
                <div class="field col">
                    <label for="anio_fin">Fecha Fin</label>
                    <Calendar inputId="icon" v-model="anioacademico.anio_fin" :showIcon="true" />
                </div>
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="anio_detalle">Costo Matricula</label>
                    <InputText id="anio_detalle" v-model="anioacademico.anio_detalle" required="true" rows="3" cols="20" />
                </div>
                <div class="field col">
                    <label for="anio_pension_inicial">Pension de Inicial</label>                
                    <InputText inputId="icon" v-model="anioacademico.anio_pension_inicial" required="true" rows="3" cols="20" />
                </div>
                <div class="field col">
                    <label for="anio_pension_primaria">Pension de Primaria</label>                
                    <InputText inputId="icon" v-model="anioacademico.anio_pension_primaria" required="true" rows="3" cols="20" />
                </div>
                <div class="field col">
                    <label for="anio_pension_secundaria">Pension de Secundaria</label>                
                    <InputText inputId="icon" v-model="anioacademico.anio_pension_secundaria" required="true" rows="3" cols="20" />
                </div>
            </div>            
            <div class="field">
                <label for="anio_estado" class="mb-3">Estado</label>
                <Dropdown id="anio_estado" v-model="anioacademico.anio_estado" :options="statusAnoi" optionLabel="label" optionValue="value" placeholder="Selecione Estado">                        
                </Dropdown>
            </div>
            {{anioacademico}}
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialogAnio"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarAnioacademico" />
            </template>
        </Dialog>
        <!-- PARA ACTIVAR ANIO ACADEMICO -->
        <Dialog header="CAMBIAR AÑO ACADEMICO" v-model:visible="dialogActivar" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '20vw'}" :modal="true">
            <p style="color: red;"> <b style="font-size:20px; color:red;">¡</b>Esta seguro de cambiar el año academico.<b style="font-size:20px; color:red;">!</b></p>            
            <template #footer>
                <Button label="No" icon="pi pi-times" @click="cerrarModal" class="p-button-text"/>
                <Button label="Si" icon="pi pi-check" class="p-button-danger" @click="aceptarCambiodeAnio" autofocus />
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
                {label: 'Activo', value: 1},
                {label: 'Inactivo', value: 0}
                ],
            estadoEdicion: false,
            dialogActivar: false,
            anioselecionado: -1
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
       anioacademicoNuevo() {
           this.DialogAnio = true;
           this.anioacademico = {};
       },        
       async guardarAnioacademico() {
            let datos;
            if (this.estadoEdicion) {
                datos = await anioacademicoService.mofidicarAnioacademicos(this.anioacademico.id, this.anioacademico);
                this.anioacademico = datos;
                this.cerrarDialogAnio();
                this.listaAnioacademico();
            }else {
                datos = await anioacademicoService.guardarAnioacademicos(this.anioacademico);
                this.anioacademico = datos;                
                this.cerrarDialogAnio();
                this.listaAnioacademico();
            }
            if (!datos.data.error) {
                this.listaAnioacademico();
                this.cerrarDialogAnio();
                this.estadoEdicion = false;
                this.anioacademico = {};
            }
       },
       editarAnio(data) {
        this.anioacademico = data;
        this.estadoEdicion = true;
        this.DialogAnio = true;
       },
       activarAnio(id) {
        this.anioselecionado = id;
        this.dialogActivar = true;
       },
       async aceptarCambiodeAnio() {
        const aniocambi = await anioacademicoService.cambiarAnoiacademicos({id:this.anioselecionado.id});
        this.listaAnioacademico();
        this.anioselecionado = -1;
        this.dialogActivar = false;
       },
       cerrarModal() {
        this.dialogActivar = false;
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