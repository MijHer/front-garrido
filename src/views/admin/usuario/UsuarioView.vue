<template>
  <div class="card">
    <Toast />
        <ConfirmDialog></ConfirmDialog>
    <Toolbar class="mb-4">
      <template #end>
        <Button label="Excel" icon="pi pi-upload" class="p-button-primary mr-2" @click="exportToExcel($event)"  />
				<Button label="PDF" icon="pi pi-upload" class="p-button-help" @click="exportToPDF($event)"  />	
      </template>
    </Toolbar>
    <DataTable ref="dt" :value="users" v-model:selection="selectedUsers" dataKey="id" 
        :paginator="true" :rows="10" :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Usuarios" responsiveLayout="scroll">
        <template #header>
            <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
            <h3 class="mb-2 md:m-0 p-as-md-center">Registro de Usuarios</h3>
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Search..." />
            </span>
          </div>
        </template>
        <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
        <Column field="name" header="Nombre" :sortable="true" style="min-width:16rem"></Column>
        <Column field="email" header="Correo" :sortable="true" style="min-width:16rem"></Column>
        <Column field="usu_user" header="Nick" :sortable="true" style="min-width:16rem"></Column>
        <Column field="tipousuario.tipo_nom" header="Rol" :sortable="true" style="min-width:16rem"></Column>
        <Column field="usu_estado" header="Estado" :sortable="true" style="min-width:16rem">         
          <template #body="slotProps" >
              {{slotProps.data.usu_estado == 1?"Activo":"Inactivo"}}
          </template>
        </Column>
        <Column :exportable="false" header="Acciones" style="min-width:16rem">
            <template #body="slotProps">
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editarUsers(slotProps.data)" />
                <Button icon="pi pi-trash" class="p-button-rounded p-button-danger mt-2" @click="eliminarUsers(slotProps.data)" />
            </template>
        </Column>        
    </DataTable>
    <Dialog v-model:visible="Dialog" :style="{width: '950px'}" header="Registro de Usuario" :modal="true" class="p-fluid">
      <div class="formgrid grid">
        <div class="field col">
          <label for="name">Nombre</label>          
          <InputText id="name" readonly v-model.trim="user.name" required="true" autofocus :class="{'p-invalid': submitted && !user.name}" />          
        </div>
        <div class="field col">
            <label for="usu_dni">DNI</label>
            <InputText id="usu_dni" readonly v-model.trim="user.usu_dni"   required="true" autofocus  />          
        </div>
        <div class="field col">
            <label for="usu_telf">Telefono</label>
            <InputText id="usu_telf" v-model.trim="user.usu_telf" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_telf}" />          
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col">
          <label for="email">Correo</label>
          <InputText id="email" v-model.trim="user.email" required="true" autofocus :class="{'p-invalid': submitted && !user.email}" />          
        </div>      
        <div class="field col">
          <label for="usu_user">Usuario</label>
          <InputText id="usu_user" v-model.trim="user.usu_user" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_user}" />          
        </div>
        <div class="field col">
            <label for="password">Contraseña</label>
            <Password id="password" v-model="user.password" placeholder="Contraseña" :toggleMask="true" inputClass="w-full"></Password>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col">
          <label for="usu_dir">Dirección</label>
          <InputText id="usu_dir" v-model.trim="user.usu_dir" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_dir}" />
        </div>
        <div class="field col">
          <div class="field col">
            <label for="usu_rgst">Fecha y Hora de Registro</label>
            <InputText id="usu_dir" readonly v-model.trim="user.usu_rgst" required="true" autofocus />
          </div>
        </div>
        <div class="field col">
          <label for="usu_estado">Estado</label>
          <Dropdown id="usu_estado" v-model="user.usu_estado" :options="estados" optionLabel="label" optionValue="value" placeholder="Seleciona Rol">      
          </Dropdown>
        </div>
      </div>       
      <div class="formgrid grid">          
        <div class="field col">
          <label for="tipousuario.tipo_nom" class="mb-3">Rol</label>
          <Dropdown id="tipousuario.tipo_nom" disabled v-model="user.tipousuario_id" :options="tipousuarios" optionLabel="tipo_nom" optionValue="id" placeholder="Seleciona Rol">      
          </Dropdown>
        </div>               
      </div>      
      <template #footer>
          <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
          <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarUsers" />
      </template>
    </Dialog>     
  </div>
</template>

<script>

import { FilterMatchMode } from 'primevue/api';
import * as userService from '@/services/user.service'
import * as tipousuarioService from '@/services/tipousuario.service'
import * as alumnoService from '@/services/alumno.service'
import * as profesorService from '@/services/profesor.service'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  data() {
    return {    
      alumno: null,
      profesor: null,
      users: null,
      selectedUsers: null,
      filters: {},
      Dialog: false,
      user: {},    
      tipousuarios: {},
      alumnos: {},
      estadoedicion: false,
      estados: [
          {label: "Activo", value: 1 },
          {label: "Inactivo", value: 0}
      ],
      date: '',
      time: ''
    }
  },
  created() {
      this.initFilters();
  },
  mounted() {
    this.listaUser();
    this.printDate();
    this.printTime();
  },
  methods: {      
    async listaUser() {
      const {data} = await userService.listarUsuarios();
      this.users = data;
      const tipo = await tipousuarioService.listarTiposuarios();
      this.tipousuarios = tipo.data;
      const alu = await alumnoService.listarAlumnos();
      this.alumnos = alu.data.data;
      const prof = await profesorService.listarProfesores();
      this.profesores = prof.data.data;
    },
    abrirDialog() {
      this.Dialog = true;
    },
    cerrarDialog() {
      this.Dialog = false;
      this.user = {};
    },
    printDate() {
      const date = new Date().toLocaleDateString();
      this.date = date;
    },
    printTime() {
      const time = new Date().toLocaleTimeString();
      this.time = time;
    },
    async guardarUsers() {
      let datos;
      if (this.estadoedicion) {
        datos = await userService.modificarUsuarios(this.user.id, this.user);
        this.user = datos;
      }
      else {
        datos = await userService.guardarUsuarios(this.user);
        this.user = datos;
      }        
      if (!datos.data.error) {
        this.cerrarDialog();
        this.listaUser();
        this.estadoedicion = false;
        this.user = {};
      }
    },
    editarUsers(data) {
      this.user = data;
      this.user.usu_rgst = this.date +' '+ this.time;
      this.Dialog = true;
      this.estadoedicion = true;
    },
    eliminarUsers(data) {
        this.$confirm.require({
        message: 'Esta seguro que desea eliminar ',
        header: 'Eliminar',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: async () => {
        data = await userService.eliminarUsuarios(data.id)
        this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
        this.listaUser();
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
    },
    //reporte en pdf
    async exportToPDF() {
            const doc = new jsPDF();
            const logoBase64 = await fetch('/images/logo-garrido.base64')
                .then(response => response.text());
            doc.addImage(logoBase64, 'PNG', 10, 10, 30, 20);
            // Título y sub titulo
            doc.setFontSize(8);
            doc.setFont('Helvetica', 'normal');
            doc.text('Institucion Educativa Particular', 85, 15);
            doc.setFontSize(8);
            doc.setFont('Helvetica', 'normal');
            doc.text('Andres Fernandez Garrido', 87, 20);
            doc.setFontSize(14);
            doc.setFont('Helvetica', 'bold');
            doc.text('Lista de Usuarios', 83, 28);
            // Cabeceras y orden de las columnas
            const headers = [['Nombre', 'DNI', 'Telefono', 'Email', 'Usuario', 'Rol', 'Registrado', 'Estado']];
            // Prepara los datos para la exportación
            const dataToExport = this.users.map(row => [
                row.name || '',
                row.usu_dni || '',
                row.usu_telf || '',
                row.email || '',
                row.usu_user || '',
                row.tipousuario.tipo_nom || '',
                row.usu_rgst || '',
                row.usu_estado === 1 ? 'Activo' : 'Inactivo'
            ]);
            // Generando la tabla en el PDF
            doc.autoTable({
                head: headers,
                body: dataToExport,
                startY: 40 // Ajusta la posición de inicio de la tabla según la altura del título y el logo
            });
            // Descarga archivo PDF
            doc.save('usuarios.pdf');
        },
        //reporte en excel
        exportToExcel() {
            // Define las cabeceras personalizadas y el orden de las columnas
            const headers = ['Nombre', 'DNI', 'Telefono', 'Email', 'Usuario', 'Rol', 'Registrado', 'Estado'];            
            // Prepara los datos para la exportación
            const dataToExport = this.users.map(row => ({            
                'Nombre': row.name || '',
                'DNI': row.usu_dni || '',
                'Telefono': row.usu_telf || '',
                'Email': row.email || '',
                'Usuario': row.usu_user || '',
                'Rol': row.tipousuario.tipo_nom || '',
                'Registrado': row.usu_rgst || '',
                'Estado': row.usu_estado === 1 ? 'Activo' : 'Inactivo'
            }));
            // Crea una hoja de cálculo
            const worksheet = XLSX.utils.json_to_sheet(dataToExport, { header: headers });            
            // Crea un libro de trabajo
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
            // Convierte el libro de trabajo a un archivo Excel y descarga
            XLSX.writeFile(workbook, "usuarios.xlsx");
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
.p-button {
    margin-right: .5rem;
}

.p-buttonset {
    .p-button {
        margin-right: 0;
    }
}

.sizes {
    .button {
        margin-bottom: .5rem;
        display: block;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

@media screen and (max-width: 640px) {
    .p-button {
        margin-bottom: .5rem;

        &:not(.p-button-icon-only) {
            display: flex;
            width: 100%;
        }
    }

    .p-buttonset {
        .p-button {
            margin-bottom: 0;
        }
    }
}
</style>