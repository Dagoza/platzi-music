import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Slide } from '../../interfaces/slide';

@Component({
  selector: 'app-presentation-slides',
  templateUrl: './presentation-slides.component.html',
  styleUrls: ['./presentation-slides.component.scss'],
})
export class PresentationSlidesComponent {
  @Input() slides: Slide[] = [];
  public slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  };

  constructor(
    private readonly router: Router,
    private readonly storage: Storage
  ) { }

  public finish(): void{
    this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/login');
  }

}
