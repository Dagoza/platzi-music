import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {

  constructor(
    private readonly storage: Storage,
    private readonly router: Router
  ){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const isIntroShowed: boolean = await this.storage.get('isIntroShowed');
    if(isIntroShowed){
      return isIntroShowed;
    };
    this.router.navigateByUrl('intro');
  }
}
