import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
selector: 'app-root',
standalone: true,
imports: [RouterOutlet, RouterLink, RouterLinkActive],
template: `
    <div class="shell">
    <header class="topbar">
        <span class="brand">Gestión<em>Clientes</em></span>
        <nav class="nav">
        <a routerLink="/clientes" routerLinkActive="activo" [routerLinkActiveOptions]="{ exact: true }">Listado</a>
        <a routerLink="/clientes/nuevo" routerLinkActive="activo">Nuevo cliente</a>
        </nav>
    </header>

    <main class="contenido">
        <router-outlet></router-outlet>
    </main>

    <footer class="pie">
        <div class="pie-linea"></div>
        <p class="pie-texto">Pablo Esteban Sipac Fuentes</p>
        <p class="pie-texto">2025347</p>
        <p class="pie-texto">IN5AV</p>
    </footer>
    </div>
`,
styleUrl: './appComponents.css'
})
export class AppComponent {}