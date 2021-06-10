import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthenticateService } from '../core/services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public loginForm: FormGroup;
  public errorMessage: string;
  public validationMessages = {
    email : [
    {type: 'required', message: 'El email es requerido'},
    {type: 'pattern', message: 'No es email válido'}
    ],
  password: [
    {type: 'required', message: 'El password es requerido'},
    {type: 'minlength', message: 'Mínimo 5 letras para el password'}
  ]};

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthenticateService,
    private readonly navCtrl: NavController,
    private readonly storage: Storage
  ) {
    this.createForm();
  }

  public loginUser(): void{
    this.authService.loginUser(this.loginForm.value)
      .then(res => {
        this.errorMessage = '';
        this.storage.set('isUserLoggedIn', true);
        this.navCtrl.navigateForward('/menu/home');
      })
      .catch(
        err => this.errorMessage = err
      );
  }

  public goToRegister(): void{
    this.navCtrl.navigateForward('register');
  }

  private createForm(): void{
    const minLengthByPassword = 5;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(minLengthByPassword)]]
    });
  }


  get emailField(): FormControl{ return this.loginForm.get('email') as FormControl;}
  get passwordField(): FormControl{ return this.loginForm.get('password') as FormControl;}


}
