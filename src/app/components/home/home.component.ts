import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  usuarioConsultado: any;
  nombre: string | undefined;
  apellido: string | undefined;

  constructor( private router:Router, private servicioCognito: CognitoService) { }

  ngOnInit(): void {
      this.getDetalleUsuario();
  }

  private getDetalleUsuario() {
    this.servicioCognito.getUsuario()
    .then((usuario: any) => {
      if (usuario) {
        this.usuarioConsultado = usuario;
        this.nombre = this.usuarioConsultado.attributes.given_name;
        this.apellido = this.usuarioConsultado.attributes.family_name;
        console.log(usuario);
      }
      else {
        this.router.navigate(['/iniciar-sesion']);
      }
    })
  }

  cerrarSesion() {
    this.servicioCognito.cerrarSesion()
    .then(() => {
      this.router.navigate(['/iniciar-sesion']);
    })
  }

}
