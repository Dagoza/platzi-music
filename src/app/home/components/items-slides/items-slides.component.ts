import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { PlatziMusicService } from 'src/app/core/services/platzi-music.service';
import { SegmentType } from 'src/app/shared/enums/segmentType.enum';
import { Song } from 'src/app/shared/interfaces/song';
import { SongsModalPage } from 'src/app/songs-modal/songs-modal.page';

@Component({
  selector: 'app-items-slides',
  templateUrl: './items-slides.component.html',
  styleUrls: ['./items-slides.component.scss'],
})
export class ItemsSlidesComponent {
  @Input() items = [];
  @Input() title: string;
  @Output() songEmitter = new EventEmitter<Song>();
  slideOpts = {
    initialSlide: 3,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };
  constructor(
    private readonly musicService: PlatziMusicService,
    private readonly modalController: ModalController
  ) { }

  public async showSongs(item): Promise<void>{
    switch(this.title){
      case SegmentType.artistas:
        return this.songsByArtist(item.id, item.name);
      case SegmentType.albums:
        return this.songsByAlbum(item.id, item.name);;
      case SegmentType.canciones:
        return this.dataSong(item.href);
      default:
        return;
    }
  }

  private async songsByArtist(id: string, name: string): Promise<void>{
    (await this.musicService.getArtistsTopTracks(id))
    .subscribe( async (tracks: Song[]) => {
       const modal: HTMLIonModalElement = await this.createModal(tracks, `${name} - Top Tracks`);
       return modal.present();
      }
    );
  }

  private async songsByAlbum(id: string, name: string): Promise<void>{
    (await this.musicService.getAlbumTracks(id))
    .subscribe( async (tracks: Song[]) => {
       const modal: HTMLIonModalElement = await this.createModal(tracks, name);
       return modal.present();
      }
    );
  }

  private async dataSong(url: string): Promise<void>{
    (await this.musicService.getTrack(url))
    .subscribe((track: Song) => {
      this.songEmitter.emit(track);
      }
    );
  }

  private async createModal(tracks: Song[], name: string): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create(
      {
       component: SongsModalPage,
       componentProps: {
         tracks,
         name
       }
      }
    );
    modal.onDidDismiss().then(dataReturned => this.songEmitter.emit(dataReturned.data));
    return modal;
  }

}
