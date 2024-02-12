import { ChangeDetectorRef, Component, Inject, OnInit, Output } from '@angular/core';
import { Movie } from '../models/movie';
import { ImageService } from '../services/image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieEditService } from '../services/movie-edit.service';


@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css'],
})
export class MovieEditComponent implements OnInit {

onFileChange(event: any) {
  if (event?.target?.files && event.target.files.length > 0) {
    this.file = event.target.files[0];
  } else {
    this.file = null;
  }
}
movieForm!: FormGroup;
  file: File | null = null;
  movie: Movie = {
    movieId: '',
    movieTitle: '',
    releaseYear: '',
    genre: '',
    movieDescription: '',
    movieRating: 0,
    movieImagePath: '',
    movieDirector: '',
    movieWriters: [],
    trailerLink: '',
    streamingOn: [],
    castAndCrew: [],
    availableLanguages: []
  };

  constructor(
    private fb: FormBuilder,
    private imageService: ImageService,
    private _route: ActivatedRoute,
    private cdRef:ChangeDetectorRef,
     private movie_update:MovieEditService,
    private _dialogref: MatDialogRef<AdminDashboardComponent>, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.movieId) {
      const movieId = this.data.movieId;
      this.imageService.getMovieById(movieId.toString()).subscribe(
        (movie: Movie) => {
          this.movie = movie;
          this.initForm();
          this.populateForm();
        },
        (error) => {
          console.error('Error fetching movie:', error);
        }
      );
    }
  }

  initForm(): void {
    this.movieForm = this.fb.group({
      movieTitle: ['', Validators.required],
      releaseYear: ['', Validators.required],
      genre: [''],
      movieDescription: [''],
      movieRating: [''],
      movieDirector:'',
      movieWriters:[''],
      trailerLink:'',
      streamingOn:[''],
      castAndCrew:[''],
      availableLanguages:['']
    });
  }

  populateForm(): void {
    this.movieForm.patchValue({
      movieTitle: this.movie.movieTitle,
      releaseYear: this.movie.releaseYear,
      genre: this.movie.genre,
      movieDescription: this.movie.movieDescription,
      movieRating: this.movie.movieRating,
      movieDirector:this.movie.movieDirector,
      movieWriters:this.movie.movieWriters,
      trailerLink:this.movie.trailerLink,
      streamingOn:this.movie.streamingOn,
      castAndCrew:this.movie.castAndCrew,
      availableLanguages:this.movie.availableLanguages    });

        }
  editMovie() {
    this.imageService.modifyMovie(this.movie, this.file).subscribe(
      (modifyData) => {
        console.log(modifyData);
        this.movie=modifyData;
        this.cdRef.detectChanges();
        this.movie_update.announceMovieUpdated(this.movie);
        // alert('Movie updated successfully!');
        this.snackBar.open("Movie updated successfully!", 'Close', {
          duration: 2000, // Adjust the duration as needed
          horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar'],
        });
        this._dialogref.close();
      },
      (error) => {
        // alert('Error updating movie. Please try again.');
        this.snackBar.open("Error updating movie. Please try again!", 'Close', {
          duration: 2000, // Adjust the duration as needed
          horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar'],
        });
        console.error(error);
      }
    );
  }
}