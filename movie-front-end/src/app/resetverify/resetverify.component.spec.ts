import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetverifyComponent } from './resetverify.component';

describe('ResetverifyComponent', () => {
  let component: ResetverifyComponent;
  let fixture: ComponentFixture<ResetverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetverifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
