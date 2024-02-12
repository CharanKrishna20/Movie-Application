import { Component, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { Router } from '@angular/router';
import { TvShow } from '../models/tvShow';

@Component({
  selector: 'app-tvshows-page',
  templateUrl: './tvshows-page.component.html',
  styleUrl: './tvshows-page.component.css'
})
export class TvshowsPageComponent implements OnInit{
 
  pageNumber:number=0;
  showLoadButton=false;
  tvShows: TvShow[]=[];
  selectedTvGenres: Set<string> = new Set<string>();
  allTvShows:TvShow[]=[];
  constructor(private imageService:ImageService,private route: Router){}
  ngOnInit(): void {
    this.fetchAllTvShows();
    
  }
//fetch all TvShows
fetchAllTvShows() {
  this.imageService.getPaginatedTvShows(this.pageNumber).subscribe(
    (success => {
     if(success.length==12){
      this.showLoadButton=true;
     }
     else{
      this.showLoadButton=false;
     }
     success.forEach((newShow) => {
      if (!this.tvShows.some((existingMovie) => existingMovie.tvShowId=== newShow.tvShowId)) {
        this.tvShows.push(newShow);
      }
    });
    this.allTvShows = [...this.allTvShows, ...success];
      console.log(success);
    }),
    error =>{
      console.log(error);
    }
  )
}
//search event
onSearch(searchText: string) {
  if (searchText) {
    this.tvShows = this.tvShows.filter(tvShows =>
      tvShows.showTitle?.toLowerCase().includes(searchText.toLowerCase())
    );
  } else {
    this.pageNumber = 0;
    this.fetchAllTvShows(); 
  }
}
onSelectedTvGenre(selectedTvGenres: string[] | Set<string>): void {
  this.selectedTvGenres = new Set<string>(selectedTvGenres as string[]);

  // Rest of the method remains the same
  if (this.selectedTvGenres.size === 0) { 
    // If no genres are selected, show all movies
    this.tvShows = this.tvShows.slice();
  } else {
    // Filter movies based on selected genres
    this.tvShows = this.allTvShows.filter((tvShow) =>
      this.selectedTvGenres.has(tvShow.genre)
    );
  }
}

// Load more movies
loadMoreTvShows() {
  this.pageNumber++;
  this.fetchAllTvShows();
}
}