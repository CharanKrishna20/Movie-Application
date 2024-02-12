import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { WishlistComponent } from './wishlist.component';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { of } from 'rxjs';
import { Movie } from '../models/movie';
import { TvShow } from '../models/tvShow';
import { HttpClientModule } from '@angular/common/http';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let authService: AuthService;
  let wishlistService: WishlistService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [WishlistComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            userEmailValue: 'test@example.com' // replace with a valid user email
          }
        },
        WishlistService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    wishlistService = TestBed.inject(WishlistService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies and tv shows from the wishlist on ngOnInit', fakeAsync(() => {
    const movies: Movie[] = [{
        movieId: '1',
        movieTitle: 'Movie 1',
        releaseYear: '2022',
        genre: 'Action',
        movieImagePath: 'path1',
        movieDescription: 'Description 1',
        movieRating: 4.5,
        movieDirector: 'Director 1',
        movieWriters: ['Writer 1', 'Writer 2'],
        trailerLink: 'trailer1',
        streamingOn: ['Netflix', 'Prime Video'],
        castAndCrew: ['Actor 1', 'Actor 2'],
        availableLanguages: ['English', 'Spanish'],
        movieReviews: ['Review 1', 'Review 2']
  }];
  const tvShows: TvShow[] = [{
        tvShowId: '101',
        showTitle: 'TV Show 1',
        releaseYear: '2022',
        genre: 'Drama',
        showImagePath: 'showPath1',
        showDescription: 'Show Description 1',
        showRating: '4.0',
        showDirector: 'Show Director 1',
        showWriters: ['Show Writer 1', 'Show Writer 2'],
        trailerLink: 'showTrailer1',
        streamingOn: ['Netflix'],
        castAndCrew: ['Actor 1', 'Actor 2'],
        availableLanguages: ['English']
      } ];

      spyOn(wishlistService, 'getWishList').and.returnValue(of(movies[0]));  // Use movies[0] to get a single movie
      spyOn(wishlistService, 'getShowWishList').and.returnValue(of(tvShows[0]));  // Use tvShows[0] to get a single TV show
    
    component.ngOnInit();
    tick();

    expect(wishlistService.getWishList).toHaveBeenCalledWith('test@example.com');
    expect(wishlistService.getShowWishList).toHaveBeenCalledWith('test@example.com');
    expect(component.wishlist).toEqual(movies);
    expect(component.tvShowList).toEqual(tvShows);
  }));

  // ... Other test cases remain unchanged
});
