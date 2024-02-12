import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowReviewPageComponent } from './tvshow-review-page.component';

describe('TvshowReviewPageComponent', () => {
  let component: TvshowReviewPageComponent;
  let fixture: ComponentFixture<TvshowReviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvshowReviewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvshowReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
