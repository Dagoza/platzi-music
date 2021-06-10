import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  constructor(
    private readonly menu: MenuController,
    private readonly navCtrl: NavController,
    private readonly storage: Storage
  ) { }

  public closeMenu(): void{
    this.menu.close();
  }

  public logout(): void {
    this.storage.remove('isUserLoggedIn');
    this.navCtrl.navigateRoot('/login');
  }

  public goToSetting(): void{
    this.menu.close();
    this.navCtrl.navigateRoot('/menu/settings');
  }

  public goToHome(): void{
    this.menu.close();
    this.navCtrl.navigateRoot('/menu/home');
  }

  public goToSports(): void{
    this.menu.close();
    this.navCtrl.navigateRoot('/menu/sports');
  }

}
