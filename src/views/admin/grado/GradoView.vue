<template>
  <div class="card">
      <Toast />
        <ConfirmDialog></ConfirmDialog>
      <h1>Crear Grado Academico</h1>
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Crear Grado Academico" icon="pi pi-plus" class="p-button-success mr-2" @click="gradoNuevo" />                
            </template>>
        </Toolbar>
        <DataTable :value="grados" responsiveLayout="scroll">
            <Column field="gra_nom" header="Nombre"></Column>
            <Column field="gra_detalle" header="Sección"></Column>
            <Column field="nivel.niv_nom" header="Nivel Academico"></Column>
            <Column :exportable="false" style="min-width:8rem" header="Acción">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="Dialog" :style="{width: '450px'}" header="Nivel Academico Nuevo" :modal="true" class="p-fluid">            
            <div class="field">
                <label for="gra_nom">Nombre</label>
                <InputText id="gra_nom" v-model.trim="grado.gra_nom" required="true" autofocus :class="{'p-invalid': submitted && !grado.gra_nom}" />
                <small class="p-error" v-if="submitted && !grado.gra_nom">Nombre es requerido.</small>
                <label for="gra_detalle">Sección</label>
                <InputText id="gra_detalle" v-model.trim="grado.gra_detalle" required="true" autofocus :class="{'p-invalid': submitted && !grado.gra_detalle}" />
                <small class="p-error" v-if="submitted && !grado.gra_detalle">Detalle es requerido.</small>
                <div class="field">
                    <label for="nivel_id" class="mb-3">nivel</label>
                    <Dropdown id="nivel_id" v-model="grado.nivel_id" :options="nivels" optionLabel="niv_nom" optionValue="id" placeholder="Selecione Nivel Academico">                        
                    </Dropdown>
                </div>
            </div>           
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarGrado" />
            </template>
        </Dialog>        
  </div>
</template>

<script>

import * as gradoService from '../../../services/grado.service'
import * as nivelService from '../../../services/nivel.service'

export default {
    data() {
        return {
            grados: null,
            grado: {},
            Dialog: false,
            nivels: {}
        }
    },
    mounted() {
        this.listaGrado()
    },
    methods: {
       async listaGrado() {
        const {data} = await gradoService.listarGrados();
        this.grados = data;
        const niv = await nivelService.listarNivels();
        this.nivels = niv.data;

       },
       cerrarDialog() {
           this.Dialog = false;
       },
       gradoNuevo() {
           this.Dialog = true;
       },
       async guardarGrado() {
           const {data} = await gradoService.guardarGrados(this.grado);
           this.grado = data;
           this.Dialog = false;
           this.listaGrado();
       },
       async confirmDeleteProduct(data) {
            this.$confirm.require({
            message: 'Esta seguro que desea eliminar ',
            header: 'Eliminar',
            icon: 'pi pi-info-circle',
            acceptClass: 'p-button-danger',
            accept: async () => {
            data = await gradoService.eliminarGrados(data.id)
            this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
            this.listaGrado();
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