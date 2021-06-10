import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Song } from '../shared/interfaces/song';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage {
  public tracks: Song[] = [];
  public name = '';

  constructor(
    private readonly navParams: NavParams,
    private readonly modalController: ModalController
  ) { }


  ionViewDidEnter(): void {
    this.tracks = this.navParams.data.tracks;
    this.name = this.navParams.data.name;
  }

  async selectSong(song?): Promise<void>{
    await this.modalController.dismiss(song);
  }
}
