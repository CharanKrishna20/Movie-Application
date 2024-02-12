import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTvshowComponent } from './add-tvshow.component';

describe('AddTvshowComponent', () => {
  let component: AddTvshowComponent;
  let fixture: ComponentFixture<AddTvshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTvshowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTvshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
