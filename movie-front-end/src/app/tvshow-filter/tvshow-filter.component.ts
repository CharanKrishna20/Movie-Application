import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ImageService } from '../services/image.service';
@Component({
  selector: 'app-tvshow-filter',
  templateUrl: './tvshow-filter.component.html',
  styleUrl: './tvshow-filter.component.css'
})
export class TvshowFilterComponent implements OnInit{

tvShowGenres: string[]=[];
tvShowSelectedGenres: string[]=[];
tvShowGenreCounts: Map<string, number> = new Map<string, number>();
constructor(private tvService: ImageService) {}
ngOnInit(): void {
  this.loadAllTvShowGenres();
}
@Output() selectedTvShowGenresChange = new EventEmitter<string[]>();

  loadAllTvShowGenres() {
    this.tvService.getAllTvShowGenres().subscribe(
      (genres) => {
        this.tvShowGenres = genres;
        console.log(genres,'.............');
        this.calculateTvShowGenreCounts();
      },
      (error) => {
        console.error('Error loading genres', error);
      }
    );
  }
  calculateTvShowGenreCounts(): void  {
    this.tvShowGenreCounts.clear();

    this.tvService.getTvShows().subscribe(
      (tvShows) => {
        for (const tvShow of tvShows) {
          const count = this.tvShowGenreCounts.get(tvShow.genre) || 0;
          this.tvShowGenreCounts.set(tvShow.genre, count + 1);
        }
      },
      (error) => {
        console.error('Error loading tv shows', error);
      }
    );
  }
  


getTvShowGenreCount(tvShowGenre: string): number {
  return this.tvShowGenreCounts.get(tvShowGenre) || 0;
}
tvShowSelectedGenre(tvGenre: string) {
  console.log('this is invoked');
  console.log(tvGenre);
    if (this.tvShowSelectedGenres.includes(tvGenre)) {
      this.tvShowSelectedGenres = this.tvShowSelectedGenres.filter((g) => g !== tvGenre);
      console.log(this.tvShowSelectedGenre)
    } else {
      this.tvShowSelectedGenres.push(tvGenre);
    }

    // Emit the updated selected genres to the parent component
    this.selectedTvShowGenresChange.emit([...this.tvShowSelectedGenres]);
  }
  }

