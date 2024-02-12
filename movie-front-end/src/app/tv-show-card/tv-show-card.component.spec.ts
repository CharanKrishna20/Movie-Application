import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowCardComponent } from './tv-show-card.component';

describe('TvShowCardComponent', () => {
  let component: TvShowCardComponent;
  let fixture: ComponentFixture<TvShowCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvShowCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TvShowCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
