import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private readonly storage: Storage,
    private readonly router: Router
  ){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const isUserLoggedIn: boolean = await this.storage.get('isUserLoggedIn');
      if(isUserLoggedIn){
        return isUserLoggedIn;
      };
      this.router.navigateByUrl('login');
  }
}
