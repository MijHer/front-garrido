<template>
    <div class="card">
        <Toast />
        <ConfirmDialog :breakpoints="{'300px': '35vw', '200px': '55vw'}" :style="{width: '25vw'}"></ConfirmDialog>
        <h1>Realizar Pago</h1>
        <div class="p-fluid">
            <div class="field" >
                <label >Ingrese DNI del alumno</label>
                <InputText  v-model="dni" required="true" rows="3" cols="20" autofocus />
            </div>
            <Button label="Buscar" @click="buscarPersona()" />
        </div>
        <!-- SE MUESTRA EL DIALOG SI EL DNI NO ES ECONTRADO -->
            <Dialog header="DNI no existe" v-model:visible="displayModal" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :modal="true" :style="{width: '20vw'}">
                <p>Ingrese nuevamente el DNI</p>
                <template #footer>
                    <Button label="Aceptar" class="p-button-danger" @click="closeBasic" autofocus />
                </template>
            </Dialog>
        <!-- DIALOG PARA MOSTRAR LA INFORMACION DEL ALUMNO QUE REAZLIZA EL PAGO -->
        <Dialog v-model:visible="Dialog" :style="{width: '900px'}" header="Alumno" :modal="true" class="p-fluid">
            <div class="field">
                <label for="alumno_id">Alumno</label>
                <InputText id="alumno_id" readonly v-bind:value="alumno.alu_nom" required="true" rows="3" cols="20" />                
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="pago_fecha">Fecha de Pago</label>
                    <InputText id="pago_fecha"  v-model="pago.pago_fecha"  dateFormat="yy-dd-mm" required="true" rows="3" cols="20" />                
                </div>
                <div class="field col">
                    <label for="pago_hora">Hora de Pago</label>
                    <InputText id="pago_fecha" readonly v-model="pago.pago_hora" required="true" rows="3" cols="20" />                
                </div>
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
                <label >Apoderado</label>
                <InputText id="matricula_id" readonly v-bind:value="alumno.apoderado.apo_nom" required="true" rows="3" cols="20" />                
            </div>            
            {{pago}}       
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarPago" />
            </template>
        </Dialog>
        
    </div>
</template>

<script>

import * as pagoService from '../../../services/pago.service';
import * as alumnoService from '@/services/alumno.service';

export default {
  data() {
    return {
        dni: '',
        alumno: null,
        pago: {},
        matriculas: {},
        filters: {},
        Dialog: false,
        date: '',
        time: '',
        displayModal: false
    }
  },
  mounted() {
    this.printdate();
    this.printTime();
  },
  methods: {    
    async buscarPersona() {
        const {data} = await alumnoService.buscar(this.dni);
        this.alumno = data;
        if (this.dni ==  data.alu_nmr_doc) {            
            console.log(this.alumno);
            this.pago.alumno_id = this.alumno.id;
            this.pago.matricula_id = this.alumno.apoderado_id;
            this.pago.pago_fecha = this.date;
            this.pago.pago_hora = this.time;
            this.Dialog = true;
        } 
        else {            
            this.displayModal = true;
        }
    },
    closeBasic() {
        this.displayModal = false;
    },
    printdate() {
        const date = new Date().toLocaleDateString();
        this.date=date;
    },
    printTime() {
        const time = new Date().toLocaleTimeString();
        this.time = time;
    },
    async guardarPago () {
        const { data } = await pagoService.guardarPagos(this.pago);
        this.pago = data;
        this.cerrarDialog();
    },
    cerrarDialog() {
        this.Dialog = false;
    }
  }
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