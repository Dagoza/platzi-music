import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../core/services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  public registerForm: FormGroup;
  public validationMessages = {
    email : [
    {type: 'required', message: 'El email es requerido'},
    {type: 'pattern', message: 'No es email válido'}
    ],
  password: [
    {type: 'required', message: 'El password es requerido'},
    {type: 'minlength', message: 'Mínimo 5 letras para el password'}
  ],
  name: [
    {type: 'required', message: 'El campo es requerido'},
    {type: 'pattern', message: 'Solo se aceptan letras'}
  ]
};
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly navCtrl: NavController,
    private readonly authService: AuthenticateService
  ) {
    this.createRegisterForm();
   }

  public registerUser(): void{
    this.authService.registerUser(this.registerForm.value)
    .then(res=>{
      this.navCtrl.navigateBack('/login');
    });
  }

  public goToLogin(): void{
    this.navCtrl.navigateBack('/login');
  }

  private createRegisterForm(): void{
    const minLengthByPassword = 5;
    const patternOnlyLetters = '[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$';
    this.registerForm = this.formBuilder.group({
      name:['', [Validators.required, Validators.pattern(patternOnlyLetters)]],
      lastName:['', [Validators.required, Validators.pattern(patternOnlyLetters)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(minLengthByPassword)]]
    });
  }

  get nameField(): FormControl{ return this.registerForm.get('name') as FormControl;}
  get lastNameField(): FormControl{ return this.registerForm.get('lastName') as FormControl;}
  get emailField(): FormControl{ return this.registerForm.get('email') as FormControl;}
  get passwordField(): FormControl{ return this.registerForm.get('password') as FormControl;}
}
