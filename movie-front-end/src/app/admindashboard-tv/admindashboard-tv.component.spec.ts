import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindashboardTvComponent } from './admindashboard-tv.component';

describe('AdmindashboardTvComponent', () => {
  let component: AdmindashboardTvComponent;
  let fixture: ComponentFixture<AdmindashboardTvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmindashboardTvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmindashboardTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
