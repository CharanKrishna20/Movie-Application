import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDescriptionPageComponent } from './movie-description-page.component';

describe('MovieDescriptionPageComponent', () => {
  let component: MovieDescriptionPageComponent;
  let fixture: ComponentFixture<MovieDescriptionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDescriptionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieDescriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
