import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent implements OnInit{
  constructor(private imageService: ImageService){}
ngOnInit(): void {
 
}
@Input()
movie!: Movie;

}
