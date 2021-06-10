/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Song } from 'src/app/shared/interfaces/song';
import { environment } from 'src/environments/environment';

const contentType = 'application/x-www-form-urlencoded';
@Injectable({
  providedIn: 'root'
})
export class PlatziMusicService {

  constructor(
    private readonly http: HttpClient
  ) { }

   public getAuthToken(): Promise<string>{

    const headers =  new HttpHeaders({
       'Content-Type': contentType,
       Authorization: 'Basic ' + btoa(`${environment.CLIENT_ID}:${environment.CLIENT_SECRET}`)
    });
    return this.http.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
    {
      headers,
    }).pipe(
      map((res: Record<string,string>) => res.access_token)
    ).toPromise();
  }


  public async getNewReleases(): Promise<Observable<any>>{
    const auth = await this.getAuthToken();
    const headers =  new HttpHeaders({
       'Content-Type': contentType,
       Authorization: 'Bearer ' + auth
    });
    return this.http.get(
      'https://api.spotify.com/v1/browse/new-releases',
    {
      headers
    }).pipe(
      map((response: any) => response.albums.items)
    );
  }

  public async getArtists(ids: string): Promise<Observable<any>>{
    const auth = await this.getAuthToken();
    const headers =  new HttpHeaders({
       'Content-Type': contentType,
       Authorization: 'Bearer ' + auth
    });
    return this.http.get(
      `https://api.spotify.com/v1/artists`,
    {
      headers,
      params: {
        ids
      }
    }).pipe(
      map((response: any) => response.artists)
    );
  }

  public async getArtistsTopTracks(id: string): Promise<Observable<any>>{
    const auth = await this.getAuthToken();
    const headers =  new HttpHeaders({
       'Content-Type': contentType,
       Authorization: 'Bearer ' + auth
    });
    return this.http.get(
      `https://api.spotify.com/v1/artists/${id}/top-tracks`,
    {
      headers,
      params: {
        market: 'IT'
      }
    }).pipe(
      map((response: Record<string,Song[]>) => response.tracks)
    );
  }

  public async getTrack(url: string): Promise<Observable<any>>{
    const auth = await this.getAuthToken();
    const headers =  new HttpHeaders({
       'Content-Type': contentType,
       Authorization: 'Bearer ' + auth
    });
    return this.http.get(
      url,
    {
      headers,
      params: {
        market: 'IT'
      }
    }).pipe(
      map((response: Record<string, Record<string,Song[]>>) => response.tracks.items)
    );
  }

  public async getAlbumTracks(id: string): Promise<Observable<any>>{
    const auth = await this.getAuthToken();
    const headers =  new HttpHeaders({
       'Content-Type': contentType,
       Authorization: 'Bearer ' + auth
    });
    return this.http.get(
      `https://api.spotify.com/v1/albums/${id}`,
    {
      headers,
      params: {
        market: 'IT'
      }
    }).pipe(
      map((response: Record<string, Record<string,Song[]>>) => response.tracks.items[0])
    );
  }
}
