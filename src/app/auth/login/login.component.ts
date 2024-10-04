import { Component } from '@angular/core';
import { UsuarioEmpleado } from '../../models/usuario-empleado';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsService } from '../../services/forms.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formSubmited = false;
  public cargando = true;
  usuario: UsuarioEmpleado;
  formLogin!: FormGroup;
  siteKey = "6LfDH04qAAAAAAZQkL5YxF08CoVezCCNfrt2Cw2I";

  constructor(
    private router: Router,
    public formsService: FormsService,
    private fBuild: FormBuilder,
    private aS: AuthService,

  ) {
    setTimeout(() => {
      this.cargando = false;
    }, 500);
    this.usuario = new UsuarioEmpleado();
    this.formLoginCreate();
  }

  formLoginCreate() {
    this.formLogin = this.fBuild.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      recaptcha: ['', /* [Validators.required] */]
    })
  }
  handleSuccess(token: any) {
    console.log(token);
  }


  login() {
    this.formSubmited = true;
    this.formLogin.get('email')?.setValue("fernando@outlook.com");
    this.formLogin.get('password')?.setValue("10203040");

    if (this.formLogin.valid) {
      this.usuario.email = this.formLogin.get('email')?.value;
      this.usuario.password = this.formLogin.get('password')?.value;
      this.cargando = true;
      setTimeout(() => {
        this.aS.login(this.usuario).subscribe(
          {
            "next": (res) => {
              Swal.fire({
                title: res.message,
                text: res.username,
                icon: "success",
                allowEscapeKey: false,
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",

              }).then((result) => {
                if (result.isConfirmed) {
                  this.aS.guardarToken(res.token);
                  this.aS.guardarUsuario(res.token);
                  this.router.navigate(['sistema'])
                  

                }
              });


            },
            "error": (error: any) => {

              Swal.fire({
                title: error.error.error,
                text: error.error.message,
                icon: "error"
              });
            }
          }
        )
        this.cargando = false;
      }, 1000);


    }
  }
}

