import { Injectable } from '@angular/core';
import { Amplify, Auth } from 'aws-amplify';
import { Usuario } from '../models/usuario';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() { 
    Amplify.configure({
      Auth: environment.cognito
    })
  }

  public registro(usuario: Usuario): Promise<any> {
    return Auth.signUp({
      username: usuario.email,
      password: usuario.password,
      attributes: {
        email: usuario.email,
        given_name: usuario.nombre,
        family_name: usuario.apellido
      }
    })
  }

  public confirmarRegistro(usuario: Usuario): Promise<any> {
    return Auth.confirmSignUp(usuario.email, usuario.codigo);
  }

  // Este metodo servira para regresar toda la informacion del usuario
  // si es que ingresa su informacion de log in correctamente
  public getUsuario() : Promise<any> {
    return Auth.currentUserInfo();
  }

  public iniciarSesion(usuario: Usuario) : Promise<any> {
    return Auth.signIn(usuario.email, usuario.password);
  }

  public cerrarSesion() : Promise<any> {
    return Auth.signOut();
  }

  // Este metodo enviara un codigo de verificacion al usuario
  public olvidoPassword(usuario: Usuario) : Promise<any> {
    return Auth.forgotPassword(usuario.email);
  }

  // Se ingresa la nueva contraseña with email y codigo que se envia al email
  public olvidoPasswordConfirmar(usuario: Usuario, nuevaPassword: string) : Promise<any> {
    return Auth.forgotPasswordSubmit(usuario.email, usuario.codigo, nuevaPassword);
  }

}
