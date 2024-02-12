import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TvShow } from '../models/tvShow';

@Injectable({
  providedIn: 'root'
})
export class TvEditService {
  private movieAddedSource = new Subject<TvShow>();
  movieAdded$ = this.movieAddedSource.asObservable();


  private tvShowUpdatedSource = new Subject<TvShow>();
  tvShowUpdated$ = this.tvShowUpdatedSource.asObservable();


  announceTvShowUpdated(tvShow: TvShow) {
    this.tvShowUpdatedSource.next(tvShow);
  }
 announceTvShowAdded(tvshow: TvShow) {
    this.movieAddedSource.next(tvshow);
  }
  constructor() { }
}
