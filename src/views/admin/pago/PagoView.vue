<template>
    <div class="card">
        <h1>Realizar Pago</h1>
        <div class="p-fluid">
            <div class="field" >
                <label >Imgrese nombre del alumno</label>
                <InputText  v-model="dni" required="true" rows="3" cols="20" />
            </div>
            <Button label="Buscar" @click="buscarPersona()" />
        </div>
        <Dialog v-model:visible="Dialog" :style="{width: '900px'}" header="Buscar Alumno" :modal="true" class="p-fluid">
            <div class="field">
                <label for="alumno_id">Alumno</label>
                <InputText id="alumno_id" v-model="pago.alumno_id" required="true" rows="3" cols="20" />
                <label style="min-width:16rem" optionValue="id"> {{ alumno.alu_nom}} </label>
            </div>
            <div class="field">
                <label for="pago_fecha">Fecha de Pago</label>
                <InputText id="pago_fecha" v-model="pago.pago_fecha" required="true" rows="3" cols="20" />                
            </div>
             <div class="field">
                <label for="pago_monto">Precio de Pensión</label>
                <InputText id="pago_monto" v-model="pago.pago_monto" required="true" rows="3" cols="20" />                
            </div>
             <div class="field">
                <label for="pago_concepto">Concepto de Pago</label>
                <InputText id="pago_concepto" v-model="pago.pago_concepto" required="true" rows="3" cols="20" />                
            </div>
             <div class="field">
                <label for="pago_periodo">Periodo Correspondiente</label>
                <InputText id="pago_periodo" v-model="pago.pago_periodo" required="true" rows="3" cols="20" />                
            </div>
             <div class="field">
                <label for="matricula_id">Apoderado</label>
                <InputText id="matricula_id" v-model="pago.matricula_id" required="true" rows="3" cols="20" />
                <label style="min-width:16rem" optionValue="id" optionLabel="apoderado.apo_nom"> {{ alumno.apoderado_id}} </label>
            </div>            
            {{alumno}}        
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarPago" />
            </template>
        </Dialog>
        
    </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api';
import * as pagoService from '../../../services/pago.service';
import * as alumnoService from '@/services/alumno.service';
import * as matriculaService from '@/services/matricula.service';

export default {
  data() {
    return {
        dni: '',
        alumno: null,
        pagos: null,
        pago: {},
        matriculas: {},
        filters: {},
        Dialog: false
    }
  },
  mounted() {

  },
  methods: {    
    async buscarPersona() {
        const {data} = await alumnoService.buscar(this.dni);
        this.alumno = data;
        this.Dialog = true;
    },
    async guardarPago () {
        const { data } = await pagoService.guardarPagos(this.pago);
        this.pago = data;
        this.cerrarDialog();
    },
    cerrarDialog() {
        this.Dialog = false;
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