import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent implements OnInit {
  clientes: Cliente[] = [];
  cargando = true;
  error = '';

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.clienteService.listar().subscribe({
      next: clientes => {
        this.clientes = clientes;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el listado de clientes.';
        this.cargando = false;
      }
    });
  }

  eliminar(codigoCliente: string): void {
    this.clienteService.eliminar(codigoCliente).subscribe({
      next: () => this.cargarClientes(),
      error: () => (this.error = 'No se pudo eliminar el cliente.')
    });
  }
}