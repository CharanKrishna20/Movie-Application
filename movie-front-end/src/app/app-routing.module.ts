import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyComponent } from './verify/verify.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieaddComponent } from './movieadd/movieadd.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ImageComponent } from './image/image.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieDescriptionPageComponent } from './movie-description-page/movie-description-page.component';
import { MovieListingPageComponent } from './movie-listing-page/movie-listing-page.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { WishlistGuard } from './auth/wishlist.guard';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TvshowsPageComponent } from './tvshows-page/tvshows-page.component';
import { AdmindashboardTvComponent } from './admindashboard-tv/admindashboard-tv.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { TvshowDescriptionPageComponent } from './tvshow-description-page/tvshow-description-page.component';
import { TvshowEditComponent } from './tvshow-edit/tvshow-edit.component';
import { AddTvshowComponent } from './add-tvshow/add-tvshow.component';
import { AuthGuard } from './auth/auth.guard';
import { signupGuard } from './auth/signup.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetverifyComponent } from './resetverify/resetverify.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'movie-edit', component: MovieEditComponent,canActivate:[AuthGuard] },
  { path: 'movieadd', component: MovieaddComponent,canActivate:[AuthGuard] },
  { path: 'all-users', component: AllUsersComponent,canActivate:[AuthGuard] },
  { path: 'tvShow-edit', component: TvshowEditComponent,canActivate:[AuthGuard]},
  { path: 'add-tvshow', component:  AddTvshowComponent,canActivate:[AuthGuard]},
  { path: 'image', component: ImageComponent },
  { path: 'movie-card', component: MovieCardComponent },
  {
    path: 'movie-description-page/:id',
    component: MovieDescriptionPageComponent,
  },
  {
    path:'tvshow-description-page/:id',
    component:TvshowDescriptionPageComponent,
  },
  { path: 'admin-dashboard', component: AdminDashboardComponent ,canActivate:[AuthGuard]},
  { path: 'movie-listing-page', component: MovieListingPageComponent },
  {
    path: 'wishlist',
    component: WishlistComponent,
    canActivate: [WishlistGuard],
  },
  { path: 'tvshows-page', component: TvshowsPageComponent },
  { path: 'profile-page', component: ProfilePageComponent },
  { path: 'admindashboard-tv', component: AdmindashboardTvComponent,canActivate:[AuthGuard] },
  { path: 'review-page', component: ReviewPageComponent },
  { path: 'payment-gateway', component: PaymentGatewayComponent},
  { path: 'forgot-password',  component:ForgotPasswordComponent},
  { path: 'reset-password', component:ResetPasswordComponent},
  { path: 'reset-verify', component:ResetverifyComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
