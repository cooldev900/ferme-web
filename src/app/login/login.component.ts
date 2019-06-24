import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/services/auth.service';
import { AuthHttpService } from 'src/http-services/auth.service';
import { Observable, of } from 'rxjs';
import { Sesion } from 'src/models/Sesion';
import { Router } from '@angular/router';

export interface Login {
  usuario: string;
  clave: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../../assets/formularios.css',
    '../../assets/single-card-page.css'
  ]
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public showSpinner$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authSvc: AuthService,
    private authHttpSvc: AuthHttpService
  ) { 
    this.showSpinner$ = of(false);
    this.loginForm = this.fb.group({
      usuario: ["", Validators.required],
      clave: ["", Validators.required]
    });
  }

  public get usuario() { return this.loginForm.get("usuario"); }
  public get clave() { return this.loginForm.get("clave"); }

  ngOnInit() {
  }

  public onClickAceptar(): void {
    this.showSpinner$ = of(true);

    const usr: Login = {
      usuario: this.usuario.value,
      clave: this.clave.value
    };
    
    this.authHttpSvc.abrirSesion(usr).subscribe(
      (ssn: Sesion) => {
        if (!ssn || !ssn.hashSesion) {
          this.snackBar.open("Credenciales inválidas.");
        } else {
          console.log(ssn);
          
          this.authSvc.sesion = ssn;
          this.router.navigateByUrl("/gestion");
        }
        
      },
      err => {
        console.log(err);
        this.snackBar.open("Hubo un problema al autenticar.");
      },
      () => { 
        this.showSpinner$ = of(false);
      }
    );
  }

}
