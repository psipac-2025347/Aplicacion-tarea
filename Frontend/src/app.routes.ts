import { Routes } from '@angular/router';
import { ClienteListComponent } from './cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClienteListComponent },
  { path: 'clientes/nuevo', component: ClienteFormComponent },
  { path: 'clientes/:codigoCliente/editar', component: ClienteFormComponent },
  { path: '**', redirectTo: 'clientes' }
];
