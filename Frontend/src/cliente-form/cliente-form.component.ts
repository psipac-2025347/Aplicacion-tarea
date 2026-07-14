import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {
  formulario: FormGroup;
  esEdicion = false;
  codigoOriginal = '';
  guardando = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      codigoCliente: ['', Validators.required],
      nombreCliente: ['', Validators.required],
      direccionCliente: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const codigo = this.route.snapshot.paramMap.get('codigoCliente');
    if (codigo) {
      this.esEdicion = true;
      this.codigoOriginal = codigo;
      this.formulario.get('codigoCliente')?.disable();
      this.clienteService.obtener(codigo).subscribe({
        next: cliente => this.formulario.patchValue(cliente),
        error: () => (this.error = 'No se pudo cargar el cliente.')
      });
    }
  }

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const valores = this.formulario.getRawValue();

    const peticion = this.esEdicion
      ? this.clienteService.actualizar(this.codigoOriginal, valores)
      : this.clienteService.crear(valores);

    peticion.subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: () => {
        this.error = 'No se pudo guardar el cliente.';
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/clientes']);
  }
}