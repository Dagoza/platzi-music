import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  public userImage = 'assets/img/profile.jpg';
  public photo: SafeResourceUrl;
  constructor(
    private readonly sanitizer: DomSanitizer
  ) { }

  public async takePhoto(): Promise<void>{
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && image.dataUrl);
  }

}
