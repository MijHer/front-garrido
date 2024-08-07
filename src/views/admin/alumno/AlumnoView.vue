<template>
  <div class="card">
    <Toast />
      <ConfirmDialog></ConfirmDialog>
    <Toolbar class="mb-4">
      <template #start>
          <Button label="Registar alumno" icon="pi pi-plus" class="p-button-success mr-2" @click="abrirDialog" />
          <!-- <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" /> -->
      </template>
      <template #end>
        <Button label="Excel" icon="pi pi-upload" class="p-button-primary mr-2" @click="exportToExcel($event)"  />
				<Button label="PDF" icon="pi pi-upload" class="p-button-help" @click="exportToPDF($event)"  />
      </template>
  </Toolbar>
  <!-- DIALOG PARA REGISTRAR NUEVO ALUMNO -->
  <Dialog v-model:visible="dialog" :style="{width: '1000px'}" header="Nuevo Alumno" :modal="true" class="p-fluid">
    <h3>DATOS DEL ALUMNO</h3>
    <div class="formgrid grid">
      <div class="field col" style="margin-top: 25px;">            
          <img src="../../../../public/images/logo-usuario.png" alt="Usuario" style="width: 200px; display:block; margin:auto;">
          <p style="font-weight: bold; text-align:center; margin-top: 10px;" v-text="users.name"></p>
      </div>
      <div class="field col">
        <div class="field col">
            <label for="alu_nom">Nombre</label>
            <InputText id="alu_nom" v-model="alumno.alu_nom" required="true" rows="3" cols="20" />
        </div>
        <div class="field col">
            <label for="alu_app">A. Paterno</label>
            <InputText id="alu_app" v-model="alumno.alu_app" required="true" rows="3" cols="20" />
        </div>
        <div class="field col">
            <label for="alu_apm">A. Materno</label>
            <InputText id="alu_apm" v-model="alumno.alu_apm" required="true" rows="3" cols="20" />
        </div>
      </div>
    </div>    
    <div class="formgrid grid">
      <div class="field col">            
          <label for="alu_fnac">Fecha de Nacimiento</label>
          <Calendar id="alu_fnac" v-model="alumno.alu_fnac" :showIcon="true"/>            
      </div>      
      <div class="field col">
        <label for="alu_tipo_doc">Tipo de Documento</label>
        <Dropdown id="alu_tipo_doc" v-model="alumno.alu_tipo_doc" :options="statuses1" optionLabel="label" optionValue="value" placeholder="Selecciona Tipo">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
            </div>
            <span v-else>
              {{slotProps.placeholder}}
            </span>
          </template>
        </Dropdown>
      </div>
      <div class="field col">
        <label for="alu_nmr_doc">Numero de Documento</label>
        <InputNumber id="alu_nmr_doc" v-model="alumno.alu_nmr_doc" integeronly />
      </div>
    </div>
    <div class="formgrid grid">            
      <div class="field col">
        <label for="alu_pais" class="mb-3">Pais</label>
        <Dropdown id="alu_pais" v-model="alumno.alu_pais" :options="statuses2" optionLabel="label" optionValue="value" placeholder="Selecciona Pais">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
            </div>
            <span v-else>
              {{slotProps.placeholder}}
            </span>
          </template>
        </Dropdown>
      </div>
      <div class="field col">
        <label for="alu_departamento" class="mb-3">Departamento</label>
        <Dropdown id="alu_departamento" v-model="alumno.alu_departamento" :options="statuses3" optionLabel="label" optionValue="value" placeholder="Selecciona Departamento">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
            </div>
            <span v-else>
              {{slotProps.placeholder}}
            </span>
          </template>
        </Dropdown>
      </div>
    </div>
    <div class="formgrid grid">      
      <div class="field col">
        <label for="alu_provincia" class="mb-3">Provincia</label>
        <Dropdown id="alu_provincia" v-model="alumno.alu_provincia" :options="statuses4" optionLabel="label" optionValue="value" placeholder="Selecciona Provincia">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
            </div>
            <span v-else>
              {{slotProps.placeholder}}
            </span>
          </template>
        </Dropdown>
      </div>
      <div class="field col">
        <label for="alu_distrito" class="mb-3">Distrito</label>
        <Dropdown id="alu_distrito" v-model="alumno.alu_distrito" :options="statuses5" optionLabel="label" optionValue="value" placeholder="Selecciona Distrito">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
            </div>
            <span v-else>
              {{slotProps.placeholder}}
            </span>
          </template>
        </Dropdown>
      </div>
    </div>    
    <div class="formgrid grid">      
      <div class="field col">
        <label for="alu_sexo">Sexo</label>
        <Dropdown id="alu_sexo" v-model="alumno.alu_sexo" :options="statuses13" optionLabel="label" optionValue="value" placeholder="Selecciona Pais">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
            </div>
            <span v-else>
              {{slotProps.placeholder}}
            </span>
          </template>
        </Dropdown>
      </div>           
    </div>    
    <h3>DATOS DE LA MADRE</h3>
    <div class="formgrid grid">
      <div class="field col">
          <label for="alu_nom_madre">Nombre de la madre</label>
          <InputText id="alu_nom_madre" v-model="alumno.alu_nom_madre" required="true" rows="3" cols="20" />
      </div>
      <div class="field col">
          <label for="alu_app_madre">A. Paterno</label>
          <InputText id="alu_app_madre" v-model="alumno.alu_app_madre" required="true" rows="3" cols="20" />
      </div>
      <div class="field col">
          <label for="alu_apm_madre">A. Materno</label>
          <InputText id="alu_apm_madre" v-model="alumno.alu_apm_madre" required="true" rows="3" cols="20" />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col">
        <label for="alu_tipo_doc_madre">Tipo de Documento</label>
        <Dropdown id="alu_tipo_doc_madre" v-model="alumno.alu_tipo_doc_madre" :options="statuses7" optionLabel="label" optionValue="value" placeholder="Selecciona">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
            </div>
            <span v-else>
              {{slotProps.placeholder}}
            </span>
          </template>
        </Dropdown>
      </div>
      <div class="field col">
        <label for="alu_dni_madre">DNI</label>
        <InputNumber id="alu_dni_madre" v-model="alumno.alu_dni_madre" />
      </div> 
      <div class="field col">
        <label for="alu_civil_madre">Estado civil</label>
        <Dropdown id="alu_civil_madre" v-model="alumno.alu_civil_madre" :options="statuses8" optionLabel="label" optionValue="value" placeholder="Selecciona">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
            </div>
            <span v-else>
              {{slotProps.placeholder}}
            </span>
          </template>
        </Dropdown>
      </div>      
    </div>        
    <h3>DATOS DEL PADRE</h3>
    <div class="formgrid grid">
      <div class="field col">
          <label for="alu_nom_padre">Nombre del padre</label>
          <InputText id="alu_nom_padre" v-model="alumno.alu_nom_padre" required="true" rows="3" cols="20" />
      </div>
      <div class="field col">
          <label for="alu_app_padre">A. Paterno</label>
          <InputText id="alu_app_padre" v-model="alumno.alu_app_padre" required="true" rows="3" cols="20" />
      </div>
      <div class="field col">
          <label for="alu_apm_padre">A. Materno</label>
          <InputText id="alu_apm_padre" v-model="alumno.alu_apm_padre" required="true" rows="3" cols="20" />
      </div>
    </div>
    <div class="formgrid grid">
      <div class="field col">
        <label for="alu_tipo_doc_padre">Tipo de Documento</label>
        <Dropdown id="alu_tipo_doc_padre" v-model="alumno.alu_tipo_doc_padre" :options="statuses10" optionLabel="label" optionValue="value" placeholder="Selecciona">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
            </div>
            <span v-else>
              {{slotProps.placeholder}}
            </span>
          </template>
        </Dropdown>
      </div>
      <div class="field col">
        <label for="alu_dni_padre">DNI</label>
        <InputNumber id="alu_dni_padre" v-model="alumno.alu_dni_padre" />
      </div>
      <div class="field col">
        <label for="alu_civil_padre">Estado civil</label>
        <Dropdown id="alu_civil_padre" v-model="alumno.alu_civil_padre" :options="statuses11" optionLabel="label" optionValue="value" placeholder="Selecciona">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.value">{{slotProps.value.label}}</span>
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <span :class="'product-badge status-' +slotProps.value.toLowerCase()">{{slotProps.value}}</span>
            </div>
            <span v-else>
              {{slotProps.placeholder}}
            </span>
          </template>
        </Dropdown>
      </div>      
    </div>  
    <h3>APODERADO</h3>
    <div class="field">
        <label for="apoderado_id" class="mb-3"></label>
        <Dropdown id="apoderado_id" v-model="alumno.apoderado_id" :options="apoderados" optionLabel="apo_nom" optionValue="id" placeholder="Selecione Apoderado">                        
        </Dropdown>
    </div>    
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarDialog"/>
      <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarAlumnos" />
    </template>
  </Dialog>
  <DataTable ref="dt" :value="alumnos" v-model:selection="selectedAlumnos" dataKey="id" 
      :paginator="true" :rows="10" :filters="filters"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} Alumnos" responsiveLayout="scroll" class="text-center">
      <template #header>
          <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center">Lista de Alumnos</h5>
            <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global'].value" placeholder="Buscar..." />
            </span>
          </div>
      </template>
      <Column selectionMode="multiple" style="width: 3rem;" :exportable="false"></Column>
      <Column field="alu_nom" header="Nombres" :sortable="true" style="min-width:10rem"></Column>
      <Column field="alu_app" header="A. Paterno" :sortable="true" style="min-width:10rem"></Column>
      <Column field="alu_apm" header="A. Materno" :sortable="true" style="min-width:10rem"></Column>
      <Column field="alu_nmr_doc" header="DNI" :sortable="true" style="min-width:10rem"></Column>
      <Column field="apoderado.apo_nom" header="Apoderado" :sortable="true" style="min-width:10rem"></Column>
      <Column field="alu_distrito" header="Distrito" :sortable="true" style="min-width:10rem"></Column>
      <Column :exportable="false" header="Acciones" style="min-width:16rem;">
        <template #body="slotProps">
            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="editarAlumnos(slotProps.data)" />
            <Button icon="pi pi-file" class="p-button-rounded p-button-warning mr-2" v-if="slotProps.data.user" @click="verAlumnos(slotProps.data)" />
            <Button icon="pi pi-user" class="p-button-rounded p-button-info mr-2" v-else @click="asignarUsers(slotProps.data)" />
            <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteProduct(slotProps.data)" />
        </template>
      </Column>
  </DataTable>
  <!-- DIALOG PARA ASIGNAR UN USUARIO AL ALUMNO -->
  <Dialog v-model:visible="DialogUsers" :style="{width: '950px'}" header="Asginar usuario al alumno" :modal="true" class="p-fluid">
    <div class="formgrid grid">
        <div class="field col">
        <label for="name">Nombres</label>          
        <InputText id="name" readonly v-model.trim="user.name" required="true" autofocus :class="{'p-invalid': submitted && !user.name}" />          
        </div>
        <div class="field col">
            <label for="patermno">Apellido Paterno</label>
            <InputText id="patermno" readonly v-model="Apaterno"   required="true" autofocus  />          
        </div>
        <div class="field col">
            <label for="materno">Apellido Materno</label>
            <InputText id="materno" readonly v-model="Amaterno" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_telf}" />          
        </div>
    </div>
    <div class="formgrid grid">
        <div class="field col">
            <label for="usu_dni">DNI</label>
            <InputText id="usu_dni" readonly v-model.trim="user.usu_dni"   required="true" autofocus  />          
        </div>
        <div class="field col">
            <label for="usu_telf">Telefono</label>
            <InputText id="usu_telf" v-model.trim="user.usu_telf" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_telf}" />          
        </div>
        <div class="field col">
            <label for="email">Correo</label>
            <InputText id="email" v-model.trim="user.email" required="true" autofocus :class="{'p-invalid': submitted && !user.email}" />
        </div>
    </div>
    <div class="formgrid grid">                      
        <div class="field col">
        <label for="usu_user">Usuario</label>
        <InputText id="usu_user" v-model.trim="user.usu_user" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_user}" />          
        </div>
        <div class="field col">
            <label for="password">Contraseña</label>
            <!-- <InputText id="password" v-model.trim="user.password" required="true" autofocus :class="{'p-invalid': submitted && !user.password}" /> -->
            <Password id="password" v-model.trim="user.password" placeholder="Contraseña" :toggleMask="true" class="w-full" inputClass="w-full" ></Password>
        </div>
        <div class="field col">
            <label for="usu_dir">Dirección</label>
            <InputText id="usu_dir" v-model.trim="user.usu_dir" required="true" autofocus :class="{'p-invalid': submitted && !user.usu_dir}" />
        </div>
    </div>
    <div class="formgrid grid">                
        <div class="field col">                    
            <label for="usu_rgst">Fecha y Hora de Registro</label>
            <!-- <InputText id="usu_dir" v-model.trim="user.usu_rgst" required="true" autofocus /> -->          
            <Calendar inputId="usu_rgst" v-model="user.usu_rgst" :showTime="true" :showSeconds="true" :showIcon="true" />                
        </div>
        <div class="field col">
          <label for="usu_estado">Estado</label>
          <Dropdown id="usu_estado" v-model="user.usu_estado" :options="estados" optionLabel="label" optionValue="value" placeholder="Seleciona Rol">      
          </Dropdown>
        </div>
        <div class="field col">
            <label for="tipousuario.tipo_nom" >Rol</label>
            <Dropdown id="tipousuario.tipo_nom" v-model="user.tipousuario_id" :options="tipousuarios" optionLabel="tipo_nom" optionValue="id" placeholder="Seleciona Rol">      
            </Dropdown>
        </div> 
    </div>
    {{user}} <br> <br>
    <template #footer>
        <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarUsers"/>
        <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="guardarUsers" />
    </template>
  </Dialog>
  <!-- DIALOG PARA VISUALIZAR LA INFORMACION DEL ALUMNO -->
  <Dialog v-model:visible="verDialog" :style="{width: '1000px'}" header="Datos del Alumno" :modal="true" class="p-fluid">
    <div class="card">
      <div class="formgrid grid">  
        <div class="field col">
          <label for="" rows="3" cols="20">{{ alumno.alu_foto}}</label>
        </div>      
        <div class="field col">
          <div class="field col">
            <label for="alu_nom">Nombre: </label>
            <label style="min-width:16rem"> {{ alumno.alu_nom }} </label>
          </div>
          <div class="field col">
            <label for="alu_app">A. Paterno:</label>
            <label style="min-width:16rem">{{ alumno.alu_app }}</label>
          </div>
          <div class="field col">
            <label for="alu_apm">A. Materno:</label>
            <label style="min-width:16rem">{{ alumno.alu_apm }}</label>          
          </div>
          <div class="field col">
            <label for="alu_fnac">Fecha de Nacimiento:</label>
            <label style="min-width:16rem">{{ alumno.alu_fnac }}</label>          
          </div>
          <div class="field col">
            <label for="alu_nmr_doc">Número de DNI:</label>
            <label style="min-width:16rem">{{ alumno.alu_nmr_doc }}</label>          
          </div>
          <div class="field col">
            <label for="alu_grado">Grado Actual:</label>
            <label style="min-width:16rem">{{ alumno.alu_grado }}</label>          
          </div>
          <div class="field col">
            <label for="alu_pais">Pais:</label>
            <label style="min-width:16rem">{{ alumno.alu_pais }}</label>          
          </div>
        </div>        
      </div>
      <div class="formgrid grid">
        <div class="field col">
          <label for="alu_departamento">Departamento:</label>
          <p style="min-width:16rem">{{ alumno.alu_departamento }}</p>
        </div>
        <div class="field col">
          <label for="alu_provincia">Provincia:</label>
          <p style="min-width:16rem">{{ alumno.alu_provincia }}</p>
        </div>
        <div class="field col">
          <label for="alu_distrito">Distrito:</label>
          <p style="min-width:16rem">{{ alumno.alu_distrito }}</p>
        </div>
      </div>
      <div class="formgrid grid">
        <div class="field col">
          <label for="alu_tipo_discapacidad">Discapacidad:</label>
          <p style="min-width:16rem">{{ alumno.alu_tipo_discapacidad }}</p>
        </div>
        <div class="field col">
          <label for="alu_nmr_hermanos">Número de hermanos:</label>
          <p style="min-width:16rem">{{ alumno.alu_nmr_hermanos }}</p>
        </div>
        <div class="field col">
          <label for="alu_lugar_ocupa">Lugar que ocupa:</label>
          <p style="min-width:16rem">{{ alumno.alu_lugar_ocupa }}</p>
        </div>                
      </div>
      <div class="formgrid grid">
        <div class="field col">
          <label for="alu_sexo">Sexo:</label>
          <p style="min-width:16rem">{{ alumno.alu_sexo }}</p>
        </div>
        <div class="field col">
          <label for="alu_lengua_materna ">Lengua Materna:</label>
          <p style="min-width:16rem">{{ alumno.alu_lengua_materna }}</p>
        </div>
        <div class="field col">
          <label for="alu_tipo_sangre ">Tipo de sangre:</label>
          <p style="min-width:16rem">{{ alumno.alu_tipo_sangre }}</p>
        </div>
      </div>
      <div class="formgrid grid">        
        <div class="field col">
          <label for="alu_religion ">Religión:</label>
          <p style="min-width:16rem">{{ alumno.alu_religion }}</p>
        </div>
        <div class="field col">
          <label for="alumno_rol">Rol</label>
          <p style="min-width:16rem">{{ alumno.user.tipousuario.tipo_nom }}</p>
        </div>
        <div class="field col">
        </div>
      </div>
      <h5><b>Datos De La Madre</b></h5>
       <div class="formgrid grid">
          <div class="field col">
            <label for="alu_nom_madre">Nombre:</label>
            <p style="min-width:16rem">{{ alumno.alu_nom_madre }}</p>
          </div>
          <div class="field col">
            <label for="alu_app_padre ">A. Paterno:</label>
            <p style="min-width:16rem">{{ alumno.alu_app_madre }}</p>
          </div>
          <div class="field col">
            <label for="alu_apm_madre ">A. Materno:</label>
            <p style="min-width:16rem">{{ alumno.alu_apm_madre }}</p>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col">
            <label for="alu_dni_madre">Número de DNI:</label>
            <p style="min-width:16rem">{{ alumno.alu_dni_madre }}</p>
          </div>
          <div class="field col">
            <label for="alu_civil_madre ">Estado civil:</label>
            <p style="min-width:16rem">{{ alumno.alu_civil_madre }}</p>
          </div>
          <div class="field col">
            <label for="alu_vive_madre ">Vive:</label>
            <p style="min-width:16rem">{{ alumno.alu_vive_madre }}</p>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col">
            <label for="alu_sexo">Fecha de nacimiento:</label>
            <p style="min-width:16rem">{{ alumno.alu_fnca_madre }}</p>
          </div>
          <div class="field col">
            <label for="alu_lengua_materna ">Vive con la madre:</label>
            <p style="min-width:16rem">{{ alumno.alu_vive_con_madre }}</p>
          </div>
          <div class="field col">
            <label for="alu_tipo_sangre ">Grado de instrucción:</label>
            <p style="min-width:16rem">{{ alumno.alu_grado_inst_madre }}</p>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col">
            <label for="alu_ocupacion_madre">Ocupación:</label>
            <p style="min-width:16rem">{{ alumno.alu_ocupacion_madre }}</p>
          </div>         
          <div class="field col">
            <label for="alu_religion_madre ">Religión:</label>
            <p style="min-width:16rem">{{ alumno.alu_religion_madre }}</p>
          </div>
          <div class="field col">            
          </div>
        </div>
        <h5><b>Datos Del padre</b></h5>
       <div class="formgrid grid">
          <div class="field col">
            <label for="alu_nom_padre">Nombre:</label>
            <p style="min-width:16rem">{{ alumno.alu_nom_padre }}</p>
          </div>
          <div class="field col">
            <label for="alu_app_padre ">A. Paterno:</label>
            <p style="min-width:16rem">{{ alumno.alu_app_padre }}</p>
          </div>
          <div class="field col">
            <label for="alu_apm_padre ">A. Materno:</label>
            <p style="min-width:16rem">{{ alumno.alu_apm_padre }}</p>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col">
            <label for="alu_dni_padre">Número de DNI:</label>
            <p style="min-width:16rem">{{ alumno.alu_dni_padre }}</p>
          </div>
          <div class="field col">
            <label for="alu_civil_padre ">Estado civil:</label>
            <p style="min-width:16rem">{{ alumno.alu_civil_padre }}</p>
          </div>
          <div class="field col">
            <label for="alu_vive_padre ">Vive:</label>
            <p style="min-width:16rem">{{ alumno.alu_vive_padre }}</p>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col">
            <label for="alu_fnca_padre">Fecha de nacimiento:</label>
            <p style="min-width:16rem">{{ alumno.alu_fnca_padre }}</p>
          </div>
          <div class="field col">
            <label for="alu_vive_con_este_padre ">Vive con el padre:</label>
            <p style="min-width:16rem">{{ alumno.alu_vive_con_padre }}</p>
          </div>
          <div class="field col">
            <label for="alu_grado_inst_padre ">Grado de instrucción:</label>
            <p style="min-width:16rem">{{ alumno.alu_grado_inst_padre }}</p>
          </div>
        </div>
        <div class="formgrid grid">
          <div class="field col">
            <label for="alu_ocupacion_padre">Ocupación:</label>
            <p style="min-width:16rem">{{ alumno.alu_ocupacion_padre }}</p>
          </div>         
          <div class="field col">
            <label for="alu_religion_padre ">Religión:</label>
            <p style="min-width:16rem">{{ alumno.alu_religion_padre }}</p>
          </div>
          <div class="field col">            
          </div>
        </div>
        <h5><b>Apoderado</b></h5>
        <div class="field col">          
          <label for="alumno.apo_nom">Nombre y Apellido:</label>
          <p style="min-width:16rem">{{ alumno.apoderado.apo_nom +" "+ alumno.apoderado.apo_app +" "+ alumno.apoderado.apo_apm}}</p>
        </div>
    </div>
    <template #footer>
      <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="cerrarVerDialog()"/>
      <Button label="Imprimir" icon="pi pi-check" class="p-button-text" @click="imprimirFicha()" />
    </template>
  </Dialog>
  </div>
</template>
<script>

import { FilterMatchMode } from 'primevue/api';
import * as alumnoService from '@/services/alumno.service'
import * as apoderadoService from '@/services/apoderado.service'
import * as userService from '@/services/user.service'
import * as tipousuarioService from '@/services/tipousuario.service'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  data() {
    return {
      alumnos: null,
      selectedAlumnos: null,
      alumno: {},
      filters: {},
      dialog: null,
      statuses1: [
        {label: 'DNI', value: 'DNI'},
        {label: 'CARNET DE EXTRANJERIA', value: 'CARNET DE EXTRANJERIA'},
      ],
      statuses2: [
        {label: 'ARGENTINA', value: 'Argentina'}, {label: 'BOLIVIA', value: 'Bolivia'}, {label: 'BRASIL', value: 'Brasil'},
        {label: 'CHILE', value: 'Chile'}, {label: 'COLOMBIA', value: 'Colombia'}, {label: 'ECUADOR', value: 'Ecuador'},
        {label: 'PARAGUAY', value: 'Paraguay'}, {label: 'PERU', value: 'Peru'}, {label: 'URUGUAY', value: 'Uruguay'},
        {label: 'VENEZUELA', value: 'Venezuela'},
      ],
      statuses3: [
        {label: 'AMAZONAS', value: 'Amazonas'}, {label: 'ANCASH', value: 'Ancash'}, {label: 'APURIMAC', value: 'Apurimac'},
        {label: 'AREQUIPA', value: 'Arequipa'}, {label: 'AYACUCHO', value: 'Ayacucho'}, {label: 'CAJAMARCA', value: 'Cajamarca'},
        {label: 'CALLAO', value: 'Callao'}, {label: 'CUZCO', value: 'Cuzco'}, {label: 'HUANCAVELICA', value: 'Huancavelica'},
        {label: 'HUANUCO', value: 'Huanuco'}, {label: 'ICA', value: 'Ica'}, {label: 'JUNIN', value: 'Junin'},
        {label: 'LA LIBERTAD', value: 'La Libertad'}, {label: 'LAMBAYEQUE', value: 'Lambayeque'}, {label: 'LIMA', value: 'Lima'},
        {label: 'LORETO', value: 'Loreto'}, {label: 'MADRE DE DIOS', value: 'Madre de Dios'}, {label: 'MOQUEGUA', value: 'moquegua'},
        {label: 'PASCO', value: 'Pasco'}, {label: 'PIURA', value: 'Piura'}, {label: 'PUNO', value: 'Puno'},
        {label: 'SAN MARTIN', value: 'San Martin'}, {label: 'TACNA', value: 'Tacna'}, {label: 'TUMBES', value: 'Tumbes'},
        {label: 'UCAYALI', value: 'Ucayali'},        
      ],
      statuses4: [
        {label: 'Chachapoyas', value: 'Chachapoyas'}, {label: 'Bagua', value: 'Bagua'}, {label: 'Bongará', value: 'Bongará'}, {label: 'Condorcanqui', value: 'Condorcanqui'},
        {label: 'Luya', value: 'Luya'}, {label: 'Rodríguez', value: 'Rodríguez'}, {label: 'Utcubamba', value: 'Utcubamba'}, {label: 'Huaraz', value: 'Huaraz'},
        {label: 'Aija', value: 'Aija'}, {label: 'Antonio Raymondi', value: 'Antonio Raymondi'}, {label: 'Asunción', value: 'Asunción'}, {label: 'Bolognesi', value: 'Bolognesi'},
        {label: 'Carhuaz', value: 'Carhuaz'}, {label: 'Carlos Fermín Fitzcarrald', value: 'Carlos Fermín Fitzcarrald'}, {label: 'Casma', value: 'Casma'},
        {label: 'Corongo', value: 'Corongo'}, {label: 'Huari', value: 'Huari'}, {label: 'Huarmey', value: 'Huarmey'}, {label: 'Huaylas', value: 'Huaylas'},
        {label: 'Mariscal Luzuriaga', value: 'Mariscal Luzuriaga'}, {label: 'Ocros', value: 'Ocros'}, {label: 'Pallasca', value: 'Pallasca'},
        {label: 'Pomabamba', value: 'Pomabamba'}, {label: 'Recuay', value: 'Recuay'}, {label: 'Santa', value: 'Santa'}, {label: 'Sihuas', value: 'Sihuas'},
        {label: 'Yungay', value: 'Yungay'}, {label: 'Abancay', value: 'Abancay'}, {label: 'Andahuaylas', value: 'Andahuaylas'}, {label: 'Antabamba', value: 'Antabamba'},
        {label: 'Aymaraes', value: 'Aymaraes'}, {label: 'Cotabambas', value: 'Cotabambas'}, {label: 'Chicheros', value: 'Chicheros'}, {label: 'Grau', value: 'Grau'}, {label: 'Camaná', value: 'Camaná'},
        {label: 'Caraveli', value: 'Caraveli'}, {label: 'Castilla', value: 'Castilla'}, {label: 'Caylloma', value: 'Caylloma'}, {label: 'Condesuyos', value: 'Condesuyos'}, {label: 'Islay', value: 'Islay'},
        {label: 'La Unión', value: 'La Unión'}, {label: 'Huamanga', value: 'Huamanga'}, {label: 'Cangallo', value: 'Cangallo'}, {label: 'Huancasancos', value: 'Huancasancos'}, {label: 'Huanta', value: 'Huanta'},
        {label: 'La Mar', value: 'La Mar'}, {label: 'Lucanas', value: 'Lucanas'}, {label: 'Parinacochas', value: 'Parinacochas'}, {label: 'Páucar del Sara Sara', value: 'Páucar del Sara Sara'}, {label: 'Sucre', value: 'Sucre'},
        {label: 'Víctor Fajardo', value: 'Víctor Fajardo'}, {label: 'Vilcashuaman', value: 'Vilcashuaman'}, {label: 'Cajabamba', value: 'Cajabamba'}, {label: 'Celendín', value: 'Celendín'}, {label: 'Chota', value: 'Chota'},
        {label: 'Contumazá', value: 'Contumazá'}, {label: 'Cutervo', value: 'Cutervo'}, {label: 'Hualgayoc', value: 'Hualgayoc'}, {label: 'Jaén', value: 'Jaén'}, {label: 'San Ignacio', value: 'San Ignacio'},
        {label: 'San Marcos', value: 'San Marcos'}, {label: 'San Miguel', value: 'San Miguel'}, {label: 'San Pablo', value: 'San Pablo'}, {label: 'Santa Cruz', value: 'Santa Cruz'}, {label: 'Acomayo', value: 'Acomayo'},
        {label: 'Anta', value: 'Anta'}, {label: 'Calca', value: 'Calca'}, {label: 'Canas', value: 'Canas'}, {label: 'Canchis', value: 'Canchis'}, {label: 'Chumbivilcas', value: 'Chumbivilcas'},
        {label: 'Espinar', value: 'Espinar'}, {label: 'La Convención', value: 'La Convención'}, {label: 'Paruro', value: 'Paruro'}, {label: 'Paucartambo', value: 'Paucartambo'}, {label: 'Quispicanchi', value: 'Quispicanchi'},
        {label: 'Urubamba', value: 'Urubamba'}, {label: 'Acobamba', value: 'Acobamba'}, {label: 'Angaraes', value: 'Angaraes'}, {label: 'Castrovirreyna', value: 'Castrovirreyna'}, {label: 'Churcampa', value: 'Churcampa'},
        {label: 'Huaytará', value: 'Huaytará'}, {label: 'Tayacaja', value: 'Tayacaja'}, {label: 'Ambo', value: 'Ambo'}, {label: 'Dos de Mayo', value: 'Dos de Mayo'}, {label: 'Huacaybamba', value: 'Huacaybamba'},
        {label: 'Huamalíes', value: 'Huamalíes'}, {label: 'Leoncio Prado', value: 'Leoncio Prado'}, {label: 'Marañón', value: 'Marañón'}, {label: 'Pachitea', value: 'Pachitea'}, {label: 'Puerto Inca', value: 'Puerto Inca'},
        {label: 'Lauricocha', value: 'Lauricocha'}, {label: 'Yarowilca', value: 'Yarowilca'}, {label: 'Chincha', value: 'Chincha'}, {label: 'Nazca', value: 'Nazca'}, {label: 'Palpa', value: 'Palpa'},
        {label: 'Pisco', value: 'Pisco'}, {label: 'Huancayo', value: 'Huancayo'}, {label: 'Concepción', value: 'Concepción'}, {label: 'Chanchamayo', value: 'Chanchamayo'}, {label: 'Jauja', value: 'Jauja'},
        {label: 'Satipo', value: 'Satipo'}, {label: 'Tarma', value: 'Tarma'}, {label: 'Yauli', value: 'Yauli'}, {label: 'Chupaca', value: 'Chupaca'}, {label: 'Trujillo', value: 'Trujillo'},
        {label: 'Ascope', value: 'Ascope'}, {label: 'Bolívar', value: 'Bolívar'}, {label: 'Chepén', value: 'Chepén'}, {label: 'Julcán', value: 'Julcán'}, {label: 'Otuzco', value: 'Otuzco'},
        {label: 'Pacasmayo', value: 'Pacasmayo'}, {label: 'Pataz Sanchez Carrión', value: 'Pataz Sanchez Carrión'}, {label: 'Santiago de Chuco', value: 'Santiago de Chuco'}, {label: 'Gran Chimú', value: 'Gran Chimú'}, 
        {label: 'Virú', value: 'Virú'}, {label: 'Chiclayo', value: 'Chiclayo'}, {label: 'Ferreñafe', value: 'Ferreñafe'}, {label: 'Barranca', value: 'Barranca'}, {label: 'Cajatambo', value: 'Cajatambo'}, {label: 'Canta', value: 'Canta'},
        {label: 'Cañete', value: 'Cañete'}, {label: 'Huaral', value: 'Huaral'}, {label: 'Huarochirí', value: 'Huarochirí'}, {label: 'Huaura', value: 'Huaura'}, {label: 'Oyón', value: 'Oyón'},
        {label: 'Yauyos', value: 'Yauyos'}, {label: 'Maynas', value: 'Maynas'}, {label: 'Alto Amazonas', value: 'Alto Amazonas'}, {label: 'Mariscal Ramón Castilla', value: 'Mariscal Ramón Castilla'}, {label: 'Requena', value: 'Requena'},
        {label: 'Ucayali', value: 'Ucayali'}, {label: 'Datem de Marañón', value: 'Datem de Marañón'}, {label: 'Putumayo', value: 'Putumayo'}, {label: 'Tambopata', value: 'Tambopata'}, {label: 'Manu', value: 'Manu'},
        {label: 'Tahuamanu', value: 'Tahuamanu'}, {label: 'Mariscal Nieto', value: 'Mariscal Nieto'}, {label: 'General Sánchez Cerro', value: 'General Sánchez Cerro'}, {label: 'Ilo', value: 'Ilo'}, {label: 'Daniel Alcides Carrión', value: 'Daniel Alcides Carrión'}, 
        {label: 'Oxapampa', value: 'Oxapampa'}, {label: 'Ayabaca', value: 'Ayabaca'}, {label: 'Huancabamba', value: 'Huancabamba'}, {label: 'Morropón', value: 'Morropón'}, {label: 'Paita', value: 'Paita'}, 
        {label: 'Sullana', value: 'Sullana'}, {label: 'Talara', value: 'Talara'}, {label: 'Sechura', value: 'Sechura'}, {label: 'Azángaro', value: 'Azángaro'},
        {label: 'Carabaya', value: 'Carabaya'}, {label: 'Chucuito', value: 'Chucuito'}, {label: 'El Collao', value: 'El Collao'}, {label: 'Huacané', value: 'Huacané'}, 
        {label: 'Lampa', value: 'Lampa'}, {label: 'Melgar', value: 'Melgar'}, {label: 'Moho', value: 'Moho'}, {label: 'San Antonio de Putiña', value: 'San Antonio de Putiña'}, 
        {label: 'San Román', value: 'San Román'}, {label: 'Sandía', value: 'Sandía'}, {label: 'Yunguyo', value: 'Yunguyo'}, {label: 'Moyobamba', value: 'Moyobamba'}, 
        {label: 'Bellavista', value: 'Bellavista'}, {label: 'El Dorado', value: 'El Dorado'}, {label: 'Huallaga', value: 'Huallaga'}, {label: 'Lamas', value: 'Lamas'}, 
        {label: 'Mariscal Cáceres', value: 'Mariscal Cáceres'}, {label: 'Picota', value: 'Picota'}, {label: 'Rioja', value: 'Rioja'}, {label: 'San Martín', value: 'San Martín'}, 
        {label: 'Tocache', value: 'Tocache'}, {label: 'Candarave', value: 'Candarave'},
        {label: 'Jorge Basadre', value: 'Jorge Basadre'}, {label: 'Tarata', value: 'Tarata'}, {label: 'Contralmirante Villar', value: 'Contralmirante Villar'}, 
        {label: 'Zarumilla', value: 'Zarumilla'}, {label: 'Coronel Portillo', value: 'Coronel Portillo'}, 
        {label: 'Atalaya', value: 'Atalaya'}, {label: 'Padre Abad', value: 'Padre Abad'}, {label: 'Purús', value: 'Purús'}
      ],
      statuses5: [
        
        {label: 'Chachapoyas', value: 'Chachapoyas'}, {label: 'Asunción', value: 'Asunción'}, {label: 'Balsas', value: 'Balsas'}, {label: 'Cheto', value: 'Cheto'}, {label: 'Chiliquin', value: 'Chiliquin'}, {label: 'Chuquibamba', value: 'Chuquibamba'}, {label: 'Granada', value: 'Granada'}, {label: 'Huancas', value: 'Huancas'}, {label: 'La Jalca', value: 'La Jalca'}, {label: 'Leimebamba', value: 'Leimebamba'}, {label: 'Levanto', value: 'Levanto'}, {label: 'Magdalena', value: 'Magdalena'}, {label: 'Mariscal Castilla', value: 'Mariscal Castilla'}, {label: 'Molinopampa', value: 'Molinopampa'}, {label: 'Montevideo', value: 'Montevideo'}, {label: 'Olleros', value: 'Olleros'}, {label: 'Quinjalca', value: 'Quinjalca'}, {label: 'San Francisco de Daguas', value: 'San Francisco de Daguas'}, {label: 'San Isidro de Maino', value: 'San Isidro de Maino'}, {label: 'Soloco', value: 'Soloco'}, {label: 'Sonche', value: 'Sonche'}, {label: 'Bagua', value: 'Bagua'}, {label: 'Aramango', value: 'Aramango'}, {label: 'Copallin', value: 'Copallin'}, {label: 'El Parco', value: 'El Parco'}, {label: 'Imaza', value: 'Imaza'}, {label: 'La Peca', value: 'La Peca'}, {label: 'Jumbilla', value: 'Jumbilla'}, {label: 'Chisquilla', value: 'Chisquilla'}, {label: 'Churuja', value: 'Churuja'}, {label: 'Corosha', value: 'Corosha'}, {label: 'Cuispes', value: 'Cuispes'}, {label: 'Florida', value: 'Florida'},
        {label: 'Jazan', value: 'Jazan'}, {label: 'Recta', value: 'Recta'}, {label: 'San Carlos', value: 'San Carlos'}, {label: 'Shipasbamba', value: 'Shipasbamba'}, {label: 'Valera', value: 'Valera'}, {label: 'Yambrasbamba', value: 'Yambrasbamba'}, {label: 'Nieva', value: 'Nieva'}, {label: 'El Cenepa', value: 'El Cenepa'}, {label: 'Río Santiago', value: 'Río Santiago'}, {label: 'Lamud', value: 'Lamud'}, {label: 'Camporredondo', value: 'Camporredondo'}, {label: 'Cocabamba', value: 'Cocabamba'}, {label: 'Colcamar', value: 'Colcamar'}, {label: 'Conila', value: 'Conila'}, {label: 'Inguilpata', value: 'Inguilpata'}, {label: 'Longuita', value: 'Longuita'}, {label: 'Lonya Chico', value: 'Lonya Chico'}, {label: 'Luya', value: 'Luya'}, {label: 'Luya Viejo', value: 'Luya Viejo'}, {label: 'María', value: 'María'}, {label: 'Ocalli', value: 'Ocalli'}, {label: 'Ocumal', value: 'Ocumal'}, {label: 'Pisuquia', value: 'Pisuquia'}, {label: 'Providencia', value: 'Providencia'}, {label: 'San Cristóbal', value: 'San Cristóbal'}, {label: 'San Francisco de Yeso', value: 'San Francisco de Yeso'}, {label: 'San Jerónimo', value: 'San Jerónimo'}, {label: 'San Juan de Lopecancha', value: 'San Juan de Lopecancha'}, {label: 'Santa Catalina', value: 'Santa Catalina'}, {label: 'Santo Tomas', value: 'Santo Tomas'}, {label: 'Tingo', value: 'Tingo'}, {label: 'Trita', value: 'Trita'}, {label: 'San Nicolás', value: 'San Nicolás'},
        {label: 'Chirimoto', value: 'Chirimoto'}, {label: 'Cochamal', value: 'Cochamal'}, {label: 'Huambo', value: 'Huambo'}, {label: 'Limabamba', value: 'Limabamba'}, {label: 'Longar', value: 'Longar'}, {label: 'Mariscal Benavides', value: 'Mariscal Benavides'}, {label: 'Milpuc', value: 'Milpuc'}, {label: 'Omia', value: 'Omia'}, {label: 'Santa Rosa', value: 'Santa Rosa'}, {label: 'Totora', value: 'Totora'}, {label: 'Vista Alegre', value: 'Vista Alegre'}, {label: 'Bagua Grande', value: 'Bagua Grande'}, {label: 'Cajaruro', value: 'Cajaruro'}, {label: 'Cumba', value: 'Cumba'}, {label: 'El Milagro', value: 'El Milagro'}, {label: 'Jamalca', value: 'Jamalca'}, {label: 'Lonya Grande', value: 'Lonya Grande'}, {label: 'Yamon', value: 'Yamon'}, {label: 'Huaraz', value: 'Huaraz'}, {label: 'Cochabamba', value: 'Cochabamba'}, {label: 'Colcabamba', value: 'Colcabamba'}, {label: 'Huanchay', value: 'Huanchay'}, {label: 'Independencia', value: 'Independencia'}, {label: 'Jangas', value: 'Jangas'}, {label: 'La Libertad', value: 'La Libertad'}, {label: 'Olleros', value: 'Olleros'}, {label: 'Pampas Grande', value: 'Pampas Grande'},
        {label: 'Pariacoto', value: 'Pariacoto'}, {label: 'Pira', value: 'Pira'}, {label: 'Tarica', value: 'Tarica'}, {label: 'Aija', value: 'Aija'}, {label: 'Coris', value: 'Coris'}, {label: 'Huacllan', value: 'Huacllan'}, {label: 'La Merced', value: 'La Merced'}, {label: 'Succha', value: 'Succha'}, {label: 'Llamellin', value: 'Llamellin'}, {label: 'Aczo', value: 'Aczo'}, {label: 'Chaccho', value: 'Chaccho'}, {label: 'Chingas', value: 'Chingas'}, {label: 'Mirgas', value: 'Mirgas'}, {label: 'San Juan de Rontoy', value: 'San Juan de Rontoy'}, {label: 'Chacas', value: 'Chacas'}, {label: 'Acochaca', value: 'Acochaca'}, {label: 'Chiquian', value: 'Chiquian'}, {label: 'Abelardo Pardo Lezameta', value: 'Abelardo Pardo Lezameta'}, {label: 'Antonio Raymondi', value: 'Antonio Raymondi'}, {label: 'Aquia', value: 'Aquia'}, {label: 'Cajacay', value: 'Cajacay'}, {label: 'Canis', value: 'Canis'}, {label: 'Colquioc', value: 'Colquioc'}, {label: 'Huallanca', value: 'Huallanca'}, {label: 'Huasta', value: 'Huasta'}, {label: 'Huayllacayan', value: 'Huayllacayan'}, {label: 'La Primavera', value: 'La Primavera'}, {label: 'Mangas', value: 'Mangas'}, {label: 'Pacllon', value: 'Pacllon'}, {label: 'San Miguel de Corpanqui', value: 'San Miguel de Corpanqui'}, {label: 'Ticllos', value: 'Ticllos'}, {label: 'Carhuaz', value: 'Carhuaz'}, {label: 'Acopampa', value: 'Acopampa'},
        {label: 'Amashca', value: 'Amashca'}, {label: 'Anta', value: 'Anta'}, {label: 'Ataquero', value: 'Ataquero'}, {label: 'Marcara', value: 'Marcara'}, {label: 'Pariahuanca', value: 'Pariahuanca'}, {label: 'San Miguel de Aco', value: 'San Miguel de Aco'}, {label: 'Shilla', value: 'Shilla'}, {label: 'Tinco', value: 'Tinco'}, {label: 'Yungar', value: 'Yungar'}, {label: 'San Luis', value: 'San Luis'}, {label: 'San Nicolás', value: 'San Nicolás'}, {label: 'Yauya', value: 'Yauya'}, {label: 'Casma', value: 'Casma'}, {label: 'Buena Vista Alta', value: 'Buena Vista Alta'}, {label: 'Comandante Noel', value: 'Comandante Noel'}, {label: 'Yautan', value: 'Yautan'}, {label: 'Corongo', value: 'Corongo'}, {label: 'Aco', value: 'Aco'}, {label: 'Bambas', value: 'Bambas'}, {label: 'Cusca', value: 'Cusca'}, {label: 'La Pampa', value: 'La Pampa'}, {label: 'Yanac', value: 'Yanac'}, {label: 'Yupan', value: 'Yupan'}, {label: 'Huari', value: 'Huari'}, {label: 'Anra', value: 'Anra'}, {label: 'Cajay', value: 'Cajay'}, {label: 'Chavin de Huantar', value: 'Chavin de Huantar'}, {label: 'Huacachi', value: 'Huacachi'}, {label: 'Huacchis', value: 'Huacchis'}, {label: 'Huachis', value: 'Huachis'}, {label: 'Huantar', value: 'Huantar'}, {label: 'Masin', value: 'Masin'},
        {label: 'Paucas', value: 'Paucas'}, {label: 'Ponto', value: 'Ponto'}, {label: 'Rahuapampa', value: 'Rahuapampa'}, {label: 'Rapayan', value: 'Rapayan'}, {label: 'San Marcos', value: 'San Marcos'}, {label: 'San Pedro de Chana', value: 'San Pedro de Chana'}, {label: 'Uco', value: 'Uco'}, {label: 'Huarmey', value: 'Huarmey'}, {label: 'Cochapeti', value: 'Cochapeti'}, {label: 'Culebras', value: 'Culebras'}, {label: 'Huayan', value: 'Huayan'}, {label: 'Malvas', value: 'Malvas'}, {label: 'Caraz', value: 'Caraz'}, {label: 'Huallanca', value: 'Huallanca'}, {label: 'Huata', value: 'Huata'}, {label: 'Huaylas', value: 'Huaylas'}, {label: 'Mato', value: 'Mato'}, {label: 'Pamparomas', value: 'Pamparomas'}, {label: 'Pueblo Libre', value: 'Pueblo Libre'}, {label: 'Santa Cruz', value: 'Santa Cruz'}, {label: 'Santo Toribio', value: 'Santo Toribio'}, {label: 'Yuracmarca', value: 'Yuracmarca'}, {label: 'Piscobamba', value: 'Piscobamba'}, {label: 'Casca', value: 'Casca'}, {label: 'Eleazar Guzmán Barron', value: 'Eleazar Guzmán Barron'}, {label: 'Fidel Olivas Escudero', value: 'Fidel Olivas Escudero'}, {label: 'Llama', value: 'Llama'}, {label: 'Llumpa', value: 'Llumpa'}, {label: 'Lucma', value: 'Lucma'}, {label: 'Musga', value: 'Musga'}, {label: 'Ocros', value: 'Ocros'}, {label: 'Acas', value: 'Acas'}, {label: 'Cajamarquilla', value: 'Cajamarquilla'}, {label: 'Carhuapampa', value: 'Carhuapampa'}, {label: 'Cochas', value: 'Cochas'}, {label: 'Congas', value: 'Congas'},
        {label: 'Llipa', value: 'Llipa'}, {label: 'San Cristóbal de Rajan', value: 'San Cristóbal de Rajan'}, {label: 'San Pedro', value: 'San Pedro'}, {label: 'Santiago de Chilcas', value: 'Santiago de Chilcas'}, {label: 'Cabana', value: 'Cabana'}, {label: 'Bolognesi', value: 'Bolognesi'}, {label: 'Conchucos', value: 'Conchucos'}, {label: 'Huacaschuque', value: 'Huacaschuque'}, {label: 'Huandoval', value: 'Huandoval'}, {label: 'Lacabamba', value: 'Lacabamba'}, {label: 'Llapo', value: 'Llapo'}, {label: 'Pallasca', value: 'Pallasca'}, {label: 'Pampas', value: 'Pampas'}, {label: 'Santa Rosa', value: 'Santa Rosa'}, {label: 'Tauca', value: 'Tauca'}, {label: 'Pomabamba', value: 'Pomabamba'}, {label: 'Huayllan', value: 'Huayllan'}, {label: 'Parobamba', value: 'Parobamba'}, {label: 'Quinuabamba', value: 'Quinuabamba'}, {label: 'Recuay', value: 'Recuay'}, {label: 'Catac', value: 'Catac'}, {label: 'Cotaparaco', value: 'Cotaparaco'}, {label: 'Huayllapampa', value: 'Huayllapampa'}, {label: 'Llacllin', value: 'Llacllin'}, {label: 'Marca', value: 'Marca'}, {label: 'Pampas Chico', value: 'Pampas Chico'}, {label: 'Pararin', value: 'Pararin'}, {label: 'Tapacocha', value: 'Tapacocha'}, {label: 'Ticapampa', value: 'Ticapampa'}, {label: 'Chimbote', value: 'Chimbote'}, {label: 'Cáceres del Perú', value: 'Cáceres del Perú'}, {label: 'Coishco', value: 'Coishco'}, {label: 'Macate', value: 'Macate'}, {label: 'Moro', value: 'Moro'}, {label: 'Nepeña', value: 'Nepeña'},
        {label: 'Samanco', value: 'Samanco'}, {label: 'Santa', value: 'Santa'}, {label: 'Nuevo Chimbote', value: 'Nuevo Chimbote'}, {label: 'Sihuas', value: 'Sihuas'}, {label: 'Acobamba', value: 'Acobamba'}, {label: 'Alfonso Ugarte', value: 'Alfonso Ugarte'}, {label: 'Cashapampa', value: 'Cashapampa'}, {label: 'Chingalpo', value: 'Chingalpo'}, {label: 'Huayllabamba', value: 'Huayllabamba'}, {label: 'Quiches', value: 'Quiches'}, {label: 'Ragash', value: 'Ragash'}, {label: 'San Juan', value: 'San Juan'}, {label: 'Sicsibamba', value: 'Sicsibamba'}, {label: 'Yungay', value: 'Yungay'}, {label: 'Cascapara', value: 'Cascapara'}, {label: 'Mancos', value: 'Mancos'}, {label: 'Matacoto', value: 'Matacoto'}, {label: 'Quillo', value: 'Quillo'}, {label: 'Ranrahirca', value: 'Ranrahirca'}, {label: 'Shupluy', value: 'Shupluy'}, {label: 'Yanama', value: 'Yanama'}, {label: 'Abancay', value: 'Abancay'}, {label: 'Chacoche', value: 'Chacoche'}, {label: 'Circa', value: 'Circa'}, {label: 'Curahuasi', value: 'Curahuasi'}, {label: 'Huanipaca', value: 'Huanipaca'}, {label: 'Lambrama', value: 'Lambrama'}, {label: 'Pichirhua', value: 'Pichirhua'}, {label: 'San Pedro de Cachora', value: 'San Pedro de Cachora'}, {label: 'Tamburco', value: 'Tamburco'}, {label: 'Andahuaylas', value: 'Andahuaylas'}, {label: 'Andarapa', value: 'Andarapa'}, {label: 'Chiara', value: 'Chiara'},
        {label: 'Huancarama', value: 'Huancarama'}, {label: 'Huancaray', value: 'Huancaray'}, {label: 'Huayana', value: 'Huayana'}, {label: 'Kishuara', value: 'Kishuara'}, {label: 'Pacobamba', value: 'Pacobamba'}, {label: 'Pacucha', value: 'Pacucha'}, {label: 'Pampachiri', value: 'Pampachiri'}, {label: 'Pomacocha', value: 'Pomacocha'}, {label: 'San Antonio de Cachi', value: 'San Antonio de Cachi'}, {label: 'San Jerónimo', value: 'San Jerónimo'}, {label: 'San Miguel de Chaccrampa', value: 'San Miguel de Chaccrampa'}, {label: 'Santa María de Chicmo', value: 'Santa María de Chicmo'}, {label: 'Talavera', value: 'Talavera'}, {label: 'Tumay Huaraca', value: 'Tumay Huaraca'}, {label: 'Turpo', value: 'Turpo'}, {label: 'Kaquiabamba', value: 'Kaquiabamba'}, {label: 'José María Arguedas', value: 'José María Arguedas'}, {label: 'Antabamba', value: 'Antabamba'}, {label: 'El Oro', value: 'El Oro'}, {label: 'Huaquirca', value: 'Huaquirca'}, {label: 'Juan Espinoza Medrano', value: 'Juan Espinoza Medrano'}, {label: 'Oropesa', value: 'Oropesa'}, {label: 'Pachaconas', value: 'Pachaconas'}, {label: 'Sabaino', value: 'Sabaino'}, {label: 'Chalhuanca', value: 'Chalhuanca'}, {label: 'Capaya', value: 'Capaya'}, {label: 'Caraybamba', value: 'Caraybamba'}, {label: 'Chapimarca', value: 'Chapimarca'},
        {label: 'Colcabamba', value: 'Colcabamba'}, {label: 'Cotaruse', value: 'Cotaruse'}, {label: 'Huayllo', value: 'Huayllo'}, {label: 'Justo Apu Sahuaraura', value: 'Justo Apu Sahuaraura'}, {label: 'Lucre', value: 'Lucre'}, {label: 'Pocohuanca', value: 'Pocohuanca'}, {label: 'San Juan de Chacña', value: 'San Juan de Chacña'}, {label: 'Sañayca', value: 'Sañayca'}, {label: 'Soraya', value: 'Soraya'}, {label: 'Tapairihua', value: 'Tapairihua'}, {label: 'Tintay', value: 'Tintay'}, {label: 'Toraya', value: 'Toraya'}, {label: 'Yanaca', value: 'Yanaca'}, {label: 'Tambobamba', value: 'Tambobamba'}, {label: 'Cotabambas', value: 'Cotabambas'}, {label: 'Coyllurqui', value: 'Coyllurqui'}, {label: 'Haquira', value: 'Haquira'}, {label: 'Mara', value: 'Mara'}, {label: 'Challhuahuacho', value: 'Challhuahuacho'}, {label: 'Chincheros', value: 'Chincheros'}, {label: 'Anco_Huallo', value: 'Anco_Huallo'}, {label: 'Cocharcas', value: 'Cocharcas'}, {label: 'Huaccana', value: 'Huaccana'}, {label: 'Ocobamba', value: 'Ocobamba'}, {label: 'Ongoy', value: 'Ongoy'}, {label: 'Uranmarca', value: 'Uranmarca'}, {label: 'Ranracancha', value: 'Ranracancha'}, {label: 'Chuquibambilla', value: 'Chuquibambilla'}, {label: 'Curpahuasi', value: 'Curpahuasi'}, {label: 'Gamarra', value: 'Gamarra'}, {label: 'Huayllati', value: 'Huayllati'}, {label: 'Mamara', value: 'Mamara'}, {label: 'Micaela Bastidas', value: 'Micaela Bastidas'},
        {label: 'Pataypampa', value: 'Pataypampa'}, {label: 'Progreso', value: 'Progreso'}, {label: 'San Antonio', value: 'San Antonio'}, {label: 'Santa Rosa', value: 'Santa Rosa'}, {label: 'Turpay', value: 'Turpay'}, {label: 'Vilcabamba', value: 'Vilcabamba'}, {label: 'Virundo', value: 'Virundo'}, {label: 'Curasco', value: 'Curasco'}, {label: 'Arequipa', value: 'Arequipa'}, {label: 'Alto Selva Alegre', value: 'Alto Selva Alegre'}, {label: 'Cayma', value: 'Cayma'}, {label: 'Cerro Colorado', value: 'Cerro Colorado'}, {label: 'Characato', value: 'Characato'}, {label: 'Chiguata', value: 'Chiguata'}, {label: 'Jacobo Hunter', value: 'Jacobo Hunter'}, {label: 'La Joya', value: 'La Joya'}, {label: 'Mariano Melgar', value: 'Mariano Melgar'}, {label: 'Miraflores', value: 'Miraflores'}, {label: 'Mollebaya', value: 'Mollebaya'}, {label: 'Paucarpata', value: 'Paucarpata'}, {label: 'Pocsi', value: 'Pocsi'}, {label: 'Polobaya', value: 'Polobaya'}, {label: 'Quequeña', value: 'Quequeña'}, {label: 'Sabandia', value: 'Sabandia'}, {label: 'Sachaca', value: 'Sachaca'}, {label: 'San Juan de Siguas', value: 'San Juan de Siguas'}, {label: 'San Juan de Tarucani', value: 'San Juan de Tarucani'}, {label: 'Santa Isabel de Siguas', value: 'Santa Isabel de Siguas'}, {label: 'Santa Rita de Siguas', value: 'Santa Rita de Siguas'}, {label: 'Socabaya', value: 'Socabaya'}, {label: 'Tiabaya', value: 'Tiabaya'}, {label: 'Uchumayo', value: 'Uchumayo'}, {label: 'Vitor', value: 'Vitor'},
        {label: 'Yanahuara', value: 'Yanahuara'}, {label: 'Yarabamba', value: 'Yarabamba'}, {label: 'Yura', value: 'Yura'}, {label: 'José Luis Bustamante Y Rivero', value: 'José Luis Bustamante Y Rivero'}, {label: 'Camaná', value: 'Camaná'}, {label: 'José María Quimper', value: 'José María Quimper'}, {label: 'Mariano Nicolás Valcárcel', value: 'Mariano Nicolás Valcárcel'}, {label: 'Mariscal Cáceres', value: 'Mariscal Cáceres'}, {label: 'Nicolás de Pierola', value: 'Nicolás de Pierola'}, {label: 'Ocoña', value: 'Ocoña'}, {label: 'Quilca', value: 'Quilca'}, {label: 'Samuel Pastor', value: 'Samuel Pastor'}, {label: 'Caravelí', value: 'Caravelí'}, {label: 'Acarí', value: 'Acarí'}, {label: 'Atico', value: 'Atico'}, {label: 'Atiquipa', value: 'Atiquipa'}, {label: 'Bella Unión', value: 'Bella Unión'}, {label: 'Cahuacho', value: 'Cahuacho'}, {label: 'Chala', value: 'Chala'}, {label: 'Chaparra', value: 'Chaparra'}, {label: 'Huanuhuanu', value: 'Huanuhuanu'}, {label: 'Jaqui', value: 'Jaqui'}, {label: 'Lomas', value: 'Lomas'}, {label: 'Quicacha', value: 'Quicacha'}, {label: 'Yauca', value: 'Yauca'}, {label: 'Aplao', value: 'Aplao'}, {label: 'Andagua', value: 'Andagua'}, {label: 'Ayo', value: 'Ayo'}, {label: 'Chachas', value: 'Chachas'}, {label: 'Chilcaymarca', value: 'Chilcaymarca'}, {label: 'Choco', value: 'Choco'}, {label: 'Huancarqui', value: 'Huancarqui'}, {label: 'Machaguay', value: 'Machaguay'}, {label: 'Orcopampa', value: 'Orcopampa'},
        {label: 'Pampacolca', value: 'Pampacolca'}, {label: 'Tipan', value: 'Tipan'}, {label: 'Uñon', value: 'Uñon'}, {label: 'Uraca', value: 'Uraca'}, {label: 'Viraco        ', value: 'Viraco        '}, {label: 'Chivay', value: 'Chivay'}, {label: 'Achoma', value: 'Achoma'}, {label: 'Cabanaconde', value: 'Cabanaconde'}, {label: 'Callalli', value: 'Callalli'}, {label: 'Caylloma', value: 'Caylloma'}, {label: 'Coporaque', value: 'Coporaque'}, {label: 'Huambo', value: 'Huambo'}, {label: 'Huanca', value: 'Huanca'}, {label: 'Ichupampa', value: 'Ichupampa'}, {label: 'Lari', value: 'Lari'}, {label: 'Lluta', value: 'Lluta'}, {label: 'Maca', value: 'Maca'}, {label: 'Madrigal', value: 'Madrigal'}, {label: 'San Antonio de Chuca', value: 'San Antonio de Chuca'}, {label: 'Sibayo', value: 'Sibayo'}, {label: 'Tapay', value: 'Tapay'}, {label: 'Tisco', value: 'Tisco'}, {label: 'Tuti', value: 'Tuti'}, {label: 'Yanque', value: 'Yanque'}, {label: 'Majes', value: 'Majes'}, {label: 'Chuquibamba', value: 'Chuquibamba'}, {label: 'Andaray', value: 'Andaray'}, {label: 'Cayarani', value: 'Cayarani'}, {label: 'Chichas', value: 'Chichas'}, {label: 'Iray', value: 'Iray'}, {label: 'Río Grande', value: 'Río Grande'}, {label: 'Salamanca', value: 'Salamanca'}, {label: 'Yanaquihua', value: 'Yanaquihua'},
        {label: 'Mollendo', value: 'Mollendo'}, {label: 'Cocachacra', value: 'Cocachacra'}, {label: 'Dean Valdivia', value: 'Dean Valdivia'}, {label: 'Islay', value: 'Islay'}, {label: 'Mejia', value: 'Mejia'}, {label: 'Punta de Bombón', value: 'Punta de Bombón'}, {label: 'Cotahuasi', value: 'Cotahuasi'}, {label: 'Alca', value: 'Alca'}, {label: 'Charcana', value: 'Charcana'}, {label: 'Huaynacotas', value: 'Huaynacotas'}, {label: 'Pampamarca', value: 'Pampamarca'}, {label: 'Puyca', value: 'Puyca'}, {label: 'Quechualla', value: 'Quechualla'}, {label: 'Sayla', value: 'Sayla'}, {label: 'Tauria', value: 'Tauria'}, {label: 'Tomepampa', value: 'Tomepampa'}, {label: 'Toro', value: 'Toro'}, {label: 'Ayacucho', value: 'Ayacucho'}, {label: 'Acocro', value: 'Acocro'}, {label: 'Acos Vinchos', value: 'Acos Vinchos'}, {label: 'Carmen Alto', value: 'Carmen Alto'}, {label: 'Chiara', value: 'Chiara'}, {label: 'Ocros', value: 'Ocros'}, {label: 'Pacaycasa', value: 'Pacaycasa'}, {label: 'Quinua', value: 'Quinua'}, {label: 'San José de Ticllas', value: 'San José de Ticllas'}, {label: 'San Juan Bautista', value: 'San Juan Bautista'}, {label: 'Santiago de Pischa', value: 'Santiago de Pischa'}, {label: 'Socos', value: 'Socos'}, {label: 'Tambillo', value: 'Tambillo'}, {label: 'Vinchos', value: 'Vinchos'}, {label: 'Jesús Nazareno', value: 'Jesús Nazareno'}, {label: 'Andrés Avelino Cáceres Dorregaray', value: 'Andrés Avelino Cáceres Dorregaray'},
        {label: 'Cangallo', value: 'Cangallo'}, {label: 'Chuschi', value: 'Chuschi'}, {label: 'Los Morochucos', value: 'Los Morochucos'}, {label: 'María Parado de Bellido', value: 'María Parado de Bellido'}, {label: 'Paras', value: 'Paras'}, {label: 'Totos', value: 'Totos'}, {label: 'Sancos', value: 'Sancos'}, {label: 'Carapo', value: 'Carapo'}, {label: 'Sacsamarca', value: 'Sacsamarca'}, {label: 'Santiago de Lucanamarca', value: 'Santiago de Lucanamarca'}, {label: 'Huanta', value: 'Huanta'}, {label: 'Ayahuanco', value: 'Ayahuanco'}, {label: 'Huamanguilla', value: 'Huamanguilla'}, {label: 'Iguain', value: 'Iguain'}, {label: 'Luricocha', value: 'Luricocha'}, {label: 'Santillana', value: 'Santillana'}, {label: 'Sivia', value: 'Sivia'}, {label: 'Llochegua', value: 'Llochegua'}, {label: 'Canayre', value: 'Canayre'}, {label: 'Uchuraccay', value: 'Uchuraccay'}, {label: 'Pucacolpa', value: 'Pucacolpa'}, {label: 'San Miguel', value: 'San Miguel'}, {label: 'Anco', value: 'Anco'}, {label: 'Ayna', value: 'Ayna'}, {label: 'Chilcas', value: 'Chilcas'}, {label: 'Chungui', value: 'Chungui'}, {label: 'Luis Carranza', value: 'Luis Carranza'}, {label: 'Santa Rosa', value: 'Santa Rosa'}, {label: 'Tambo', value: 'Tambo'}, {label: 'Samugari', value: 'Samugari'}, {label: 'Anchihuay', value: 'Anchihuay'}, {label: 'Puquio', value: 'Puquio'}, {label: 'Aucara', value: 'Aucara'},
        {label: 'Cabana', value: 'Cabana'}, {label: 'Carmen Salcedo', value: 'Carmen Salcedo'}, {label: 'Chaviña', value: 'Chaviña'}, {label: 'Chipao', value: 'Chipao'}, {label: 'Huac-Huas', value: 'Huac-Huas'}, {label: 'Laramate', value: 'Laramate'}, {label: 'Leoncio Prado', value: 'Leoncio Prado'}, {label: 'Llauta', value: 'Llauta'}, {label: 'Lucanas', value: 'Lucanas'}, {label: 'Ocaña', value: 'Ocaña'}, {label: 'Otoca', value: 'Otoca'}, {label: 'Saisa', value: 'Saisa'}, {label: 'San Cristóbal', value: 'San Cristóbal'}, {label: 'San Juan', value: 'San Juan'}, {label: 'San Pedro', value: 'San Pedro'}, {label: 'San Pedro de Palco', value: 'San Pedro de Palco'}, {label: 'Sancos', value: 'Sancos'}, {label: 'Santa Ana de Huaycahuacho', value: 'Santa Ana de Huaycahuacho'}, {label: 'Santa Lucia', value: 'Santa Lucia'}, {label: 'Coracora', value: 'Coracora'}, {label: 'Chumpi', value: 'Chumpi'}, {label: 'Coronel Castañeda', value: 'Coronel Castañeda'}, {label: 'Pacapausa', value: 'Pacapausa'}, {label: 'Pullo', value: 'Pullo'}, {label: 'Puyusca', value: 'Puyusca'}, {label: 'San Francisco de Ravacayco', value: 'San Francisco de Ravacayco'}, {label: 'Upahuacho', value: 'Upahuacho'}, {label: 'Pausa', value: 'Pausa'}, {label: 'Colta', value: 'Colta'}, {label: 'Corculla', value: 'Corculla'}, {label: 'Lampa', value: 'Lampa'}, {label: 'Marcabamba', value: 'Marcabamba'}, {label: 'Oyolo', value: 'Oyolo'}, {label: 'Pararca', value: 'Pararca'},
        {label: 'San Javier de Alpabamba', value: 'San Javier de Alpabamba'}, {label: 'San José de Ushua', value: 'San José de Ushua'}, {label: 'Sara Sara', value: 'Sara Sara'}, {label: 'Querobamba', value: 'Querobamba'}, {label: 'Belén', value: 'Belén'}, {label: 'Chalcos', value: 'Chalcos'}, {label: 'Chilcayoc', value: 'Chilcayoc'}, {label: 'Huacaña', value: 'Huacaña'}, {label: 'Morcolla', value: 'Morcolla'}, {label: 'Paico', value: 'Paico'}, {label: 'San Pedro de Larcay', value: 'San Pedro de Larcay'}, {label: 'San Salvador de Quije', value: 'San Salvador de Quije'}, {label: 'Santiago de Paucaray', value: 'Santiago de Paucaray'}, {label: 'Soras', value: 'Soras'}, {label: 'Huancapi', value: 'Huancapi'}, {label: 'Alcamenca', value: 'Alcamenca'}, {label: 'Apongo', value: 'Apongo'}, {label: 'Asquipata', value: 'Asquipata'}, {label: 'Canaria', value: 'Canaria'}, {label: 'Cayara', value: 'Cayara'}, {label: 'Colca', value: 'Colca'}, {label: 'Huamanquiquia', value: 'Huamanquiquia'}, {label: 'Huancaraylla', value: 'Huancaraylla'}, {label: 'Huaya', value: 'Huaya'}, {label: 'Sarhua', value: 'Sarhua'}, {label: 'Vilcanchos', value: 'Vilcanchos'}, {label: 'Vilcas Huaman', value: 'Vilcas Huaman'}, {label: 'Accomarca', value: 'Accomarca'}, {label: 'Carhuanca', value: 'Carhuanca'}, {label: 'Concepción', value: 'Concepción'}, {label: 'Huambalpa', value: 'Huambalpa'}, {label: 'Independencia', value: 'Independencia'}, {label: 'Saurama', value: 'Saurama'}, {label: 'Vischongo', value: 'Vischongo'},
        {label: 'Cajamarca', value: 'Cajamarca'}, {label: 'Asunción', value: 'Asunción'}, {label: 'Chetilla', value: 'Chetilla'}, {label: 'Cospan', value: 'Cospan'}, {label: 'Encañada', value: 'Encañada'}, {label: 'Jesús', value: 'Jesús'}, {label: 'Llacanora', value: 'Llacanora'}, {label: 'Los Baños del Inca', value: 'Los Baños del Inca'}, {label: 'Magdalena', value: 'Magdalena'}, {label: 'Matara', value: 'Matara'}, {label: 'Namora', value: 'Namora'}, {label: 'San Juan', value: 'San Juan'}, {label: 'Cajabamba', value: 'Cajabamba'}, {label: 'Cachachi', value: 'Cachachi'}, {label: 'Condebamba', value: 'Condebamba'}, {label: 'Sitacocha', value: 'Sitacocha'}, {label: 'Celendín', value: 'Celendín'}, {label: 'Chumuch', value: 'Chumuch'}, {label: 'Cortegana', value: 'Cortegana'}, {label: 'Huasmin', value: 'Huasmin'}, {label: 'Jorge Chávez', value: 'Jorge Chávez'}, {label: 'José Gálvez', value: 'José Gálvez'}, {label: 'Miguel Iglesias', value: 'Miguel Iglesias'}, {label: 'Oxamarca', value: 'Oxamarca'}, {label: 'Sorochuco', value: 'Sorochuco'}, {label: 'Sucre', value: 'Sucre'}, {label: 'Utco', value: 'Utco'}, {label: 'La Libertad de Pallan', value: 'La Libertad de Pallan'}, {label: 'Chota', value: 'Chota'}, {label: 'Anguia', value: 'Anguia'}, {label: 'Chadin', value: 'Chadin'}, {label: 'Chiguirip', value: 'Chiguirip'}, {label: 'Chimban', value: 'Chimban'}, {label: 'Choropampa', value: 'Choropampa'},
        {label: 'Cochabamba', value: 'Cochabamba'}, {label: 'Conchan', value: 'Conchan'}, {label: 'Huambos', value: 'Huambos'}, {label: 'Lajas', value: 'Lajas'}, {label: 'Llama', value: 'Llama'}, {label: 'Miracosta', value: 'Miracosta'}, {label: 'Paccha', value: 'Paccha'}, {label: 'Pion', value: 'Pion'}, {label: 'Querocoto', value: 'Querocoto'}, {label: 'San Juan de Licupis', value: 'San Juan de Licupis'}, {label: 'Tacabamba', value: 'Tacabamba'}, {label: 'Tocmoche', value: 'Tocmoche'}, {label: 'Chalamarca', value: 'Chalamarca'}, {label: 'Contumaza', value: 'Contumaza'}, {label: 'Chilete', value: 'Chilete'}, {label: 'Cupisnique', value: 'Cupisnique'}, {label: 'Guzmango', value: 'Guzmango'}, {label: 'San Benito', value: 'San Benito'}, {label: 'Santa Cruz de Toledo', value: 'Santa Cruz de Toledo'}, {label: 'Tantarica', value: 'Tantarica'}, {label: 'Yonan', value: 'Yonan'}, {label: 'Cutervo', value: 'Cutervo'}, {label: 'Callayuc', value: 'Callayuc'}, {label: 'Choros', value: 'Choros'}, {label: 'Cujillo', value: 'Cujillo'}, {label: 'La Ramada', value: 'La Ramada'}, {label: 'Pimpingos', value: 'Pimpingos'}, {label: 'Querocotillo', value: 'Querocotillo'}, {label: 'San Andrés de Cutervo', value: 'San Andrés de Cutervo'}, {label: 'San Juan de Cutervo', value: 'San Juan de Cutervo'}, {label: 'San Luis de Lucma', value: 'San Luis de Lucma'}, {label: 'Santa Cruz', value: 'Santa Cruz'}, {label: 'Santo Domingo de la Capilla', value: 'Santo Domingo de la Capilla'}, {label: 'Santo Tomas', value: 'Santo Tomas'}, {label: 'Socota', value: 'Socota'}, {label: 'Toribio Casanova', value: 'Toribio Casanova'},
        {label: 'Bambamarca', value: 'Bambamarca'}, {label: 'Chugur', value: 'Chugur'}, {label: 'Hualgayoc', value: 'Hualgayoc'}, {label: 'Jaén', value: 'Jaén'}, {label: 'Bellavista', value: 'Bellavista'}, {label: 'Chontali', value: 'Chontali'}, {label: 'Colasay', value: 'Colasay'}, {label: 'Huabal', value: 'Huabal'}, {label: 'Las Pirias', value: 'Las Pirias'}, {label: 'Pomahuaca', value: 'Pomahuaca'}, {label: 'Pucara', value: 'Pucara'}, {label: 'Sallique', value: 'Sallique'}, {label: 'San Felipe', value: 'San Felipe'}, {label: 'San José del Alto', value: 'San José del Alto'}, {label: 'Santa Rosa', value: 'Santa Rosa'}, {label: 'San Ignacio', value: 'San Ignacio'}, {label: 'Chirinos', value: 'Chirinos'}, {label: 'Huarango', value: 'Huarango'}, {label: 'La Coipa', value: 'La Coipa'}, {label: 'Namballe', value: 'Namballe'}, {label: 'San José de Lourdes', value: 'San José de Lourdes'}, {label: 'Tabaconas', value: 'Tabaconas'}, {label: 'Pedro Gálvez', value: 'Pedro Gálvez'}, {label: 'Chancay', value: 'Chancay'}, {label: 'Eduardo Villanueva', value: 'Eduardo Villanueva'}, {label: 'Gregorio Pita', value: 'Gregorio Pita'}, {label: 'Ichocan', value: 'Ichocan'}, {label: 'José Manuel Quiroz', value: 'José Manuel Quiroz'}, {label: 'José Sabogal', value: 'José Sabogal'}, {label: 'San Miguel', value: 'San Miguel'}, {label: 'Bolívar', value: 'Bolívar'}, {label: 'Calquis', value: 'Calquis'}, {label: 'Catilluc', value: 'Catilluc'}, {label: 'El Prado', value: 'El Prado'}, {label: 'La Florida', value: 'La Florida'}, {label: 'Llapa', value: 'Llapa'},
        {label: 'Nanchoc', value: 'Nanchoc'}, {label: 'Niepos', value: 'Niepos'}, {label: 'San Gregorio', value: 'San Gregorio'}, {label: 'San Silvestre de Cochan', value: 'San Silvestre de Cochan'}, {label: 'Tongod', value: 'Tongod'}, {label: 'Unión Agua Blanca', value: 'Unión Agua Blanca'}, {label: 'San Pablo', value: 'San Pablo'}, {label: 'San Bernardino', value: 'San Bernardino'}, {label: 'San Luis', value: 'San Luis'}, {label: 'Tumbaden', value: 'Tumbaden'}, {label: 'Santa Cruz', value: 'Santa Cruz'}, {label: 'Andabamba', value: 'Andabamba'}, {label: 'Catache', value: 'Catache'}, {label: 'Chancaybaños', value: 'Chancaybaños'}, {label: 'La Esperanza', value: 'La Esperanza'}, {label: 'Ninabamba', value: 'Ninabamba'}, {label: 'Pulan', value: 'Pulan'}, {label: 'Saucepampa', value: 'Saucepampa'}, {label: 'Sexi', value: 'Sexi'}, {label: 'Uticyacu', value: 'Uticyacu'}, {label: 'Yauyucan', value: 'Yauyucan'}, {label: 'Callao', value: 'Callao'}, {label: 'Bellavista', value: 'Bellavista'}, {label: 'Carmen de la Legua Reynoso', value: 'Carmen de la Legua Reynoso'}, {label: 'La Perla', value: 'La Perla'}, {label: 'La Punta', value: 'La Punta'}, {label: 'Ventanilla', value: 'Ventanilla'}, {label: 'Mi Perú', value: 'Mi Perú'}, {label: 'Cusco', value: 'Cusco'}, {label: 'Ccorca', value: 'Ccorca'}, {label: 'Poroy', value: 'Poroy'}, {label: 'San Jerónimo', value: 'San Jerónimo'}, {label: 'San Sebastian', value: 'San Sebastian'}, {label: 'Santiago', value: 'Santiago'}, {label: 'Saylla', value: 'Saylla'}, {label: 'Wanchaq', value: 'Wanchaq'}, {label: 'Acomayo', value: 'Acomayo'}, {label: 'Acopia', value: 'Acopia'}, {label: 'Acos', value: 'Acos'}, {label: 'Mosoc Llacta', value: 'Mosoc Llacta'}, {label: 'Pomacanchi', value: 'Pomacanchi'},
        {label: 'Rondocan', value: 'Rondocan'}, {label: 'Sangarara', value: 'Sangarara'}, {label: 'Anta', value: 'Anta'}, {label: 'Ancahuasi', value: 'Ancahuasi'}, {label: 'Cachimayo', value: 'Cachimayo'}, {label: 'Chinchaypujio', value: 'Chinchaypujio'}, {label: 'Huarocondo', value: 'Huarocondo'}, {label: 'Limatambo', value: 'Limatambo'}, {label: 'Mollepata', value: 'Mollepata'}, {label: 'Pucyura', value: 'Pucyura'}, {label: 'Zurite', value: 'Zurite'}, {label: 'Calca', value: 'Calca'}, {label: 'Coya', value: 'Coya'}, {label: 'Lamay', value: 'Lamay'}, {label: 'Lares', value: 'Lares'}, {label: 'Pisac', value: 'Pisac'}, {label: 'San Salvador', value: 'San Salvador'}, {label: 'Taray', value: 'Taray'}, {label: 'Yanatile', value: 'Yanatile'}, {label: 'Yanaoca', value: 'Yanaoca'}, {label: 'Checca', value: 'Checca'}, {label: 'Kunturkanki', value: 'Kunturkanki'}, {label: 'Langui', value: 'Langui'}, {label: 'Layo', value: 'Layo'}, {label: 'Pampamarca', value: 'Pampamarca'}, {label: 'Quehue', value: 'Quehue'}, {label: 'Tupac Amaru', value: 'Tupac Amaru'}, {label: 'Sicuani', value: 'Sicuani'}, {label: 'Checacupe', value: 'Checacupe'}, {label: 'Combapata', value: 'Combapata'}, {label: 'Marangani', value: 'Marangani'}, {label: 'Pitumarca', value: 'Pitumarca'}, {label: 'San Pablo', value: 'San Pablo'}, {label: 'San Pedro', value: 'San Pedro'}, {label: 'Tinta', value: 'Tinta'}, {label: 'Santo Tomas', value: 'Santo Tomas'}, {label: 'Capacmarca', value: 'Capacmarca'},
        {label: 'Chamaca', value: 'Chamaca'}, {label: 'Colquemarca', value: 'Colquemarca'}, {label: 'Livitaca', value: 'Livitaca'}, {label: 'Llusco', value: 'Llusco'}, {label: 'Quiñota', value: 'Quiñota'}, {label: 'Velille', value: 'Velille'}, {label: 'Espinar', value: 'Espinar'}, {label: 'Condoroma', value: 'Condoroma'}, {label: 'Coporaque', value: 'Coporaque'}, {label: 'Ocoruro', value: 'Ocoruro'}, {label: 'Pallpata', value: 'Pallpata'}, {label: 'Pichigua', value: 'Pichigua'}, {label: 'Suyckutambo', value: 'Suyckutambo'}, {label: 'Alto Pichigua', value: 'Alto Pichigua'}, {label: 'Santa Ana', value: 'Santa Ana'}, {label: 'Echarate', value: 'Echarate'}, {label: 'Huayopata', value: 'Huayopata'}, {label: 'Maranura', value: 'Maranura'}, {label: 'Ocobamba', value: 'Ocobamba'}, {label: 'Quellouno', value: 'Quellouno'}, {label: 'Kimbiri', value: 'Kimbiri'}, {label: 'Santa Teresa', value: 'Santa Teresa'}, {label: 'Vilcabamba', value: 'Vilcabamba'}, {label: 'Pichari', value: 'Pichari'}, {label: 'Inkawasi', value: 'Inkawasi'}, {label: 'Villa Virgen', value: 'Villa Virgen'}, {label: 'Villa Kintiarina', value: 'Villa Kintiarina'}, {label: 'Paruro', value: 'Paruro'}, {label: 'Accha', value: 'Accha'}, {label: 'Ccapi', value: 'Ccapi'}, {label: 'Colcha', value: 'Colcha'}, {label: 'Huanoquite', value: 'Huanoquite'}, {label: 'Omacha', value: 'Omacha'}, {label: 'Paccaritambo', value: 'Paccaritambo'},
        {label: 'Pillpinto', value: 'Pillpinto'}, {label: 'Yaurisque', value: 'Yaurisque'}, {label: 'Paucartambo', value: 'Paucartambo'}, {label: 'Caicay', value: 'Caicay'}, {label: 'Challabamba', value: 'Challabamba'}, {label: 'Colquepata', value: 'Colquepata'}, {label: 'Huancarani', value: 'Huancarani'}, {label: 'Kosñipata', value: 'Kosñipata'}, {label: 'Urcos', value: 'Urcos'}, {label: 'Andahuaylillas', value: 'Andahuaylillas'}, {label: 'Camanti', value: 'Camanti'}, {label: 'Ccarhuayo', value: 'Ccarhuayo'}, {label: 'Ccatca', value: 'Ccatca'}, {label: 'Cusipata', value: 'Cusipata'}, {label: 'Huaro', value: 'Huaro'}, {label: 'Lucre', value: 'Lucre'}, {label: 'Marcapata', value: 'Marcapata'}, {label: 'Ocongate', value: 'Ocongate'}, {label: 'Oropesa', value: 'Oropesa'}, {label: 'Quiquijana', value: 'Quiquijana'}, {label: 'Urubamba', value: 'Urubamba'}, {label: 'Chinchero', value: 'Chinchero'}, {label: 'Huayllabamba', value: 'Huayllabamba'}, {label: 'Machupicchu', value: 'Machupicchu'}, {label: 'Maras', value: 'Maras'}, {label: 'Ollantaytambo', value: 'Ollantaytambo'}, {label: 'Yucay', value: 'Yucay'}, {label: 'Huancavelica', value: 'Huancavelica'}, {label: 'Acobambilla', value: 'Acobambilla'}, {label: 'Acoria', value: 'Acoria'}, {label: 'Conayca', value: 'Conayca'}, {label: 'Cuenca', value: 'Cuenca'}, {label: 'Huachocolpa', value: 'Huachocolpa'}, {label: 'Huayllahuara', value: 'Huayllahuara'},
        {label: 'Izcuchaca', value: 'Izcuchaca'}, {label: 'Laria', value: 'Laria'}, {label: 'Manta', value: 'Manta'}, {label: 'Mariscal Cáceres', value: 'Mariscal Cáceres'}, {label: 'Moya', value: 'Moya'}, {label: 'Nuevo Occoro', value: 'Nuevo Occoro'}, {label: 'Palca', value: 'Palca'}, {label: 'Pilchaca', value: 'Pilchaca'}, {label: 'Vilca', value: 'Vilca'}, {label: 'Yauli', value: 'Yauli'}, {label: 'Ascensión', value: 'Ascensión'}, {label: 'Huando', value: 'Huando'}, {label: 'Acobamba', value: 'Acobamba'}, {label: 'Andabamba', value: 'Andabamba'}, {label: 'Anta', value: 'Anta'}, {label: 'Caja', value: 'Caja'}, {label: 'Marcas', value: 'Marcas'}, {label: 'Paucara', value: 'Paucara'}, {label: 'Pomacocha', value: 'Pomacocha'}, {label: 'Rosario', value: 'Rosario'}, {label: 'Lircay', value: 'Lircay'}, {label: 'Anchonga', value: 'Anchonga'}, {label: 'Callanmarca', value: 'Callanmarca'}, {label: 'Ccochaccasa', value: 'Ccochaccasa'}, {label: 'Chincho', value: 'Chincho'}, {label: 'Congalla', value: 'Congalla'}, {label: 'Huanca-Huanca', value: 'Huanca-Huanca'}, {label: 'Huayllay Grande', value: 'Huayllay Grande'}, {label: 'Julcamarca', value: 'Julcamarca'}, {label: 'San Antonio de Antaparco', value: 'San Antonio de Antaparco'}, {label: 'Santo Tomas de Pata', value: 'Santo Tomas de Pata'}, {label: 'Secclla', value: 'Secclla'}, {label: 'Castrovirreyna', value: 'Castrovirreyna'}, {label: 'Arma', value: 'Arma'}, {label: 'Aurahua', value: 'Aurahua'}, {label: 'Capillas', value: 'Capillas'}, {label: 'Chupamarca', value: 'Chupamarca'}, {label: 'Cocas', value: 'Cocas'},
        {label: 'Huachos', value: 'Huachos'}, {label: 'Huamatambo', value: 'Huamatambo'}, {label: 'Mollepampa', value: 'Mollepampa'}, {label: 'San Juan', value: 'San Juan'}, {label: 'Santa Ana', value: 'Santa Ana'}, {label: 'Tantara', value: 'Tantara'}, {label: 'Ticrapo', value: 'Ticrapo'}, {label: 'Churcampa', value: 'Churcampa'}, {label: 'Anco', value: 'Anco'}, {label: 'Chinchihuasi', value: 'Chinchihuasi'}, {label: 'El Carmen', value: 'El Carmen'}, {label: 'La Merced', value: 'La Merced'}, {label: 'Locroja', value: 'Locroja'}, {label: 'Paucarbamba', value: 'Paucarbamba'}, {label: 'San Miguel de Mayocc', value: 'San Miguel de Mayocc'}, {label: 'San Pedro de Coris', value: 'San Pedro de Coris'}, {label: 'Pachamarca', value: 'Pachamarca'}, {label: 'Cosme', value: 'Cosme'}, {label: 'Huaytara', value: 'Huaytara'}, {label: 'Ayavi', value: 'Ayavi'}, {label: 'Córdova', value: 'Córdova'}, {label: 'Huayacundo Arma', value: 'Huayacundo Arma'}, {label: 'Laramarca', value: 'Laramarca'}, {label: 'Ocoyo', value: 'Ocoyo'}, {label: 'Pilpichaca', value: 'Pilpichaca'}, {label: 'Querco', value: 'Querco'}, {label: 'Quito-Arma', value: 'Quito-Arma'}, {label: 'San Antonio de Cusicancha', value: 'San Antonio de Cusicancha'}, {label: 'San Francisco de Sangayaico', value: 'San Francisco de Sangayaico'}, {label: 'San Isidro', value: 'San Isidro'}, {label: 'Santiago de Chocorvos', value: 'Santiago de Chocorvos'}, {label: 'Santiago de Quirahuara', value: 'Santiago de Quirahuara'}, {label: 'Santo Domingo de Capillas', value: 'Santo Domingo de Capillas'}, {label: 'Tambo', value: 'Tambo'}, {label: 'Pampas', value: 'Pampas'}, {label: 'Acostambo', value: 'Acostambo'},
        {label: 'Acraquia', value: 'Acraquia'}, {label: 'Ahuaycha', value: 'Ahuaycha'}, {label: 'Colcabamba', value: 'Colcabamba'}, {label: 'Daniel Hernández', value: 'Daniel Hernández'}, {label: 'Huachocolpa', value: 'Huachocolpa'}, {label: 'Huaribamba', value: 'Huaribamba'}, {label: 'Ñahuimpuquio', value: 'Ñahuimpuquio'}, {label: 'Pazos', value: 'Pazos'}, {label: 'Quishuar', value: 'Quishuar'}, {label: 'Salcabamba', value: 'Salcabamba'}, {label: 'Salcahuasi', value: 'Salcahuasi'}, {label: 'San Marcos de Rocchac', value: 'San Marcos de Rocchac'}, {label: 'Surcubamba', value: 'Surcubamba'}, {label: 'Tintay Puncu', value: 'Tintay Puncu'}, {label: 'Quichuas', value: 'Quichuas'}, {label: 'Andaymarca', value: 'Andaymarca'}, {label: 'Huanuco', value: 'Huanuco'}, {label: 'Amarilis', value: 'Amarilis'}, {label: 'Chinchao', value: 'Chinchao'}, {label: 'Churubamba', value: 'Churubamba'}, {label: 'Margos', value: 'Margos'}, {label: 'Quisqui', value: 'Quisqui'}, {label: 'San Francisco de Cayran', value: 'San Francisco de Cayran'}, {label: 'San Pedro de Chaulan', value: 'San Pedro de Chaulan'}, {label: 'Santa María del Valle', value: 'Santa María del Valle'}, {label: 'Yarumayo', value: 'Yarumayo'}, {label: 'Pillco Marca', value: 'Pillco Marca'}, {label: 'Yacus', value: 'Yacus'}, {label: 'Ambo', value: 'Ambo'}, {label: 'Cayna', value: 'Cayna'}, {label: 'Colpas', value: 'Colpas'}, {label: 'Conchamarca', value: 'Conchamarca'}, {label: 'Huacar', value: 'Huacar'}, {label: 'San Francisco', value: 'San Francisco'}, {label: 'San Rafael', value: 'San Rafael'}, {label: 'Tomay Kichwa', value: 'Tomay Kichwa'}, {label: 'La Unión', value: 'La Unión'}, {label: 'Chuquis', value: 'Chuquis'},
        {label: 'Marías', value: 'Marías'}, {label: 'Pachas', value: 'Pachas'}, {label: 'Quivilla', value: 'Quivilla'}, {label: 'Ripan', value: 'Ripan'}, {label: 'Shunqui', value: 'Shunqui'}, {label: 'Sillapata', value: 'Sillapata'}, {label: 'Yanas', value: 'Yanas'}, {label: 'Huacaybamba', value: 'Huacaybamba'}, {label: 'Canchabamba', value: 'Canchabamba'}, {label: 'Cochabamba', value: 'Cochabamba'}, {label: 'Pinra', value: 'Pinra'}, {label: 'Llata', value: 'Llata'}, {label: 'Arancay', value: 'Arancay'}, {label: 'Chavín de Pariarca', value: 'Chavín de Pariarca'}, {label: 'Jacas Grande', value: 'Jacas Grande'}, {label: 'Jircan', value: 'Jircan'}, {label: 'Miraflores', value: 'Miraflores'}, {label: 'Monzón', value: 'Monzón'}, {label: 'Punchao', value: 'Punchao'}, {label: 'Puños', value: 'Puños'}, {label: 'Singa', value: 'Singa'}, {label: 'Tantamayo', value: 'Tantamayo'}, {label: 'Rupa-Rupa', value: 'Rupa-Rupa'}, {label: 'Daniel Alomía Robles', value: 'Daniel Alomía Robles'}, {label: 'Hermílio Valdizan', value: 'Hermílio Valdizan'}, {label: 'José Crespo y Castillo', value: 'José Crespo y Castillo'}, {label: 'Luyando', value: 'Luyando'}, {label: 'Mariano Damaso Beraun', value: 'Mariano Damaso Beraun'}, {label: 'Huacrachuco', value: 'Huacrachuco'}, {label: 'Cholon', value: 'Cholon'}, {label: 'San Buenaventura', value: 'San Buenaventura'}, {label: 'Panao', value: 'Panao'}, {label: 'Chaglla', value: 'Chaglla'}, {label: 'Molino', value: 'Molino'}, {label: 'Umari', value: 'Umari'}, {label: 'Puerto Inca', value: 'Puerto Inca'}, {label: 'Codo del Pozuzo', value: 'Codo del Pozuzo'}, {label: 'Honoria', value: 'Honoria'}, {label: 'Tournavista', value: 'Tournavista'}, {label: 'Yuyapichis', value: 'Yuyapichis'}, {label: 'Jesús', value: 'Jesús'},
        {label: 'Baños', value: 'Baños'}, {label: 'Jivia', value: 'Jivia'}, {label: 'Queropalca', value: 'Queropalca'}, {label: 'Rondos', value: 'Rondos'}, {label: 'San Francisco de Asís', value: 'San Francisco de Asís'}, {label: 'San Miguel de Cauri', value: 'San Miguel de Cauri'}, {label: 'Chavinillo', value: 'Chavinillo'}, {label: 'Cahuac', value: 'Cahuac'}, {label: 'Chacabamba', value: 'Chacabamba'}, {label: 'Aparicio Pomares', value: 'Aparicio Pomares'}, {label: 'Jacas Chico', value: 'Jacas Chico'}, {label: 'Obas', value: 'Obas'}, {label: 'Pampamarca', value: 'Pampamarca'}, {label: 'Choras', value: 'Choras'}, {label: 'Ica', value: 'Ica'}, {label: 'La Tinguiña', value: 'La Tinguiña'}, {label: 'Los Aquijes', value: 'Los Aquijes'}, {label: 'Ocucaje', value: 'Ocucaje'}, {label: 'Pachacutec', value: 'Pachacutec'}, {label: 'Parcona', value: 'Parcona'}, {label: 'Pueblo Nuevo', value: 'Pueblo Nuevo'}, {label: 'Salas', value: 'Salas'}, {label: 'San José de Los Molinos', value: 'San José de Los Molinos'}, {label: 'San Juan Bautista', value: 'San Juan Bautista'}, {label: 'Santiago', value: 'Santiago'}, {label: 'Subtanjalla', value: 'Subtanjalla'}, {label: 'Tate', value: 'Tate'}, {label: 'Yauca del Rosario', value: 'Yauca del Rosario'}, {label: 'Chincha Alta', value: 'Chincha Alta'}, {label: 'Alto Laran', value: 'Alto Laran'}, {label: 'Chavin', value: 'Chavin'}, {label: 'Chincha Baja', value: 'Chincha Baja'}, {label: 'El Carmen', value: 'El Carmen'}, {label: 'Grocio Prado', value: 'Grocio Prado'}, {label: 'Pueblo Nuevo', value: 'Pueblo Nuevo'}, {label: 'San Juan de Yanac', value: 'San Juan de Yanac'}, {label: 'San Pedro de Huacarpana', value: 'San Pedro de Huacarpana'},
        {label: 'Sunampe', value: 'Sunampe'}, {label: 'Tambo de Mora', value: 'Tambo de Mora'}, {label: 'Nasca', value: 'Nasca'}, {label: 'Changuillo', value: 'Changuillo'}, {label: 'El Ingenio', value: 'El Ingenio'}, {label: 'Marcona', value: 'Marcona'}, {label: 'Vista Alegre', value: 'Vista Alegre'}, {label: 'Palpa', value: 'Palpa'}, {label: 'Llipata', value: 'Llipata'}, {label: 'Río Grande', value: 'Río Grande'}, {label: 'Santa Cruz', value: 'Santa Cruz'}, {label: 'Tibillo', value: 'Tibillo'}, {label: 'Pisco', value: 'Pisco'}, {label: 'Huancano', value: 'Huancano'}, {label: 'Humay', value: 'Humay'}, {label: 'Independencia', value: 'Independencia'}, {label: 'Paracas', value: 'Paracas'}, {label: 'San Andrés', value: 'San Andrés'}, {label: 'San Clemente', value: 'San Clemente'}, {label: 'Tupac Amaru Inca', value: 'Tupac Amaru Inca'}, {label: 'Huancayo', value: 'Huancayo'}, {label: 'Carhuacallanga', value: 'Carhuacallanga'}, {label: 'Chacapampa', value: 'Chacapampa'}, {label: 'Chicche', value: 'Chicche'}, {label: 'Chilca', value: 'Chilca'}, {label: 'Chongos Alto', value: 'Chongos Alto'}, {label: 'Chupuro', value: 'Chupuro'}, {label: 'Colca', value: 'Colca'}, {label: 'Cullhuas', value: 'Cullhuas'}, {label: 'El Tambo', value: 'El Tambo'}, {label: 'Huacrapuquio', value: 'Huacrapuquio'}, {label: 'Hualhuas', value: 'Hualhuas'}, {label: 'Huancan', value: 'Huancan'}, {label: 'Huasicancha', value: 'Huasicancha'}, {label: 'Huayucachi', value: 'Huayucachi'}, {label: 'Ingenio', value: 'Ingenio'}, {label: 'Pariahuanca', value: 'Pariahuanca'}, {label: 'Pilcomayo', value: 'Pilcomayo'}, {label: 'Pucara', value: 'Pucara'}, {label: 'Quichuay', value: 'Quichuay'}, {label: 'Quilcas', value: 'Quilcas'},
        {label: 'San Agustín', value: 'San Agustín'}, {label: 'San Jerónimo de Tunan', value: 'San Jerónimo de Tunan'}, {label: 'Saño', value: 'Saño'}, {label: 'Sapallanga', value: 'Sapallanga'}, {label: 'Sicaya', value: 'Sicaya'}, {label: 'Santo Domingo de Acobamba', value: 'Santo Domingo de Acobamba'}, {label: 'Viques', value: 'Viques'}, {label: 'Concepción', value: 'Concepción'}, {label: 'Aco', value: 'Aco'}, {label: 'Andamarca', value: 'Andamarca'}, {label: 'Chambara', value: 'Chambara'}, {label: 'Cochas', value: 'Cochas'}, {label: 'Comas', value: 'Comas'}, {label: 'Heroínas Toledo', value: 'Heroínas Toledo'}, {label: 'Manzanares', value: 'Manzanares'}, {label: 'Mariscal Castilla', value: 'Mariscal Castilla'}, {label: 'Matahuasi', value: 'Matahuasi'}, {label: 'Mito', value: 'Mito'}, {label: 'Nueve de Julio', value: 'Nueve de Julio'}, {label: 'Orcotuna', value: 'Orcotuna'}, {label: 'San José de Quero', value: 'San José de Quero'}, {label: 'Santa Rosa de Ocopa', value: 'Santa Rosa de Ocopa'}, {label: 'Chanchamayo', value: 'Chanchamayo'}, {label: 'Perene', value: 'Perene'}, {label: 'Pichanaqui', value: 'Pichanaqui'}, {label: 'San Luis de Shuaro', value: 'San Luis de Shuaro'}, {label: 'San Ramón', value: 'San Ramón'}, {label: 'Vitoc', value: 'Vitoc'}, {label: 'Jauja', value: 'Jauja'}, {label: 'Acolla', value: 'Acolla'}, {label: 'Apata', value: 'Apata'}, {label: 'Ataura', value: 'Ataura'}, {label: 'Canchayllo', value: 'Canchayllo'}, {label: 'Curicaca', value: 'Curicaca'}, {label: 'El Mantaro', value: 'El Mantaro'}, {label: 'Huamali', value: 'Huamali'}, {label: 'Huaripampa', value: 'Huaripampa'}, {label: 'Huertas', value: 'Huertas'},
        {label: 'Janjaillo', value: 'Janjaillo'}, {label: 'Julcán', value: 'Julcán'}, {label: 'Leonor Ordóñez', value: 'Leonor Ordóñez'}, {label: 'Llocllapampa', value: 'Llocllapampa'}, {label: 'Marco', value: 'Marco'}, {label: 'Masma', value: 'Masma'}, {label: 'Masma Chicche', value: 'Masma Chicche'}, {label: 'Molinos', value: 'Molinos'}, {label: 'Monobamba', value: 'Monobamba'}, {label: 'Muqui', value: 'Muqui'}, {label: 'Muquiyauyo', value: 'Muquiyauyo'}, {label: 'Paca', value: 'Paca'}, {label: 'Paccha', value: 'Paccha'}, {label: 'Pancan', value: 'Pancan'}, {label: 'Parco', value: 'Parco'}, {label: 'Pomacancha', value: 'Pomacancha'}, {label: 'Ricran', value: 'Ricran'}, {label: 'San Lorenzo', value: 'San Lorenzo'}, {label: 'San Pedro de Chunan', value: 'San Pedro de Chunan'}, {label: 'Sausa', value: 'Sausa'}, {label: 'Sincos', value: 'Sincos'}, {label: 'Tunan Marca', value: 'Tunan Marca'}, {label: 'Yauli', value: 'Yauli'}, {label: 'Yauyos', value: 'Yauyos'}, {label: 'Junin', value: 'Junin'}, {label: 'Carhuamayo', value: 'Carhuamayo'}, {label: 'Ondores', value: 'Ondores'}, {label: 'Ulcumayo', value: 'Ulcumayo'}, {label: 'Satipo', value: 'Satipo'}, {label: 'Coviriali', value: 'Coviriali'}, {label: 'Llaylla', value: 'Llaylla'}, {label: 'Mazamari', value: 'Mazamari'}, {label: 'Pampa Hermosa', value: 'Pampa Hermosa'}, {label: 'Pangoa', value: 'Pangoa'}, {label: 'Río Negro', value: 'Río Negro'}, {label: 'Río Tambo', value: 'Río Tambo'}, {label: 'Vizcatan del Ene', value: 'Vizcatan del Ene'}, {label: 'Tarma', value: 'Tarma'}, {label: 'Acobamba', value: 'Acobamba'}, {label: 'Huaricolca', value: 'Huaricolca'}, {label: 'Huasahuasi', value: 'Huasahuasi'}, {label: 'La Unión', value: 'La Unión'},
        {label: 'Palca', value: 'Palca'}, {label: 'Palcamayo', value: 'Palcamayo'}, {label: 'San Pedro de Cajas', value: 'San Pedro de Cajas'}, {label: 'Tapo', value: 'Tapo'}, {label: 'La Oroya', value: 'La Oroya'}, {label: 'Chacapalpa', value: 'Chacapalpa'}, {label: 'Huay-Huay', value: 'Huay-Huay'}, {label: 'Marcapomacocha', value: 'Marcapomacocha'}, {label: 'Morococha', value: 'Morococha'}, {label: 'Paccha', value: 'Paccha'}, {label: 'Santa Bárbara de Carhuacayan', value: 'Santa Bárbara de Carhuacayan'}, {label: 'Santa Rosa de Sacco', value: 'Santa Rosa de Sacco'}, {label: 'Suitucancha', value: 'Suitucancha'}, {label: 'Yauli', value: 'Yauli'}, {label: 'Chupaca', value: 'Chupaca'}, {label: 'Ahuac', value: 'Ahuac'}, {label: 'Chongos Bajo', value: 'Chongos Bajo'}, {label: 'Huachac', value: 'Huachac'}, {label: 'Huamancaca Chico', value: 'Huamancaca Chico'}, {label: 'San Juan de Iscos', value: 'San Juan de Iscos'}, {label: 'San Juan de Jarpa', value: 'San Juan de Jarpa'}, {label: 'Tres de Diciembre', value: 'Tres de Diciembre'}, {label: 'Yanacancha', value: 'Yanacancha'}, {label: 'Trujillo', value: 'Trujillo'}, {label: 'El Porvenir', value: 'El Porvenir'}, {label: 'Florencia de Mora', value: 'Florencia de Mora'}, {label: 'Huanchaco', value: 'Huanchaco'}, {label: 'La Esperanza', value: 'La Esperanza'}, {label: 'Laredo', value: 'Laredo'}, {label: 'Moche', value: 'Moche'}, {label: 'Poroto', value: 'Poroto'}, {label: 'Salaverry', value: 'Salaverry'}, {label: 'Simbal', value: 'Simbal'}, {label: 'Victor Larco Herrera', value: 'Victor Larco Herrera'}, {label: 'Ascope', value: 'Ascope'}, {label: 'Chicama', value: 'Chicama'}, {label: 'Chocope', value: 'Chocope'}, {label: 'Magdalena de Cao', value: 'Magdalena de Cao'}, {label: 'Paijan', value: 'Paijan'}, {label: 'Rázuri', value: 'Rázuri'}, {label: 'Santiago de Cao', value: 'Santiago de Cao'},
        {label: 'Casa Grande', value: 'Casa Grande'}, {label: 'Bolívar', value: 'Bolívar'}, {label: 'Bambamarca', value: 'Bambamarca'}, {label: 'Condormarca', value: 'Condormarca'}, {label: 'Longotea', value: 'Longotea'}, {label: 'Uchumarca', value: 'Uchumarca'}, {label: 'Ucuncha', value: 'Ucuncha'}, {label: 'Chepen', value: 'Chepen'}, {label: 'Pacanga', value: 'Pacanga'}, {label: 'Pueblo Nuevo', value: 'Pueblo Nuevo'}, {label: 'Julcan', value: 'Julcan'}, {label: 'Calamarca', value: 'Calamarca'}, {label: 'Carabamba', value: 'Carabamba'}, {label: 'Huaso', value: 'Huaso'}, {label: 'Otuzco', value: 'Otuzco'}, {label: 'Agallpampa', value: 'Agallpampa'}, {label: 'Charat', value: 'Charat'}, {label: 'Huaranchal', value: 'Huaranchal'}, {label: 'La Cuesta', value: 'La Cuesta'}, {label: 'Mache', value: 'Mache'}, {label: 'Paranday', value: 'Paranday'}, {label: 'Salpo', value: 'Salpo'}, {label: 'Sinsicap', value: 'Sinsicap'}, {label: 'Usquil', value: 'Usquil'}, {label: 'San Pedro de Lloc', value: 'San Pedro de Lloc'}, {label: 'Guadalupe', value: 'Guadalupe'}, {label: 'Jequetepeque', value: 'Jequetepeque'}, {label: 'Pacasmayo', value: 'Pacasmayo'}, {label: 'San José', value: 'San José'}, {label: 'Tayabamba', value: 'Tayabamba'}, {label: 'Buldibuyo', value: 'Buldibuyo'}, {label: 'Chillia', value: 'Chillia'}, {label: 'Huancaspata', value: 'Huancaspata'}, {label: 'Huaylillas', value: 'Huaylillas'}, {label: 'Huayo', value: 'Huayo'}, {label: 'Ongon', value: 'Ongon'},
        {label: 'Parcoy', value: 'Parcoy'}, {label: 'Pataz', value: 'Pataz'}, {label: 'Pias', value: 'Pias'}, {label: 'Santiago de Challas', value: 'Santiago de Challas'}, {label: 'Taurija', value: 'Taurija'}, {label: 'Urpay', value: 'Urpay'}, {label: 'Huamachuco', value: 'Huamachuco'}, {label: 'Chugay', value: 'Chugay'}, {label: 'Cochorco', value: 'Cochorco'}, {label: 'Curgos', value: 'Curgos'}, {label: 'Marcabal', value: 'Marcabal'}, {label: 'Sanagoran', value: 'Sanagoran'}, {label: 'Sarin', value: 'Sarin'}, {label: 'Sartimbamba', value: 'Sartimbamba'}, {label: 'Santiago de Chuco', value: 'Santiago de Chuco'}, {label: 'Angasmarca', value: 'Angasmarca'}, {label: 'Cachicadan', value: 'Cachicadan'}, {label: 'Mollebamba', value: 'Mollebamba'}, {label: 'Mollepata', value: 'Mollepata'}, {label: 'Quiruvilca', value: 'Quiruvilca'}, {label: 'Santa Cruz de Chuca', value: 'Santa Cruz de Chuca'}, {label: 'Sitabamba', value: 'Sitabamba'}, {label: 'Cascas', value: 'Cascas'}, {label: 'Lucma', value: 'Lucma'}, {label: 'Marmot', value: 'Marmot'}, {label: 'Sayapullo', value: 'Sayapullo'}, {label: 'Viru', value: 'Viru'}, {label: 'Chao', value: 'Chao'}, {label: 'Guadalupito', value: 'Guadalupito'}, {label: 'Chiclayo', value: 'Chiclayo'}, {label: 'Chongoyape', value: 'Chongoyape'}, {label: 'Eten', value: 'Eten'}, {label: 'Eten Puerto', value: 'Eten Puerto'}, {label: 'José Leonardo Ortiz', value: 'José Leonardo Ortiz'}, {label: 'La Victoria', value: 'La Victoria'}, {label: 'Lagunas', value: 'Lagunas'}, {label: 'Monsefu', value: 'Monsefu'}, {label: 'Nueva Arica', value: 'Nueva Arica'},
        {label: 'Oyotun', value: 'Oyotun'}, {label: 'Picsi', value: 'Picsi'}, {label: 'Pimentel', value: 'Pimentel'}, {label: 'Reque', value: 'Reque'}, {label: 'Santa Rosa', value: 'Santa Rosa'}, {label: 'Saña', value: 'Saña'}, {label: 'Cayalti', value: 'Cayalti'}, {label: 'Patapo', value: 'Patapo'}, {label: 'Pomalca', value: 'Pomalca'}, {label: 'Pucala', value: 'Pucala'}, {label: 'Tuman', value: 'Tuman'}, {label: 'Ferreñafe', value: 'Ferreñafe'}, {label: 'Cañaris', value: 'Cañaris'}, {label: 'Incahuasi', value: 'Incahuasi'}, {label: 'Manuel Antonio Mesones Muro', value: 'Manuel Antonio Mesones Muro'}, {label: 'Pitipo', value: 'Pitipo'}, {label: 'Pueblo Nuevo', value: 'Pueblo Nuevo'}, {label: 'Lambayeque', value: 'Lambayeque'}, {label: 'Chochope', value: 'Chochope'}, {label: 'Illimo', value: 'Illimo'}, {label: 'Jayanca', value: 'Jayanca'}, {label: 'Mochumi', value: 'Mochumi'}, {label: 'Morrope', value: 'Morrope'}, {label: 'Motupe', value: 'Motupe'}, {label: 'Olmos', value: 'Olmos'}, {label: 'Pacora', value: 'Pacora'}, {label: 'Salas', value: 'Salas'}, {label: 'San José', value: 'San José'}, {label: 'Tucume', value: 'Tucume'}, {label: 'Lima', value: 'Lima'}, {label: 'Ancón', value: 'Ancón'}, {label: 'Ate', value: 'Ate'}, {label: 'Barranco', value: 'Barranco'}, {label: 'Breña', value: 'Breña'}, {label: 'Carabayllo', value: 'Carabayllo'}, {label: 'Chaclacayo', value: 'Chaclacayo'}, {label: 'Chorrillos', value: 'Chorrillos'}, {label: 'Cieneguilla', value: 'Cieneguilla'}, {label: 'Comas', value: 'Comas'}, {label: 'El Agustino', value: 'El Agustino'}, {label: 'Independencia', value: 'Independencia'},
        {label: 'Jesús María', value: 'Jesús María'}, {label: 'La Molina', value: 'La Molina'}, {label: 'La Victoria', value: 'La Victoria'}, {label: 'Lince', value: 'Lince'}, {label: 'Los Olivos', value: 'Los Olivos'}, {label: 'Lurigancho', value: 'Lurigancho'}, {label: 'Lurin', value: 'Lurin'}, {label: 'Magdalena del Mar', value: 'Magdalena del Mar'}, {label: 'Pueblo Libre', value: 'Pueblo Libre'}, {label: 'Miraflores', value: 'Miraflores'}, {label: 'Pachacamac', value: 'Pachacamac'}, {label: 'Pucusana', value: 'Pucusana'}, {label: 'Puente Piedra', value: 'Puente Piedra'}, {label: 'Punta Hermosa', value: 'Punta Hermosa'}, {label: 'Punta Negra', value: 'Punta Negra'}, {label: 'Rímac', value: 'Rímac'}, {label: 'San Bartolo', value: 'San Bartolo'}, {label: 'San Borja', value: 'San Borja'}, {label: 'San Isidro', value: 'San Isidro'}, {label: 'San Juan de Lurigancho', value: 'San Juan de Lurigancho'}, {label: 'San Juan de Miraflores', value: 'San Juan de Miraflores'}, {label: 'San Luis', value: 'San Luis'}, {label: 'San Martín de Porres', value: 'San Martín de Porres'}, {label: 'San Miguel', value: 'San Miguel'}, {label: 'Santa Anita', value: 'Santa Anita'}, {label: 'Santa María del Mar', value: 'Santa María del Mar'}, {label: 'Santa Rosa', value: 'Santa Rosa'}, {label: 'Santiago de Surco', value: 'Santiago de Surco'}, {label: 'Surquillo', value: 'Surquillo'}, {label: 'Villa El Salvador', value: 'Villa El Salvador'}, {label: 'Villa María del Triunfo', value: 'Villa María del Triunfo'}, {label: 'Barranca', value: 'Barranca'}, {label: 'Paramonga', value: 'Paramonga'}, {label: 'Pativilca', value: 'Pativilca'}, {label: 'Supe', value: 'Supe'}, {label: 'Supe Puerto', value: 'Supe Puerto'}, {label: 'Cajatambo', value: 'Cajatambo'}, {label: 'Copa', value: 'Copa'}, 
        {label: 'Gorgor', value: 'Gorgor'}, {label: 'Huancapon', value: 'Huancapon'}, {label: 'Manas', value: 'Manas'}, {label: 'Canta', value: 'Canta'}, {label: 'Arahuay', value: 'Arahuay'}, {label: 'Huamantanga', value: 'Huamantanga'}, {label: 'Huaros', value: 'Huaros'}, {label: 'Lachaqui', value: 'Lachaqui'}, {label: 'San Buenaventura', value: 'San Buenaventura'}, {label: 'Santa Rosa de Quives', value: 'Santa Rosa de Quives'}, {label: 'San Vicente de Cañete', value: 'San Vicente de Cañete'}, {label: 'Asia', value: 'Asia'}, {label: 'Calango', value: 'Calango'}, {label: 'Cerro Azul', value: 'Cerro Azul'}, {label: 'Chilca', value: 'Chilca'}, {label: 'Coayllo', value: 'Coayllo'}, {label: 'Imperial', value: 'Imperial'}, {label: 'Lunahuana', value: 'Lunahuana'}, {label: 'Mala', value: 'Mala'}, {label: 'Nuevo Imperial', value: 'Nuevo Imperial'}, {label: 'Pacaran', value: 'Pacaran'}, {label: 'Quilmana', value: 'Quilmana'}, {label: 'San Antonio', value: 'San Antonio'}, {label: 'San Luis', value: 'San Luis'}, {label: 'Santa Cruz de Flores', value: 'Santa Cruz de Flores'}, {label: 'Zúñiga', value: 'Zúñiga'}, {label: 'Huaral', value: 'Huaral'}, {label: 'Atavillos Alto', value: 'Atavillos Alto'}, {label: 'Atavillos Bajo', value: 'Atavillos Bajo'}, {label: 'Aucallama', value: 'Aucallama'}, {label: 'Chancay', value: 'Chancay'}, {label: 'Ihuari', value: 'Ihuari'}, {label: 'Lampian', value: 'Lampian'}, {label: 'Pacaraos', value: 'Pacaraos'}, {label: 'San Miguel de Acos', value: 'San Miguel de Acos'}, {label: 'Santa Cruz de Andamarca', value: 'Santa Cruz de Andamarca'}, {label: 'Sumbilca', value: 'Sumbilca'}, {label: 'Veintisiete de Noviembre', value: 'Veintisiete de Noviembre'}, {label: 'Matucana', value: 'Matucana'}, {label: 'Antioquia', value: 'Antioquia'}, 
        {label: 'Callahuanca', value: 'Callahuanca'}, {label: 'Carampoma', value: 'Carampoma'}, {label: 'Chicla', value: 'Chicla'}, {label: 'Cuenca', value: 'Cuenca'}, {label: 'Huachupampa', value: 'Huachupampa'}, {label: 'Huanza', value: 'Huanza'}, {label: 'Huarochiri', value: 'Huarochiri'}, {label: 'Lahuaytambo', value: 'Lahuaytambo'}, {label: 'Langa', value: 'Langa'}, {label: 'Laraos', value: 'Laraos'}, {label: 'Mariatana', value: 'Mariatana'}, {label: 'Ricardo Palma', value: 'Ricardo Palma'}, {label: 'San Andrés de Tupicocha', value: 'San Andrés de Tupicocha'}, {label: 'San Antonio', value: 'San Antonio'}, {label: 'San Bartolomé', value: 'San Bartolomé'}, {label: 'San Damian', value: 'San Damian'}, {label: 'San Juan de Iris', value: 'San Juan de Iris'}, {label: 'San Juan de Tantaranche', value: 'San Juan de Tantaranche'}, {label: 'San Lorenzo de Quinti', value: 'San Lorenzo de Quinti'}, {label: 'San Mateo', value: 'San Mateo'}, {label: 'San Mateo de Otao', value: 'San Mateo de Otao'}, {label: 'San Pedro de Casta', value: 'San Pedro de Casta'}, {label: 'San Pedro de Huancayre', value: 'San Pedro de Huancayre'}, {label: 'Sangallaya', value: 'Sangallaya'}, {label: 'Santa Cruz de Cocachacra', value: 'Santa Cruz de Cocachacra'}, {label: 'Santa Eulalia', value: 'Santa Eulalia'}, {label: 'Santiago de Anchucaya', value: 'Santiago de Anchucaya'}, {label: 'Santiago de Tuna', value: 'Santiago de Tuna'}, {label: 'Santo Domingo de Los Olleros', value: 'Santo Domingo de Los Olleros'}, {label: 'Surco', value: 'Surco'}, {label: 'Huacho', value: 'Huacho'}, {label: 'Ambar', value: 'Ambar'}, {label: 'Caleta de Carquin', value: 'Caleta de Carquin'}, {label: 'Checras', value: 'Checras'}, {label: 'Hualmay', value: 'Hualmay'}, {label: 'Huaura', value: 'Huaura'}, 
        {label: 'Leoncio Prado', value: 'Leoncio Prado'}, {label: 'Paccho', value: 'Paccho'}, {label: 'Santa Leonor', value: 'Santa Leonor'}, {label: 'Santa María', value: 'Santa María'}, {label: 'Sayan', value: 'Sayan'}, {label: 'Vegueta', value: 'Vegueta'}, {label: 'Oyon', value: 'Oyon'}, {label: 'Andajes', value: 'Andajes'}, {label: 'Caujul', value: 'Caujul'}, {label: 'Cochamarca', value: 'Cochamarca'}, {label: 'Navan', value: 'Navan'}, {label: 'Pachangara', value: 'Pachangara'}, {label: 'Yauyos', value: 'Yauyos'}, {label: 'Alis', value: 'Alis'}, {label: 'Allauca', value: 'Allauca'}, {label: 'Ayaviri', value: 'Ayaviri'}, {label: 'Azángaro', value: 'Azángaro'}, {label: 'Cacra', value: 'Cacra'}, {label: 'Carania', value: 'Carania'}, {label: 'Catahuasi', value: 'Catahuasi'}, {label: 'Chocos', value: 'Chocos'}, {label: 'Cochas', value: 'Cochas'}, {label: 'Colonia', value: 'Colonia'}, {label: 'Hongos', value: 'Hongos'}, {label: 'Huampara', value: 'Huampara'}, {label: 'Huancaya', value: 'Huancaya'}, {label: 'Huangascar', value: 'Huangascar'}, {label: 'Huantan', value: 'Huantan'}, {label: 'Huañec', value: 'Huañec'}, {label: 'Laraos', value: 'Laraos'}, {label: 'Lincha', value: 'Lincha'}, {label: 'Madean', value: 'Madean'}, {label: 'Miraflores', value: 'Miraflores'}, {label: 'Omas', value: 'Omas'}, {label: 'Putinza', value: 'Putinza'}, {label: 'Quinches', value: 'Quinches'}, {label: 'Quinocay', value: 'Quinocay'}, {label: 'San Joaquín', value: 'San Joaquín'}, {label: 'San Pedro de Pilas', value: 'San Pedro de Pilas'}, {label: 'Tanta', value: 'Tanta'}, {label: 'Tauripampa', value: 'Tauripampa'}, {label: 'Tomas', value: 'Tomas'}, {label: 'Tupe', value: 'Tupe'}, {label: 'Viñac', value: 'Viñac'}, {label: 'Vitis', value: 'Vitis'}, {label: 'Iquitos', value: 'Iquitos'}, 
        {label: 'Alto Nanay', value: 'Alto Nanay'}, {label: 'Fernando Lores', value: 'Fernando Lores'}, {label: 'Indiana', value: 'Indiana'}, {label: 'Las Amazonas', value: 'Las Amazonas'}, {label: 'Mazan', value: 'Mazan'}, {label: 'Napo', value: 'Napo'}, {label: 'Punchana', value: 'Punchana'}, {label: 'Torres Causana', value: 'Torres Causana'}, {label: 'Belén', value: 'Belén'}, {label: 'San Juan Bautista', value: 'San Juan Bautista'}, {label: 'Yurimaguas', value: 'Yurimaguas'}, {label: 'Balsapuerto', value: 'Balsapuerto'}, {label: 'Jeberos', value: 'Jeberos'}, {label: 'Lagunas', value: 'Lagunas'}, {label: 'Santa Cruz', value: 'Santa Cruz'}, {label: 'Teniente Cesar López Rojas', value: 'Teniente Cesar López Rojas'}, {label: 'Nauta', value: 'Nauta'}, {label: 'Parinari', value: 'Parinari'}, {label: 'Tigre', value: 'Tigre'}, {label: 'Trompeteros', value: 'Trompeteros'}, {label: 'Urarinas', value: 'Urarinas'}, {label: 'Ramón Castilla', value: 'Ramón Castilla'}, {label: 'Pebas', value: 'Pebas'}, {label: 'Yavari', value: 'Yavari'}, {label: 'San Pablo', value: 'San Pablo'}, {label: 'Requena', value: 'Requena'}, {label: 'Alto Tapiche', value: 'Alto Tapiche'}, {label: 'Capelo', value: 'Capelo'}, {label: 'Emilio San Martín', value: 'Emilio San Martín'}, {label: 'Maquia', value: 'Maquia'}, {label: 'Puinahua', value: 'Puinahua'}, {label: 'Saquena', value: 'Saquena'}, {label: 'Soplin', value: 'Soplin'}, {label: 'Tapiche', value: 'Tapiche'}, {label: 'Jenaro Herrera', value: 'Jenaro Herrera'}, {label: 'Yaquerana', value: 'Yaquerana'}, {label: 'Contamana', value: 'Contamana'}, {label: 'Inahuaya', value: 'Inahuaya'}, {label: 'Padre Márquez', value: 'Padre Márquez'}, {label: 'Pampa Hermosa', value: 'Pampa Hermosa'}, {label: 'Sarayacu', value: 'Sarayacu'}, 
        {label: 'Vargas Guerra', value: 'Vargas Guerra'}, {label: 'Barranca', value: 'Barranca'}, {label: 'Cahuapanas', value: 'Cahuapanas'}, {label: 'Manseriche', value: 'Manseriche'}, {label: 'Morona', value: 'Morona'}, {label: 'Pastaza', value: 'Pastaza'}, {label: 'Andoas', value: 'Andoas'}, {label: 'Putumayo', value: 'Putumayo'}, {label: 'Rosa Panduro', value: 'Rosa Panduro'}, {label: 'Teniente Manuel Clavero', value: 'Teniente Manuel Clavero'}, {label: 'Yaguas', value: 'Yaguas'}, {label: 'Tambopata', value: 'Tambopata'}, {label: 'Inambari', value: 'Inambari'}, {label: 'Las Piedras', value: 'Las Piedras'}, {label: 'Laberinto', value: 'Laberinto'}, {label: 'Manu', value: 'Manu'}, {label: 'Fitzcarrald', value: 'Fitzcarrald'}, {label: 'Madre de Dios', value: 'Madre de Dios'}, {label: 'Huepetuhe', value: 'Huepetuhe'}, {label: 'Iñapari', value: 'Iñapari'}, {label: 'Iberia', value: 'Iberia'}, {label: 'Tahuamanu', value: 'Tahuamanu'}, {label: 'Moquegua', value: 'Moquegua'}, {label: 'Carumas', value: 'Carumas'}, {label: 'Cuchumbaya', value: 'Cuchumbaya'}, {label: 'Samegua', value: 'Samegua'}, {label: 'San Cristóbal', value: 'San Cristóbal'}, {label: 'Torata', value: 'Torata'}, {label: 'Omate', value: 'Omate'}, {label: 'Chojata', value: 'Chojata'}, {label: 'Coalaque', value: 'Coalaque'}, {label: 'Ichuña', value: 'Ichuña'}, {label: 'La Capilla', value: 'La Capilla'}, {label: 'Lloque', value: 'Lloque'}, {label: 'Matalaque', value: 'Matalaque'}, {label: 'Puquina', value: 'Puquina'}, {label: 'Quinistaquillas', value: 'Quinistaquillas'}, {label: 'Ubinas', value: 'Ubinas'}, {label: 'Yunga', value: 'Yunga'}, {label: 'Ilo', value: 'Ilo'}, {label: 'El Algarrobal', value: 'El Algarrobal'}, {label: 'Pacocha', value: 'Pacocha'}, {label: 'Chaupimarca', value: 'Chaupimarca'}, 
        {label: 'Huachon', value: 'Huachon'}, {label: 'Huariaca', value: 'Huariaca'}, {label: 'Huayllay', value: 'Huayllay'}, {label: 'Ninacaca', value: 'Ninacaca'}, {label: 'Pallanchacra', value: 'Pallanchacra'}, {label: 'Paucartambo', value: 'Paucartambo'}, {label: 'San Francisco de Asís de Yarusyacan', value: 'San Francisco de Asís de Yarusyacan'}, {label: 'Simon Bolívar', value: 'Simon Bolívar'}, {label: 'Ticlacayan', value: 'Ticlacayan'}, {label: 'Tinyahuarco', value: 'Tinyahuarco'}, {label: 'Vicco', value: 'Vicco'}, {label: 'Yanacancha', value: 'Yanacancha'}, {label: 'Yanahuanca', value: 'Yanahuanca'}, {label: 'Chacayan', value: 'Chacayan'}, {label: 'Goyllarisquizga', value: 'Goyllarisquizga'}, {label: 'Paucar', value: 'Paucar'}, {label: 'San Pedro de Pillao', value: 'San Pedro de Pillao'}, {label: 'Santa Ana de Tusi', value: 'Santa Ana de Tusi'}, {label: 'Tapuc', value: 'Tapuc'}, {label: 'Vilcabamba', value: 'Vilcabamba'}, {label: 'Oxapampa', value: 'Oxapampa'}, {label: 'Chontabamba', value: 'Chontabamba'}, {label: 'Huancabamba', value: 'Huancabamba'}, {label: 'Palcazu', value: 'Palcazu'}, {label: 'Pozuzo', value: 'Pozuzo'}, {label: 'Puerto Bermúdez', value: 'Puerto Bermúdez'}, {label: 'Villa Rica', value: 'Villa Rica'}, {label: 'Constitución', value: 'Constitución'}, {label: 'Piura', value: 'Piura'}, {label: 'Castilla', value: 'Castilla'}, {label: 'Atacaos', value: 'Atacaos'}, {label: 'Cura Mori', value: 'Cura Mori'}, {label: 'El Tallan', value: 'El Tallan'}, {label: 'La Arena', value: 'La Arena'}, {label: 'La Unión', value: 'La Unión'}, {label: 'Las Lomas', value: 'Las Lomas'}, {label: 'Tambo Grande', value: 'Tambo Grande'}, {label: 'Veintiseis de Octubre', value: 'Veintiseis de Octubre'}, {label: 'Ayabaca', value: 'Ayabaca'}, {label: 'Frias', value: 'Frias'}, 
        {label: 'Jilili', value: 'Jilili'}, {label: 'Lagunas', value: 'Lagunas'}, {label: 'Montero', value: 'Montero'}, {label: 'Pacaipampa', value: 'Pacaipampa'}, {label: 'Paimas', value: 'Paimas'}, {label: 'Sapillica', value: 'Sapillica'}, {label: 'Sicchez', value: 'Sicchez'}, {label: 'Suyo', value: 'Suyo'}, {label: 'Huancabamba', value: 'Huancabamba'}, {label: 'Canchaque', value: 'Canchaque'}, {label: 'El Carmen de la Frontera', value: 'El Carmen de la Frontera'}, {label: 'Huarmaca', value: 'Huarmaca'}, {label: 'Lalaquiz', value: 'Lalaquiz'}, {label: 'San Miguel de El Faique', value: 'San Miguel de El Faique'}, {label: 'Sondor', value: 'Sondor'}, {label: 'Sondorillo', value: 'Sondorillo'}, {label: 'Chulucanas', value: 'Chulucanas'}, {label: 'Buenos Aires', value: 'Buenos Aires'}, {label: 'Chalaco', value: 'Chalaco'}, {label: 'La Matanza', value: 'La Matanza'}, {label: 'Morropon', value: 'Morropon'}, {label: 'Salitral', value: 'Salitral'}, {label: 'San Juan de Bigote', value: 'San Juan de Bigote'}, {label: 'Santa Catalina de Mossa', value: 'Santa Catalina de Mossa'}, {label: 'Santo Domingo', value: 'Santo Domingo'}, {label: 'Yamango', value: 'Yamango'}, {label: 'Paita', value: 'Paita'}, {label: 'Amotape', value: 'Amotape'}, {label: 'Arenal', value: 'Arenal'}, {label: 'Colan', value: 'Colan'}, {label: 'La Huaca', value: 'La Huaca'}, {label: 'Tamarindo', value: 'Tamarindo'}, {label: 'Vichayal', value: 'Vichayal'}, {label: 'Sullana', value: 'Sullana'}, {label: 'Bellavista', value: 'Bellavista'}, {label: 'Ignacio Escudero', value: 'Ignacio Escudero'}, {label: 'Lancones', value: 'Lancones'}, {label: 'Marcavelica', value: 'Marcavelica'}, {label: 'Miguel Checa', value: 'Miguel Checa'}, {label: 'Querecotillo', value: 'Querecotillo'}, {label: 'Salitral', value: 'Salitral'}, 
        {label: 'Pariñas', value: 'Pariñas'}, {label: 'El Alto', value: 'El Alto'}, {label: 'La Brea', value: 'La Brea'}, {label: 'Lobitos', value: 'Lobitos'}, {label: 'Los Organos', value: 'Los Organos'}, {label: 'Mancora', value: 'Mancora'}, {label: 'Sechura', value: 'Sechura'}, {label: 'Bellavista de la Unión', value: 'Bellavista de la Unión'}, {label: 'Bernal', value: 'Bernal'}, {label: 'Cristo Nos Valga', value: 'Cristo Nos Valga'}, {label: 'Vice', value: 'Vice'}, {label: 'Rinconada Llicuar', value: 'Rinconada Llicuar'}, {label: 'Puno', value: 'Puno'}, {label: 'Acora', value: 'Acora'}, {label: 'Amantani', value: 'Amantani'}, {label: 'Atuncolla', value: 'Atuncolla'}, {label: 'Capachica', value: 'Capachica'}, {label: 'Chucuito', value: 'Chucuito'}, {label: 'Coata', value: 'Coata'}, {label: 'Huata', value: 'Huata'}, {label: 'Mañazo', value: 'Mañazo'}, {label: 'Paucarcolla', value: 'Paucarcolla'}, {label: 'Pichacani', value: 'Pichacani'}, {label: 'Plateria', value: 'Plateria'}, {label: 'San Antonio', value: 'San Antonio'}, {label: 'Tiquillaca', value: 'Tiquillaca'}, {label: 'Vilque', value: 'Vilque'}, {label: 'Azángaro', value: 'Azángaro'}, {label: 'Achaya', value: 'Achaya'}, {label: 'Arapa', value: 'Arapa'}, {label: 'Asillo', value: 'Asillo'}, {label: 'Caminaca', value: 'Caminaca'}, {label: 'Chupa', value: 'Chupa'}, {label: 'José Domingo Choquehuanca', value: 'José Domingo Choquehuanca'}, {label: 'Muñani', value: 'Muñani'}, {label: 'Potoni', value: 'Potoni'}, {label: 'Saman', value: 'Saman'}, {label: 'San Anton', value: 'San Anton'}, {label: 'San José', value: 'San José'}, {label: 'San Juan de Salinas', value: 'San Juan de Salinas'}, {label: 'Santiago de Pupuja', value: 'Santiago de Pupuja'}, {label: 'Tirapata', value: 'Tirapata'}, {label: 'Macusani', value: 'Macusani'}, 
        {label: 'Ajoyani', value: 'Ajoyani'}, {label: 'Ayapata', value: 'Ayapata'}, {label: 'Coasa', value: 'Coasa'}, {label: 'Corani', value: 'Corani'}, {label: 'Crucero', value: 'Crucero'}, {label: 'Ituata', value: 'Ituata'}, {label: 'Ollachea', value: 'Ollachea'}, {label: 'San Gaban', value: 'San Gaban'}, {label: 'Usicayos', value: 'Usicayos'}, {label: 'Juli', value: 'Juli'}, {label: 'Desaguadero', value: 'Desaguadero'}, {label: 'Huacullani', value: 'Huacullani'}, {label: 'Kelluyo', value: 'Kelluyo'}, {label: 'Pisacoma', value: 'Pisacoma'}, {label: 'Pomata', value: 'Pomata'}, {label: 'Zepita', value: 'Zepita'}, {label: 'Ilave', value: 'Ilave'}, {label: 'Capazo', value: 'Capazo'}, {label: 'Pilcuyo', value: 'Pilcuyo'}, {label: 'Santa Rosa', value: 'Santa Rosa'}, {label: 'Conduriri', value: 'Conduriri'}, {label: 'Huancane', value: 'Huancane'}, {label: 'Cojata', value: 'Cojata'}, {label: 'Huatasani', value: 'Huatasani'}, {label: 'Inchupalla', value: 'Inchupalla'}, {label: 'Pusi', value: 'Pusi'}, {label: 'Rosaspata', value: 'Rosaspata'}, {label: 'Taraco', value: 'Taraco'}, {label: 'Vilque Chico', value: 'Vilque Chico'}, {label: 'Lampa', value: 'Lampa'}, {label: 'Cabanilla', value: 'Cabanilla'}, {label: 'Calapuja', value: 'Calapuja'}, {label: 'Nicasio', value: 'Nicasio'}, {label: 'Ocuviri', value: 'Ocuviri'}, {label: 'Palca', value: 'Palca'}, {label: 'Paratia', value: 'Paratia'}, {label: 'Pucara', value: 'Pucara'}, {label: 'Santa Lucia', value: 'Santa Lucia'}, {label: 'Vilavila', value: 'Vilavila'}, {label: 'Ayaviri', value: 'Ayaviri'}, {label: 'Antauta', value: 'Antauta'}, {label: 'Cupi', value: 'Cupi'}, {label: 'Llalli', value: 'Llalli'}, {label: 'Macari', value: 'Macari'}, {label: 'Nuñoa', value: 'Nuñoa'}, {label: 'Orurillo', value: 'Orurillo'}, {label: 'Santa Rosa', value: 'Santa Rosa'}, 
        {label: 'Umachiri', value: 'Umachiri'}, {label: 'Moho', value: 'Moho'}, {label: 'Conima', value: 'Conima'}, {label: 'Huayrapata', value: 'Huayrapata'}, {label: 'Tilali', value: 'Tilali'}, {label: 'Putina', value: 'Putina'}, {label: 'Ananea', value: 'Ananea'}, {label: 'Pedro Vilca Apaza', value: 'Pedro Vilca Apaza'}, {label: 'Quilcapuncu', value: 'Quilcapuncu'}, {label: 'Sina', value: 'Sina'}, {label: 'Juliaca', value: 'Juliaca'}, {label: 'Cabana', value: 'Cabana'}, {label: 'Cabanillas', value: 'Cabanillas'}, {label: 'Caracoto', value: 'Caracoto'}, {label: 'Sandia', value: 'Sandia'}, {label: 'Cuyocuyo', value: 'Cuyocuyo'}, {label: 'Limbani', value: 'Limbani'}, {label: 'Patambuco', value: 'Patambuco'}, {label: 'Phara', value: 'Phara'}, {label: 'Quiaca', value: 'Quiaca'}, {label: 'San Juan del Oro', value: 'San Juan del Oro'}, {label: 'Yanahuaya', value: 'Yanahuaya'}, {label: 'Alto Inambari', value: 'Alto Inambari'}, {label: 'San Pedro de Putina Punco', value: 'San Pedro de Putina Punco'}, {label: 'Yunguyo', value: 'Yunguyo'}, {label: 'Anapia', value: 'Anapia'}, {label: 'Copani', value: 'Copani'}, {label: 'Cuturapi', value: 'Cuturapi'}, {label: 'Ollaraya', value: 'Ollaraya'}, {label: 'Tinicachi', value: 'Tinicachi'}, {label: 'Unicachi', value: 'Unicachi'}, {label: 'Moyobamba', value: 'Moyobamba'}, {label: 'Calzada', value: 'Calzada'}, {label: 'Habana', value: 'Habana'}, {label: 'Jepelacio', value: 'Jepelacio'}, {label: 'Soritor', value: 'Soritor'}, {label: 'Yantalo', value: 'Yantalo'}, {label: 'Bellavista', value: 'Bellavista'}, {label: 'Alto Biavo', value: 'Alto Biavo'}, {label: 'Bajo Biavo', value: 'Bajo Biavo'}, {label: 'Huallaga', value: 'Huallaga'}, {label: 'San Pablo', value: 'San Pablo'}, {label: 'San Rafael', value: 'San Rafael'}, {label: 'San José de Sisa', value: 'San José de Sisa'}, 
        {label: 'Agua Blanca', value: 'Agua Blanca'}, {label: 'San Martín', value: 'San Martín'}, {label: 'Santa Rosa', value: 'Santa Rosa'}, {label: 'Shatoja', value: 'Shatoja'}, {label: 'Saposoa', value: 'Saposoa'}, {label: 'Alto Saposoa', value: 'Alto Saposoa'}, {label: 'El Eslabón', value: 'El Eslabón'}, {label: 'Piscoyacu', value: 'Piscoyacu'}, {label: 'Sacanche', value: 'Sacanche'}, {label: 'Tingo de Saposoa', value: 'Tingo de Saposoa'}, {label: 'Lamas', value: 'Lamas'}, {label: 'Alonso de Alvarado', value: 'Alonso de Alvarado'}, {label: 'Barranquita', value: 'Barranquita'}, {label: 'Caynarachi', value: 'Caynarachi'}, {label: 'Cuñumbuqui', value: 'Cuñumbuqui'}, {label: 'Pinto Recodo', value: 'Pinto Recodo'}, {label: 'Rumisapa', value: 'Rumisapa'}, {label: 'San Roque de Cumbaza', value: 'San Roque de Cumbaza'}, {label: 'Shanao', value: 'Shanao'}, {label: 'Tabalosos', value: 'Tabalosos'}, {label: 'Zapatero', value: 'Zapatero'}, {label: 'Juanjuí', value: 'Juanjuí'}, {label: 'Campanilla', value: 'Campanilla'}, {label: 'Huicungo', value: 'Huicungo'}, {label: 'Pachiza', value: 'Pachiza'}, {label: 'Pajarillo', value: 'Pajarillo'}, {label: 'Picota', value: 'Picota'}, {label: 'Buenos Aires', value: 'Buenos Aires'}, {label: 'Caspisapa', value: 'Caspisapa'}, {label: 'Pilluana', value: 'Pilluana'}, {label: 'Pucacaca', value: 'Pucacaca'}, {label: 'San Cristóbal', value: 'San Cristóbal'}, {label: 'San Hilarión', value: 'San Hilarión'}, {label: 'Shamboyacu', value: 'Shamboyacu'}, {label: 'Tingo de Ponasa', value: 'Tingo de Ponasa'}, {label: 'Tres Unidos', value: 'Tres Unidos'}, {label: 'Rioja', value: 'Rioja'}, {label: 'Awajun', value: 'Awajun'}, {label: 'Elías Soplin Vargas', value: 'Elías Soplin Vargas'}, {label: 'Nueva Cajamarca', value: 'Nueva Cajamarca'}, {label: 'Pardo Miguel', value: 'Pardo Miguel'}, 
        {label: 'Posic', value: 'Posic'}, {label: 'San Fernando', value: 'San Fernando'}, {label: 'Yorongos', value: 'Yorongos'}, {label: 'Yuracyacu', value: 'Yuracyacu'}, {label: 'Tarapoto', value: 'Tarapoto'}, {label: 'Alberto Leveau', value: 'Alberto Leveau'}, {label: 'Cacatachi', value: 'Cacatachi'}, {label: 'Chazuta', value: 'Chazuta'}, {label: 'Chipurana', value: 'Chipurana'}, {label: 'El Porvenir', value: 'El Porvenir'}, {label: 'Huimbayoc', value: 'Huimbayoc'}, {label: 'Juan Guerra', value: 'Juan Guerra'}, {label: 'La Banda de Shilcayo', value: 'La Banda de Shilcayo'}, {label: 'Morales', value: 'Morales'}, {label: 'Papaplaya', value: 'Papaplaya'}, {label: 'San Antonio', value: 'San Antonio'}, {label: 'Sauce', value: 'Sauce'}, {label: 'Shapaja', value: 'Shapaja'}, {label: 'Tocache', value: 'Tocache'}, {label: 'Nuevo Progreso', value: 'Nuevo Progreso'}, {label: 'Polvora', value: 'Polvora'}, {label: 'Shunte', value: 'Shunte'}, {label: 'Uchiza', value: 'Uchiza'}, {label: 'Tacna', value: 'Tacna'}, {label: 'Alto de la Alianza', value: 'Alto de la Alianza'}, {label: 'Calana', value: 'Calana'}, {label: 'Ciudad Nueva', value: 'Ciudad Nueva'}, {label: 'Inclan', value: 'Inclan'}, {label: 'Pachia', value: 'Pachia'}, {label: 'Palca', value: 'Palca'}, {label: 'Pocollay', value: 'Pocollay'}, {label: 'Sama', value: 'Sama'}, {label: 'Coronel Gregorio Albarracín Lanchipa', value: 'Coronel Gregorio Albarracín Lanchipa'}, {label: 'Candarave', value: 'Candarave'}, {label: 'Cairani', value: 'Cairani'}, {label: 'Camilaca', value: 'Camilaca'}, {label: 'Curibaya', value: 'Curibaya'}, {label: 'Huanuara', value: 'Huanuara'}, {label: 'Quilahuani', value: 'Quilahuani'}, {label: 'Locumba', value: 'Locumba'}, {label: 'Ilabaya', value: 'Ilabaya'}, {label: 'Ite', value: 'Ite'}, {label: 'Tarata', value: 'Tarata'}, 
        {label: 'Héroes Albarracín', value: 'Héroes Albarracín'}, {label: 'Estique', value: 'Estique'}, {label: 'Estique-Pampa', value: 'Estique-Pampa'}, {label: 'Sitajara', value: 'Sitajara'}, {label: 'Susapaya', value: 'Susapaya'}, {label: 'Tarucachi', value: 'Tarucachi'}, {label: 'Ticaco', value: 'Ticaco'}, {label: 'Tumbes', value: 'Tumbes'}, {label: 'Corrales', value: 'Corrales'}, {label: 'La Cruz', value: 'La Cruz'}, {label: 'Pampas de Hospital', value: 'Pampas de Hospital'}, {label: 'San Jacinto', value: 'San Jacinto'}, {label: 'San Juan de la Virgen', value: 'San Juan de la Virgen'}, {label: 'Zorritos', value: 'Zorritos'}, {label: 'Casitas', value: 'Casitas'}, {label: 'Canoas de Punta Sal', value: 'Canoas de Punta Sal'}, {label: 'Zarumilla', value: 'Zarumilla'}, {label: 'Aguas Verdes', value: 'Aguas Verdes'}, {label: 'Matapalo', value: 'Matapalo'}, {label: 'Papayal', value: 'Papayal'}, {label: 'Calleria', value: 'Calleria'}, {label: 'Campoverde', value: 'Campoverde'}, {label: 'Iparia', value: 'Iparia'}, {label: 'Masisea', value: 'Masisea'}, {label: 'Yarinacocha', value: 'Yarinacocha'}, {label: 'Nueva Requena', value: 'Nueva Requena'}, {label: 'Manantay', value: 'Manantay'}, {label: 'Raymondi', value: 'Raymondi'}, {label: 'Sepahua', value: 'Sepahua'}, {label: 'Tahuania', value: 'Tahuania'}, {label: 'Yurua', value: 'Yurua'}, {label: 'Padre Abad', value: 'Padre Abad'}, {label: 'Irazola', value: 'Irazola'}, {label: 'Curimana', value: 'Curimana'}, {label: 'Neshuya', value: 'Neshuya'}, {label: 'Alexander Von Humboldt', value: 'Alexander Von Humboldt'}, {label: 'Purus', value: 'Purus'}     
      ],
      statuses6: [
        {label: 'Si', value: 'Si'},
        {label: 'No', value: 'No'}
      ],
      statuses7: [
        {label: 'DNI', value: 'DNI'},
        {label: 'CARNET DE EXTRANJERIA', value: 'CARNET DE EXTRANJERIA'}
      ],
      statuses8: [
        {label: 'Soltero(a)', value: 'Soltero(a)'},
        {label: 'Casado(a)', value: 'Casado(a)'},
        {label: 'Separado(a)', value: 'Separado(a)'},
      ],
      statuses9: [
        {label: 'Si', value: 'Si'},
        {label: 'No', value: 'No'}
      ],
      statuses10: [
        {label: 'DNI', value: 'DNI'},
        {label: 'CARNET DE EXTRANJERIA', value: 'CARNET DE EXTRANJERIA'}
      ],
      statuses11: [
        {label: 'Soltero(a)', value: 'Soltero(a)'},
        {label: 'Casado(a)', value: 'Casado(a)'},
        {label: 'Separado(a)', value: 'Separado(a)'},
      ],
      statuses12: [
        {label: 'Si', value: 'si'},
        {label: 'No', value: 'No'}
      ],
      statuses13: [
        {label: 'Masculino', value: 'Masculino'},
        {label: 'Femenino', value: 'Femenino'}
      ],
      submitted: false,
      estadoEdicion: false,
      verDialog: null,
      apoderados: {},
      DialogUsers: false,
      user: {},
      users: null,
      tipousuarios: null,
      Apaterno: '',
      Amaterno: '',
      estados: [
        {label:"Activo", value: 1},
        {label:"Inctivo", value: 0}
      ]
    }
  },
  created() {     
    this.initFilters();
  },
  mounted() {
    this.listaAlumnos()
    //this.$refs.dt.style.color = 'red';
  }, 
  methods: {
    async listaAlumnos() {
      const { data } = await alumnoService.listarAlumnos();
      this.alumnos = data.data;
      const apo = await apoderadoService.listarApoderados();
      this.apoderados = apo.data.data;
      const usu = await userService.listarUsuarios();
      this.users = usu.data;
      const tipousu = await tipousuarioService.listarTiposuarios();
      this.tipousuarios = tipousu.data;
    },
    abrirDialog() {
      this.alumno = {};
      this.submitted = false;
      this.dialog = true;
    },
    cerrarVerDialog() {
      this.verDialog = false;
    },
    cerrarDialog(){
      this.dialog = false;
      this.submitted = false;
    },
    cerrarUsers() {
      this.DialogUsers = false;
    },
    async guardarAlumnos() {
      let datos;
      if (this.estadoEdicion) {
        datos = await alumnoService.modificarAlumnos(this.alumno.id, this.alumno);
        this.alumno = datos;
      }
      else {
        datos = await alumnoService.guardarAlumnos(this.alumno);
        this.alumno = datos;        
      }
      if(!datos.data.error) {
        this.listaAlumnos();
        this.cerrarDialog();
        this.estadoEdicion = false;
        this.alumno = {};
      }
    },
    editarAlumnos(data) {
      this.alumno = data;
      this.estadoEdicion = true;
      this.dialog = true;
    },
    verAlumnos(data) {     
      this.alumno = data;      
      this.verDialog = true;
    },
    asignarUsers(data) {
      this.user = data;
      this.user.name = data.alu_nom;
      this.user.usu_dni = data.alu_nmr_doc;
      this.user.email = data.alu
      this.user.alumno_id = data.id;
      this.Apaterno = data.alu_app;
      this.Amaterno = data.alu_apm;
      this.DialogUsers = true;
    },
    async guardarUsers() {
      const { data } = await userService.guardarUsuarios(this.user);
      this.user = data;
      this.cerrarUsers();
      this.listaAlumnos();
    },
    confirmDeleteProduct(data) {
      this.$confirm.require({
        message: 'Esta seguro que desea eliminar ',
        header: 'Eliminar',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: async () => {
          data = await alumnoService.eliminarAlumnos(data.id)
          this.$toast.add({severity:'info', summary:'Eliminado', detail:'Aceptaste Eliminar', life: 3000});
          this.listaAlumnos();
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
            doc.text('Lista de Alumnos Inscritos', 80, 28);
            // Cabeceras y orden de las columnas
            const headers = [['Nombre', 'A. Paterno', 'A. Materno', 'DNI', 'Apoderado', 'Distrito', 'Genero', 'F.Nacimiento']];
            // Prepara los datos para la exportación
            const dataToExport = this.alumnos.map(row => [
                row.alu_nom || '',
                row.alu_app || '',
                row.alu_apm || '',
                row.alu_nmr_doc || '',
                row.apoderado.apo_nom || '',
                row.alu_distrito || '',
                row.alu_sexo || '',
                row.alu_fnac || ''
                //row.alu_estado === 1 ? 'Activo' : 'Inactivo'
            ]);
            // Generando la tabla en el PDF
            doc.autoTable({
                head: headers,
                body: dataToExport,
                startY: 40 // Ajusta la posición de inicio de la tabla según la altura del título y el logo
            });
            // Descarga archivo PDF
            doc.save('alumnos.pdf');
        },
        //reporte en excel
        exportToExcel() {
            // Define las cabeceras personalizadas y el orden de las columnas
            const headers = ['Nombre', 'A. Paterno', 'A. Materno', 'DNI', 'Apoderado', 'Distrito', 'Genero', 'F.Nacimiento'];            
            // Prepara los datos para la exportación
            const dataToExport = this.alumnos.map(row => ({            
                'Nombre': row.alu_nom || '',
                'A. Paterno': row.alu_app || '',
                'A. Materno': row.alu_apm || '',
                'DNI': row.alu_nmr_doc || '',
                'Apoderado': row.apoderado.apo_nom || '',
                'Distrito': row.alu_distrito || '',
                'Genero': row.alu_sexo || '',
                'F.Nacimiento': row.alu_fnac || ''
            }));
            // Crea una hoja de cálculo
            const worksheet = XLSX.utils.json_to_sheet(dataToExport, { header: headers });            
            // Crea un libro de trabajo
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Alumnos");
            // Convierte el libro de trabajo a un archivo Excel y descarga
            XLSX.writeFile(workbook, "alumnos.xlsx");
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