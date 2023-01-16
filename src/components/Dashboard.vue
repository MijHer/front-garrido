<template>
<div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
            <div class="flex justify-content-between mb-3">
                <div>
                    <span class="block text-1000 font-medium mb-3">Alumnos Matriculados</span>
                    <div class="text-blue-500 font-bold text-xl" v-text="matriculados"></div>
                </div>
                <div class="flex align-items-center justify-content-center bg-yellow-300 border-round" style="width:2.5rem;height:2.5rem;">
                    <i class="pi pi-user text-900 text-xl"></i>
                </div>                
            </div>  
            <span class="text-yellow-500 font-medium" v-text="alumnos"> </span>
            <span class="text-yellow-500 font-medium"> Alumnos </span>
            <span class="text-600"> inscritos en el sistema</span>
        </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
            <div class="flex justify-content-between mb-3">
                <div>
                    <span class="block text-1000 font-medium mb-3">Docentes Activos</span>
                    <div class="text-red-500 font-bold text-xl" v-text="profesores"></div>
                </div>
                <div class="flex align-items-center justify-content-center bg-cyan-200 border-round" style="width:2.5rem;height:2.5rem;">
                    <i class="pi pi-user-edit text-900 text-xl"></i>
                </div>                
            </div>  
            <span class="text-cyan-500 font-medium" v-text="profesTotal"> </span>
            <span class="text-cyan-500 font-medium"> Docentes </span>
            <span class="text-600"> inscritos al sistema.</span>
        </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
            <div class="flex justify-content-between mb-3">
                <div>
                    <span class="block text-1000 font-medium mb-3">Periodo Academico</span>
                    <div class="text-900 font-medium text-xl">2023</div>
                </div>
                <div class="flex align-items-center justify-content-center bg-pink-400 border-round" style="width:2.5rem;height:2.5rem;">
                    <i class="pi pi-file text-900 text-xl"></i>
                </div>                
            </div>  
            <span class="text-indigo-500 font-medium">2023 </span>
            <span class="text-600">Nombre del año en el Perú</span>           
        </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
        <div class="card mb-0">
            <div class="flex justify-content-between mb-3">
                <div>
                    <span class="block text-1000 font-medium mb-3">Usuarios Activos</span>
                    <div class="text-900 font-medium text-xl" v-text="users"></div>
                </div>
                <div class="flex align-items-center justify-content-center bg-teal-200 border-round" style="width:2.5rem;height:2.5rem;">
                    <i class="pi pi-users text-900 text-xl"></i>
                </div>                
            </div>  
            <span class="text-pink-500 font-medium" v-text="users"> </span>
            <span class="text-600"> Incritos en el sistema</span>          
        </div>
    </div>   
</div>
<div class="formgrid">
    <div class="field col">
        <div class="card"  >
            <h5>Pagos</h5>
            <Chart type="bar" :data="basicData" :options="basicOptions" />
        </div>
    </div>
    <div class="field col">
        <p>otra opcion</p>
    </div>
</div>

</template>

<script>

import * as alumnoService from '@/services/alumno.service'
import * as matriculaService from '@/services/matricula.service'
import * as profesorService from '@/services/profesor.service'
import * as anioacademicoService from '@/services/anioacademico.service'
import * as userService from '@/services/user.service'
import * as pagoService from '@/services/pago.service'

export default {
    data() {
        return {
            alumnos: null,
            matriculados: null,
            profesores: null,
            profesTotal: null,
            anioacademico: null,
            users: null,
            basicData: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nombiembre', 'Diciembre'],
                datasets: [
                    {
                        label: 'Pagos Realizados',
                        backgroundColor: '#06BCDE',
                        data: [45 ,45, 78, 58, 52, 36, 95, 89, 58, 98, 59, 56]
                    },
                    {
                        label: 'Pagos Fatantes',
                        backgroundColor: '#DC0505',
                        data: [28, 48, 40, 19, 86, 27, 90, 50, 48, 40, 19, 86]
                    }
                ]
            },
            basicOptions: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#DEE2E3'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#DEE2E3'
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.listaAlumno()
    },
    methods: {
        async listaAlumno() {
            const { data } = await alumnoService.contarAlumnos();
            this.alumnos = data;
            const matri = await matriculaService.contarMatriculas();
            this.matriculados = matri.data;
            const prof = await profesorService.contarProfesoresSi();            
            this.profesores = prof.data;
            const profetotal = await profesorService.contarProfesores();
            this.profesTotal = profetotal.data;
            const anio = await anioacademicoService.listarAnioacademicos();
            this.anioacademico = anio.data;
            const use = await userService.contarUsers();
            this.users = use.data;
            const pag = await pagoService.contarPagos();
            this.dat = pag.data;
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