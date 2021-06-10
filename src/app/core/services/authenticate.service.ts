import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SignIn } from 'src/app/shared/interfaces/signIn';
import { SignUp } from 'src/app/shared/interfaces/signUp';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(
    private readonly storage: Storage
  ) { }

  public loginUser(credential: SignIn): Promise<string>{
    const isUserExist = (user: SignUp): boolean =>  user.email === credential.email && user.password === credential.password;
    return new Promise(async (accept, reject) => {
      const users: SignUp[] = await this.storage.get('users') as SignUp[] || [];
      users.find(isUserExist) ? accept('Login correcto'): reject('Login incorrecto');
    });
  }

  public async registerUser(userData: SignUp): Promise<unknown>{
    const users: SignUp[] = await this.storage.get('users') as SignUp[] || [];
    users.push(userData);
    return this.storage.set('users', users);
  }
}
