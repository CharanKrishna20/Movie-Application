import { Component ,EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../models/movie';
import { ImageService } from '../services/image.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from  '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TvShow } from '../models/tvShow';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TvEditService } from '../services/tv-edit.service';

@Component({
  selector: 'app-add-tvshow',
  templateUrl: './add-tvshow.component.html',
  styleUrl: './add-tvshow.component.css'
})
export class AddTvshowComponent implements OnInit{
  @Output() tvShowAdded: EventEmitter<void> = new EventEmitter<void>();
  ngOnInit(): void {
    this.tvShowForm = this.fb.group({
      tvShowId: ['', Validators.required],
      showTitle: [''],
      releaseYear: ['', Validators.pattern('^[0-9]{4}$')],
      genre: [''],
      showImagePath: [''],
      showDescription: [''],
      showRating: ['', Validators.pattern('^[0-9](\.[0-9]{1,2})?$')],
      showDirector:[''],
      showWriters:[''],
      trailerLink: [''],
      streamingOn: [''],
      castAndCrew: ['' ],
      availableLanguages: ['']
    });
  }
  selectedFile!: File;
  name!: string;
  tvShowForm!: FormGroup;
  tvShow: any;
  tvShows:TvShow[]=[];

  constructor(private imageService: ImageService,private sanitizer: DomSanitizer,
    private fb:FormBuilder,private router:Router,private _dailogref:MatDialog,
     private snackBar: MatSnackBar,
     private tvShowAddServie:TvEditService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  onSubmit() {
    const formData=this.tvShowForm.value;
    this.imageService.addTvShow(formData,this.selectedFile).subscribe(
      (response:any)=>{
        console.log("Tv Show added successfully",response);
        this.onUpload(response.tvShowId);
        this._dailogref.closeAll();
        this.snackBar.open("Tv Show successfully added: " + formData.showTitle, 'Close', {
          duration: 2000, // Adjust the duration as needed
          horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar'],
        });
        //this.tvShowAdded.emit();
        this.tvShowAddServie.announceTvShowAdded(response);
      },
      error=>{
        console.error('error adding tvshow:',error);
        // alert("tvs show not added..uhhhh, but it is getting saved in local folder huhuuu");
        this.snackBar.open("Tv Show not added: " + formData.showTitle, 'Close', {
          duration: 2000, // Adjust the duration as needed
          horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar'],
        });
      }
    )
    this.imageService.getTvShows();
    }
      
    
      onUpload(tvShowId:string) {
        if (this.name && this.selectedFile) {
          this.imageService.addTvShow(this.tvShowForm.value, this.selectedFile)
            .subscribe(
              response => {
                console.log('Response from server:', response);
                if(typeof response === 'string' && response.includes('Image Uploaded successfully')){
                  console.log('File uploaded successfully:', response);
                  // alert("tv show added successfully : " );
                  this.snackBar.open("Tv Show successfully added: " , 'Close', {
                    duration: 2000, // Adjust the duration as needed
                    horizontalPosition: 'center', // You can change the position (e.g., 'start', 'end')
                    verticalPosition: 'bottom',
                    panelClass: ['success-snackbar'],
                  });
                }
                else{
                  console.log('unexcpeced format',response);
                }
                
                
              },
              error => {
                console.error('Error uploading file:', error);
               
              }
            );
        } else {
          console.error('Name and file must be provided.');
        }
      }


}
{

}
