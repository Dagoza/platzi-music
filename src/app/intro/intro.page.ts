import { Component } from '@angular/core';
import { Slide } from './interfaces/slide';


const imageSrc = 'assets\\img\\logo-app.png';
const description = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, nostrum corrupti'
+' voluptatem excepturi dolores velit alias deserunt ullam sapiente consequuntur, blanditiis facilis'
+' sequi ratione perferendis reiciendis minus autem, numquam laudantium?';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {
  slides: Slide[] = [
    {
      imageSrc,
      title: 'Escucha tu música' ,
      subTitle: 'En cualquier lugar',
      description,
      icon: 'musical-notes-outline'
    },
    {
      imageSrc,
      title: 'Disfruta nuestro reproductor' ,
      subTitle: 'con canciones increíbles',
      description,
      icon: 'radio-outline'
    },
    {
      imageSrc,
      title: 'Escucha tu música' ,
      subTitle: 'solo aquí',
      description,
      icon: 'play-circle-outline'
    }
  ];
}
