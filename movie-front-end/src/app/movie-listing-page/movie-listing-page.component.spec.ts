import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListingPageComponent } from './movie-listing-page.component';

describe('MovieListingPageComponent', () => {
  let component: MovieListingPageComponent;
  let fixture: ComponentFixture<MovieListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieListingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
