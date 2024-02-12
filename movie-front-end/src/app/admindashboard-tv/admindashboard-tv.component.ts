import { Component,Input, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../services/image.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTvshowComponent } from '../add-tvshow/add-tvshow.component';
import { TvShow } from '../models/tvShow';
import { TvshowEditComponent } from '../tvshow-edit/tvshow-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TvEditService } from '../services/tv-edit.service';


@Component({
  selector: 'app-admindashboard-tv',
  templateUrl: './admindashboard-tv.component.html',
  styleUrl: './admindashboard-tv.component.css'
})
export class AdmindashboardTvComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  paginatedTvShows: any[] = [];
  totalTvShows!: number;
  pageSize = 10;
  pageSizeOptions!: any[];
  tvShows: TvShow[] = [];
  tvShowId!: string;
  showTvShowIdColumn = false;
  tvshowlist!: any[];
  dataSource: any;
  displayedColumns: string[] = [
    'tvShowId',
    'showTitle',
    'releaseYear',
    'genre',
    'showDescription',
    'showRating',
    'showDirector',
    'showWriters',
    'castAndCrew',
    'trailerLink',
    'streamingOn',
    'availableLanguages',
    'action',
  ];
  // paginatior: any;
  showTvShowAdd: boolean = false;
  allTvShows: TvShow[]=[];
  @Input()
  tvShow!: TvShow;


  constructor(
    private imageService: ImageService,
    private fb: FormBuilder,
    private route: Router,
    private tvShow_update:TvEditService,
    private _dialogueref: MatDialog, private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchAllTvShows();
    this.tvShow_update.tvShowUpdated$.subscribe((updatedTvShow) => {
      // Update the local data with the updated tvShow
      const index = this.tvshowlist.findIndex((tvShow) => tvShow.tvShowId === updatedTvShow.tvShowId);
      if (index !== -1) {
        this.tvshowlist[index] = updatedTvShow;
        this.dataSource.data = this.tvshowlist; // Update the MatTableDataSource
      }
    });
    this.tvShow_update.movieAdded$.subscribe((addedMovie) => {
      if (addedMovie) {
        // Update the UI with the new movie
        this.tvshowlist.push(addedMovie);
        this.dataSource.data = this.tvshowlist;
      }
    });
  
  }

  // ngAfterViewInit(): void {
  //   this.fetchAllTvShows();
  // }

  onPageChange(event: any): void {
    console.log('onPageChange', event);
    this.paginateTvShows(event.pageIndex + 1); // pageIndex is 0-based
  }

  paginateTvShows(page: number): void {
    console.log('page number' + page);
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedTvShows = this.tvShows.slice(startIndex, endIndex);
  }

  fetchAllTvShows() {
    this.imageService.getTvShows().subscribe(
      (response: any[]) => {
        console.log('fetching worked', response);
        if (response) {
          this.tvshowlist = response;
          console.log('all TvSHOWS component');
          console.log(this.tvshowlist);
  
          // Populate allTvShows array with fetched data
          this.allTvShows = this.tvshowlist;
  
          this.dataSource = new MatTableDataSource<TvShow>(this.tvshowlist);
          this.dataSource.paginator = this.paginator;
          console.log('Displayed Columns:', this.displayedColumns);
        } else {
          console.log('API response is null or undefined');
        }
      },
      (error: any) => {
        console.log('error while fetching the data', error);
      }
    );
  }
  
  users() {
    this.route.navigate(['/all-users']);
  }

  openEditDialog(data: any) {
    console.log(data);
    const dialogRef = this._dialogueref.open(TvshowEditComponent, {
      width: '700px',
      data,
    });
  }

  deleteTvShow(tvShowId: string | undefined) {
    if (tvShowId) {
      const confirmed = window.confirm('Are you sure you want to delete this Tv Show?');

      if (confirmed) {
        this.imageService.deleteTvShow(tvShowId).subscribe(
          () => {
            this.snackBar.open("Tv Show Successfully deleted", 'Close', {
              duration: 2000, // Adjust the duration as needed
              horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
              verticalPosition: 'bottom',
              panelClass: ['success-snackbar'],
            });
            this.fetchAllTvShows();
          },
          (error: any) => {
            // alert('uh...oh');
            this.snackBar.open("Tv Show not deleted", 'Close', {
              duration: 2000, // Adjust the duration as needed
              horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
              verticalPosition: 'bottom',
              panelClass: ['error-snackbar'],
            });
            console.error('Error deleting Tv Show:', error);
          }
        );
      }
    } else {
      console.error('Tv show ID is not available.');
    }
  }

  handleTvShowAdded() {
    this.fetchAllTvShows();
  }

  toggleTvShowAdd() {
    this.showTvShowAdd = !this.showTvShowAdd;
  }

  openDialog1() {
    const dialogRef = this._dialogueref.open(AddTvshowComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Dialog result:', result);
        this.tvshowlist.push(result);
      }
    });
  }


  onSearch(searchText: string) {
    console.log("Search function evoked: ");
    if (searchText) {
      console.log("Search Text:", searchText);
  
      // Log all movie titles before filtering
      console.log("All tv show  Titles:", this.allTvShows.map(tvShow => tvShow.showTitle));
  
      this.tvShows = this.allTvShows.filter((tvShow) =>
      tvShow.showTitle?.toLowerCase().includes(searchText.toLowerCase())
      );
      console.log("Filtered Movies:", this.tvShows);
  
      this.dataSource = new MatTableDataSource<TvShow>(this.tvShows);
      this.dataSource.paginator = this.paginator;
  
      this.totalTvShows = this.tvShows.length;
    } else {
      console.log("Fetching all tvshows...");
      this.fetchAllTvShows();
    }
    // Reset paginator to the first page
    this.paginator.firstPage();
    // Update paginator's length to reflect the new totalTvShows
    this.paginator.length = this.totalTvShows;
  }
    
    
    }
    
