import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvshowFilterComponent } from './tvshow-filter.component';

describe('TvshowFilterComponent', () => {
  let component: TvshowFilterComponent;
  let fixture: ComponentFixture<TvshowFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvshowFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvshowFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
