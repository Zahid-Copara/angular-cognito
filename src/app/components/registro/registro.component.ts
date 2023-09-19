import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario | undefined;
  estaConfirmado: boolean = false;
  mensajeAlerta: string = '';
  mostrarAlerta: boolean = false;

  constructor(private router:Router, private servicioCognito: CognitoService) { }

  ngOnInit(): void {
      this.usuario = { } as Usuario;
      this.estaConfirmado = false;
  }

  public registroConCognito() {
    if (this.usuario && this.usuario.email && this.usuario.password) {
      this.servicioCognito.registro(this.usuario)
      .then(() => {
        this.estaConfirmado = true;
      })
      .catch((error:any) => {
        this.desplegarAlerta("Verifique que la información ingresada corresponda a las políticas");
      })
    }
    else{
      this.desplegarAlerta("Falta información de email o contraseña");
    }
  }

  public confirmarRegistro() {
    if (this.usuario){
      this.servicioCognito.confirmarRegistro(this.usuario)
      .then(() => {
        this.router.navigate(['/iniciar-sesion'])
      })
      .catch((error: any) => {
        this.desplegarAlerta("Ocurrió un error en el servicio");
      })
    }
    else{
      this.desplegarAlerta("Falta información del usuario");
    }
  }

  private desplegarAlerta (mensaje: string) {
    this.mensajeAlerta = mensaje;
    this.mostrarAlerta = true;
  }

}
