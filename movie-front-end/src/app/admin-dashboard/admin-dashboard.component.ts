
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../services/image.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '../models/movie';
import { MatTableDataSource } from '@angular/material/table';
import { MovieaddComponent } from '../movieadd/movieadd.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MovieEditComponent } from '../movie-edit/movie-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieEditService } from '../services/movie-edit.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() movie!: Movie;
  allMovies: Movie[] = [];
  

  movieId!: string;
  showMovieIdColumn = false;
  paginatedMovies: any[] = [];
  totalMovies!: number;
  pageSize = 10;
  pageSizeOptions!: any[];
  movies: Movie[] = [];
 

  movieList!: any[];
  dataSource: any;
  displayedColumns: string[] = [
    "movieId", "movieTitle", "releaseYear", "genre", "movieDescription",
    "movieRating", "movieDirector", "movieWriters", "trailerLink",
    "streamingOn", "castAndCrew", "availableLanguages", "action"
  ];

  showMovieAdd: boolean = false;

  constructor(
    private imageService: ImageService,
    private fb: FormBuilder,
    private route: Router,
    private movie_upadate:MovieEditService,
    private _dialogueref: MatDialog, private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchAllMovies();
    this.movie_upadate.movieUpdated$.subscribe((updatedMovie) => {
      const index = this.movieList.findIndex((movie) => movie.movieId === updatedMovie.movieId);
      if (index !== -1) {
        this.movieList[index] = updatedMovie;
        this.dataSource.data = this.movieList;
      }
    });
    this.movie_upadate.movieAdded$.subscribe((addedMovie) => {
      if (addedMovie) {
        // Update the UI with the new movie
        this.movieList.push(addedMovie);
        this.dataSource.data = this.movieList;
      }
    });
  
  }
  

  fetchAllMovies() {
    this.imageService.getMovies().subscribe(
      (response: any[]) => {
        console.log("fetching worked", response);
        if (response) {
          this.allMovies = response; // Assign the response to this.allMovies
          console.log("all movie component");
          console.log(this.allMovies);
  
          this.movieList = response;
          this.dataSource = new MatTableDataSource<Movie>(this.movieList);
          this.dataSource.paginator = this.paginator;
          console.log("Displayed Columns:", this.displayedColumns);
        } else {
          console.log("API response is null or undefined");
        }
      },
      (error: any) => {
        console.log("error while fetching the data", error);
      }
    );
  }

   // ngAfterViewInit(): void {
  //   this.fetchAllMovies();
  // }
  onPageChange(event: any): void {
    console.log('onPageChange', event);
    this.paginateMovies(event.pageIndex + 1); // pageIndex is 0-based
  }

  paginateMovies(page: number): void {
    console.log("page number" + page);
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedMovies = this.movies.slice(startIndex, endIndex);
  }

  users() {
    this.route.navigate(['/all-users']);
  }

  openEditDialog(data: any) {
    console.log(data);
    const dialogRef = this._dialogueref.open(MovieEditComponent, {
      width: '700px',
      data
    });
  }

  deleteMovie(movieId: string | undefined) {
    if (movieId) {
      const confirmed = window.confirm('Are you sure you want to delete this movie?');

      if (confirmed) {
        this.imageService.deleteMovie(movieId).subscribe(
          () => {
            // alert("Movie Successfully deleted");
            this.snackBar.open("Movie Successfully deleted", 'Close', {
              duration: 2000, // Adjust the duration as needed
              horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar'],
            });
            this.fetchAllMovies();
          },
          (error: any) => {
            // alert("uh...oh");
            this.snackBar.open("Movie not deleted", 'Close', {
              duration: 2000, // Adjust the duration as needed
              horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
              verticalPosition: 'bottom',
              panelClass: ['error-snackbar'],
            });
            console.error('Error deleting movie:', error);
          }
        );
      }
    } else {
      console.error('Movie ID is not available.');
    }
  }

  handleMovieAdded() {
    this.fetchAllMovies();
  }

  toggleMovieAdd() {
    this.showMovieAdd = !this.showMovieAdd;
  }

  openDialog() {
    const dialogRef = this._dialogueref.open(MovieaddComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Dialog result:', result);
        this.movieList.push(result);
      }
    });
  }


  onSearch(searchText: string) {
    console.log("Search function evoked: ");
    if (searchText) {
      console.log("Search Text:", searchText);
  
      // Log all movie titles before filtering
      console.log("All Movie Titles:", this.allMovies.map(movie => movie.movieTitle));
  
      this.movies = this.allMovies.filter((movie) =>
        movie.movieTitle?.toLowerCase().includes(searchText.toLowerCase())
      );
      console.log("Filtered Movies:", this.movies);
  
      this.dataSource = new MatTableDataSource<Movie>(this.movies);
      this.dataSource.paginator = this.paginator;
  
      this.totalMovies = this.movies.length;
    } else {
      console.log("Fetching all movies...");
      this.fetchAllMovies();
    }
    // Reset paginator to the first page
    this.paginator.firstPage();
    // Update paginator's length to reflect the new totalMovies
    this.paginator.length = this.totalMovies;
  }
 
}
