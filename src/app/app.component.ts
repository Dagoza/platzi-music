import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PlatziMusicService } from './core/services/platzi-music.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly storage: Storage,
    private readonly platziMusic: PlatziMusicService
  ) {
    this.storage.create();
    this.platziMusic.getAuthToken();
  }
}
