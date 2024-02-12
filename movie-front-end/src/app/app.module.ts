// Import for all the modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';



// Imports for all the components
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FooterComponent } from './footer/footer.component';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieaddComponent } from './movieadd/movieadd.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MovieDescriptionPageComponent } from './movie-description-page/movie-description-page.component';
import { MovieListingPageComponent } from './movie-listing-page/movie-listing-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { FilterComponent } from './filter/filter.component';
import { ImageComponent } from './image/image.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { SignupComponent } from './signup/signup.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TvshowsPageComponent } from './tvshows-page/tvshows-page.component';
import { SliderComponent } from './slider/slider.component';
import { AdmindashboardTvComponent } from './admindashboard-tv/admindashboard-tv.component';
import { AddTvshowComponent } from './add-tvshow/add-tvshow.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { TvshowEditComponent } from './tvshow-edit/tvshow-edit.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { TvshowDescriptionPageComponent } from './tvshow-description-page/tvshow-description-page.component';
import { TvShowCardComponent } from './tv-show-card/tv-show-card.component';
import { TvshowFilterComponent } from './tvshow-filter/tvshow-filter.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetverifyComponent } from './resetverify/resetverify.component';
import { MovieEditService } from './services/movie-edit.service';
import { TvEditService } from './services/tv-edit.service';
import { TvshowReviewPageComponent } from './tvshow-review-page/tvshow-review-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    FooterComponent,
    HeaderComponent,
    SearchComponent,
    HomeComponent,
    LoginComponent,
    VerifyComponent,
    ImageComponent,
    SignupComponent,
    MovieEditComponent,
    MovieaddComponent,
    AllUsersComponent,
    AdminDashboardComponent,
    MovieDescriptionPageComponent,
    MovieListingPageComponent,
    FilterComponent,
    WishlistComponent,
    ProfilePageComponent,
    TvshowsPageComponent,
    SliderComponent,
    AdmindashboardTvComponent,
    AddTvshowComponent,
    ReviewPageComponent,
    TvshowEditComponent,
    PaymentGatewayComponent,
    TvshowDescriptionPageComponent,
    TvShowCardComponent,
    TvshowFilterComponent,
    MovieCardComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ResetverifyComponent,
    TvshowReviewPageComponent
  ],
  imports: [
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbCollapse,
    MatDialogModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatGridListModule,
    MatBadgeModule,
    MatListModule,
    MatSnackBarModule,
    MatChipsModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  providers: [provideClientHydration(),MovieEditService,TvEditService],
  bootstrap: [AppComponent],
})
export class AppModule {}
