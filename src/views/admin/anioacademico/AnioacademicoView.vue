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
            <Column field="estado" header="Estado"></Column>
            <Column :exportable="false" style="min-width:8rem" header="Acción">
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
                <Textarea id="anio_detalle" v-model="anioacademico.anio_detalle" required="true" rows="3" cols="20" />
            </div>
            <div class="field">
                <label for="estado" class="mb-3">Estado</label>
                <Dropdown id="estado" v-model="anioacademico.estado" :options="status" optionLabel="label" optionValue="value" placeholder="Selecione Estado">                        
                </Dropdown>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialogAnio"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarAnioacademico" />
            </template>
        </Dialog>
        <h2>Crear Nivel Academico</h2>
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Crear Nivel Academico" icon="pi pi-plus" class="p-button-success mr-2" @click="nivelNuevo" />                
            </template>>
        </Toolbar>
        <DataTable :value="nivels" responsiveLayout="scroll">
            <Column field="niv_nom" header="Nombre" style="min-width:12rem"></Column>
            <Column style="min-width:12rem"></Column>
            <Column style="min-width:12rem"></Column>
            <Column :exportable="false" style="min-width:8rem" header="Acción">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="borrarNivel(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="DialogNivel" :style="{width: '450px'}" header="Nivel Academico Nuevo" :modal="true" class="p-fluid">            
            <div class="field">
                <label for="niv_nom">Nombre</label>
                <InputText id="niv_nom" v-model.trim="nivel.niv_nom" required="true" autofocus :class="{'p-invalid': submitted && !nivel.niv_nom}" />
                <small class="p-error" v-if="submitted && !nivel.niv_nom">Nombre es requerido.</small>
            </div>           
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialogNivel"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarNivel" />
            </template>
        </Dialog>
        <h2>Crear Grado Academico</h2>
        <Toolbar class="mb-4">
            <template #start>
                <Button label="Crear Grado Academico" icon="pi pi-plus" class="p-button-success mr-2" @click="gradoNuevo" />                
            </template>>
        </Toolbar>
        <DataTable :value="grados" responsiveLayout="scroll">
            <Column field="gra_nom" header="Nombre" style="min-width:12rem"></Column>
            <Column field="gra_detalle" header="Sección" style="min-width:12rem"></Column>
            <Column field="nivel.niv_nom" header="Nivel Academico" style="min-width:12rem"></Column>
            <Column :exportable="false" style="min-width:8rem" header="Acción">
                <template #body="slotProps">
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteProduct(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="Dialog" :style="{width: '450px'}" header="Grado Academico Nuevo" :modal="true" class="p-fluid">            
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

import * as anioacademicoService from '../../../services/anioacademico.service.js';
import * as nivelService from '../../../services/nivel.service.js';
import * as gradoService from '../../../services/grado.service';

export default {
    data() {
        return {
            anioacademicos: null,
            anioacademico: {},
            grados: null,
            grado: {},
            nivels: null,
            nivel: {},
            niveles: {},
            Dialog: false,
            DialogAnio: false,
            DialogNivel: false,
            status: [
                    {label: 'ACTIVO', value: '1'},
                    {label: 'INACTIVO', value: '0'}
                ]
        }
    },
    mounted() {
        this.listaAnioacademico();
        this.listaNiveles();
        this.listaGrado();
    },
    methods: {
       async listaAnioacademico() {
        const {data} = await anioacademicoService.listarAnioacademicos();
        this.anioacademicos = data;
       },
       async listaNiveles() {
        const {data} = await nivelService.listarNivels();
        this.nivels = data;
       },
       async listaGrado() {
        const {data} = await gradoService.listarGrados();
        this.grados = data;
        const niv = await nivelService.listarNivels();
        this.nivels = niv.data;

       },
       cerrarDialogAnio() {
           this.DialogAnio = false;
       },
       cerrarDialogNivel() {
            this.DialogNivel = false;
       },
       cerrarDialog() {
           this.Dialog = false;
       },
       gradoNuevo() {
           this.Dialog = true;
       },
       anioacademicoNuevo() {
           this.DialogAnio = true;
       },
       nivelNuevo() {
            this.DialogNivel = true;
       },
       async guardarAnioacademico() {
           const {data} = await anioacademicoService.guardarAnioacademicos(this.anioacademico);
           this.anioacademico = data;
           this.DialogAnio = false;
           this.listaAnioacademico();
       },async guardarNivel() {
           const {data} = await nivelService.guardarNivels(this.nivel);
           this.nivel = data;
           this.DialogNivel = false;
           this.listaNiveles();
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
       },
       async borrarNivel(data) {
            this.$confirm.require({
            message: 'Esta seguro que desea eliminar ',
            header: 'Eliminar',
            icon: 'pi pi-info-circle',
            acceptClass: 'p-button-danger',
            accept: async () => {
            data = await nivelService.eliminarNivels(data.id)
            this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
            this.listaNiveles();
            },
            reject: () => {
            this.$toast.add({severity:'error', summary:'Cancelado', detail:'Aceptaste Cancelar', life: 3000});
            }
        });
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