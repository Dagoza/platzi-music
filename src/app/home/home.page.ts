import { Component } from '@angular/core';
import { PlatziMusicService } from '../core/services/platzi-music.service';
import { ItemType } from '../shared/enums/ItemType.enum';
import { Song } from '../shared/interfaces/song';
import { Item } from './interfaces/item.interface';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public artists = [];
  public songs = [];
  public albums = [];
  public song: Song;
  public progressTime: number;
  public currentSong: HTMLAudioElement;

  constructor(
    public readonly platziMusicService: PlatziMusicService
  ) {}

  async ionViewDidEnter(): Promise<void>{
    (await this.platziMusicService.getNewReleases())
    .subscribe(
      async (newReleases: Item[]) => {
        this.getArtistWithId(newReleases);
        this.getNewReleases(newReleases);
      }
    );
  }

  public async getSong(track: Song): Promise<void>{
    if(track){
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.currentSong && this.pause();
      this.song = track;
      this.currentSong = new Audio(this.song.preview_url);
      this.play();
    }
  }

  public parseTime(time = 0.00): string{
    if(time) {
      const positionInitial = 0;
      const numberBaseTen = 10;
      const totalSeconds = 60;
      const partTime = parseInt(time.toString().split('.')[positionInitial], numberBaseTen);
      let minutes = Math.floor(partTime/totalSeconds).toString();
      minutes = (minutes.length === 1) ? '0'+minutes : minutes;
      let seconds = (partTime % totalSeconds).toString();
      seconds = (seconds.length === 1) ? '0'+seconds : seconds;
      return `${minutes}:${seconds}`;
    }
    return '00:00';
  }

  public play(): void{
    if(this.song){
      this.currentSong.play();
      this.currentSong.addEventListener(
        'timeupdate', () => this.progressTime = (this.currentSong.currentTime / this.currentSong.duration)
      );
      this.song.playing = true;
    }
  }

  public pause(): void{
    this.currentSong.pause();
    this.song.playing = false;
  }

  private async getArtistWithId(newReleases: Item[]): Promise<void>{
    const artistsIdList: string = newReleases.map((release) => release.artists[0].id).toString();
    (await this.platziMusicService.getArtists(artistsIdList))
    .subscribe((artists: Item[]) => {
      this.artists = artists;
    });
  }

  private getNewReleases(newReleases): void{
    this.songs = newReleases.filter((release: Item) =>
      release.album_type === ItemType.single
    );
    this.albums = newReleases.filter((release: Item) => 
      release.album_type === ItemType.album
    );
  }
}
