<template>
  <div class="card">
      <Toast />
        <ConfirmDialog></ConfirmDialog>
      <h1>Crear Año academico</h1>
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Crear Año Academico" icon="pi pi-plus" class="p-button-success mr-2" @click="anioacademicoNuevo" />                
            </template>>
        </Toolbar>
        <DataTable :value="anioacademicos" responsiveLayout="scroll">
            <Column field="anio_nom" header="Nombre"></Column>
            <Column field="anio_detalle" header="Detalle"></Column>
            <Column :exportable="false" style="min-width:8rem" header="Acción">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="Dialog" :style="{width: '450px'}" header="Año Academico Nuevo" :modal="true" class="p-fluid">            
            <div class="field">
                <label for="anoi_nom">Nombre</label>
                <InputText id="anoi_nom" v-model.trim="anioacademico.anio_nom" required="true" autofocus :class="{'p-invalid': submitted && !anioacademico.anio_nom}" />
                <small class="p-error" v-if="submitted && !anioacademico.anio_nom">Nombre es requerido.</small>
            </div>
            <div class="field">
                <label for="anio_detalle">Detalle</label>
                <Textarea id="anio_detalle" v-model="anioacademico.anio_detalle" required="true" rows="3" cols="20" />
            </div>            
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarAnioacademico" />
            </template>
        </Dialog>
  </div>
</template>

<script>

import * as anioacademicoService from '../../../services/anioacademico.service.js'

export default {
    data() {
        return {
            anioacademicos: null,
            anioacademico: {},
            Dialog: false,
        }
    },
    mounted() {
        this.listaAnioacademico()
    },
    methods: {
       async listaAnioacademico() {
        const {data} = await anioacademicoService.listarAnioacademicos();
        this.anioacademicos = data;
       },
       cerrarDialog() {
           this.Dialog = false;
       },
       anioacademicoNuevo() {
           this.Dialog = true;
       },
       async guardarAnioacademico() {
           const {data} = await anioacademicoService.guardarAnioacademicos(this.anioacademico);
           this.anioacademico = data;
           this.Dialog = false;
           this.listaAnioacademico();
       },
       async confirmDeleteProduct(data) {
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