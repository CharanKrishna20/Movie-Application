import { ComponentFixture, TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [
        FormBuilder,
        UserService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set bounce state to "bounce" on startBounceAnimation', () => {
    component.startBounceAnimation();
    expect(component.bounceState).toBe('bounce');
  });

  it('should set bounce state to "normal" on resetBounceAnimation', () => {
    component.resetBounceAnimation();
    expect(component.bounceState).toBe('normal');
  });

  it('should call userService.signupUser on signupUser if form is valid', () => {
    spyOn(userService, 'signupUser').and.returnValue(of({}));

    // Assuming form is valid
    component.signupForm.setValue({
      userName: 'testUser',
      userEmailId: 'test@example.com',
      password: 'password',
      confirmPassword: 'password'
    });

    component.signupUser();

    expect(userService.signupUser).toHaveBeenCalledOnceWith(jasmine.objectContaining({
      userName: 'testUser',
      userEmailId: 'test@example.com',
      password: 'password'
    }));
  });
});
