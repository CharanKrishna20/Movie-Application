import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowDescriptionPageComponent } from './tvshow-description-page.component';

describe('TvshowDescriptionPageComponent', () => {
  let component: TvshowDescriptionPageComponent;
  let fixture: ComponentFixture<TvshowDescriptionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvshowDescriptionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvshowDescriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
