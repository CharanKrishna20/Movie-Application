import { ChangeDetectorRef, Component ,Inject, OnInit, Output } from '@angular/core';
import { ImageService } from '../services/image.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { TvShow } from '../models/tvShow';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TvEditService } from '../services/tv-edit.service';


@Component({
  selector: 'app-tvshow-edit',
  templateUrl: './tvshow-edit.component.html',
  styleUrl: './tvshow-edit.component.css'
})
export class TvshowEditComponent implements OnInit {

  onFileChange(event: any) {
    if (event?.target?.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    } else {
      this.file = null;
    }
  }
  tvShowForm!: FormGroup;
    file: File | null = null;
    tvShow:TvShow={
      tvShowId: '',
      showTitle: '',
      releaseYear: '',
      genre: '',
      showImagePath: '',
      showDescription: '',
      showRating: '',
      showDirector: '',
      showWriters: [],
      trailerLink: '',
      streamingOn: [],
      castAndCrew: [],
      availableLanguages: []
    }
  
    constructor(
      private fb: FormBuilder,
      private imageService: ImageService,
      private _route: ActivatedRoute, private snackBar: MatSnackBar,
      private cdRef:ChangeDetectorRef,
     private tvShow_update:TvEditService,
      private _dialogref: MatDialogRef<AdminDashboardComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
  
    ngOnInit(): void {
      if (this.data && this.data.tvShowId) {
        const tvShowId = this.data.tvShowId;
        this.imageService.getTvShowById(tvShowId.toString()).subscribe(
          (tvShow: TvShow) => {
            this.tvShow = tvShow;
            this.initForm();
            this.populateForm();
          },
          (error) => {
            console.error('Error fetching tv show:', error);
          }
        );
      }
    }
  
    initForm(): void {
      this.tvShowForm = this.fb.group({
        showTitle: ['', Validators.required],
        releaseYear: ['', Validators.required],
        genre: [''],
        showDescription: [''],
        showRating: [''],
        showDirector: '',
        showWriters: [''],
        trailerLink: '',
        streamingOn: [''],
        castAndCrew: [''],
        availableLanguages: ['']
      });
    }
  
    populateForm(): void {
      this.tvShowForm.patchValue({
        showTitle: this.tvShow.showTitle,
        releaseYear: this.tvShow.releaseYear,
        genre: this.tvShow.genre,
        showDescription: this.tvShow.showDescription,
        showRating: this.tvShow.showRating,
        showDirector:this.tvShow.showDirector,
        movieWriters:this.tvShow.showWriters,
        trailerLink:this.tvShow.trailerLink,
        streamingOn:this.tvShow.streamingOn,
        castAndCrew:this.tvShow.castAndCrew,
        availableLanguages:this.tvShow.availableLanguages
      });
    }
  
    editTvShow() {
      this.imageService.modifyTvShow(this.tvShow, this.file).subscribe(
        (modifyData) => {
          console.log(modifyData);
          this.tvShow=modifyData;
          this.cdRef.detectChanges();
          this.tvShow_update.announceTvShowUpdated(this.tvShow);
          // alert('tv show updated successfully!');
          this.snackBar.open("Tv show updated successfully!", 'Close', {
            duration: 2000, // Adjust the duration as needed
            horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar'],
          });
          this._dialogref.close();
        },
        (error) => {
          alert('Error updating tv show. Please try again.');
          console.error(error);
        }
      );
    }
  }
