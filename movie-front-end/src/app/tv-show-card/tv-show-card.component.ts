import { Component, Input, OnInit } from '@angular/core';
import { TvShow } from '../models/tvShow';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-tv-show-card',
  templateUrl: './tv-show-card.component.html',
  styleUrl: './tv-show-card.component.css'
})
export class TvShowCardComponent implements OnInit{
  
ngOnInit(): void {
 
}
@Input()
tvShow!: TvShow;

}

