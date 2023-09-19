import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent implements OnInit {

  usuario: Usuario | undefined;
  mensajeAlerta : string = '';
  mostrarAlerta : boolean = false;

  olvidoSuPassword: boolean = false;
  nuevaPassword: string = '';

  constructor( private router: Router, private servicioCognito: CognitoService) { }

  ngOnInit(): void {
      this.usuario = {} as Usuario;
  }

  iniciarSesionConCognito() {
    if (this.usuario && this.usuario.email && this.usuario.password) {
      this.servicioCognito.iniciarSesion(this.usuario)
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error:any) => {
        this.desplegarAlerta("Por favor ingrese un email o contraseña válido");
      })
    }
    else {
      this.desplegarAlerta("Por favor ingrese un email o contraseña válido");
    }
  }

  clicOlvidoPassword() {
    if (this.usuario && this.usuario.email) {
      this.servicioCognito.olvidoPassword(this.usuario)
      .then(() => {
        this.olvidoSuPassword = true;
      })
      .catch((error: any) => {
        this.desplegarAlerta(error.mensaje);
      })
    }
    else {
      this.desplegarAlerta("Por favor ingrese un email válido");
    }
  }

  nuevaPasswordSubmit() {
    if (this.usuario && this.usuario.email && this.nuevaPassword.length != 0) {
      this.servicioCognito.olvidoPasswordConfirmar(this.usuario, this.nuevaPassword.trim())
      .then(() => {
        this.desplegarAlerta("Contraseña actualizada!");
        this.olvidoSuPassword = false;
      })
      .catch((error: any) => {
        this.desplegarAlerta(error.mensaje);
      })
    }
    else {
      this.desplegarAlerta("Por favor ingrese una entrada válido");
    }
  }

  private desplegarAlerta(mensaje: string) {
    this.mensajeAlerta = mensaje;
    this.mostrarAlerta = true;
  }


}
