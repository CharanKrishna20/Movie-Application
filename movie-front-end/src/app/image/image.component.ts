
import { Component, Input, OnInit } from '@angular/core';
import { ImageService } from '../services/image.service';
import { error } from 'console';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.css'
})
export class ImageComponent implements OnInit{
  // @Input()
  // movie!:Movie;


  name!: string;
  selectedFile!: File;
  movieForm!: FormGroup;
  movies:Movie[]=[];

  

  constructor(private imageService: ImageService,private fb:FormBuilder,private router:Router) {}
  ngOnInit(): void {
    this.movieForm = this.fb.group({
      movieId: [''],
      movieTitle: ['', Validators.required],
      releaseYear: ['', Validators.pattern('^[0-9]{4}$')],
      genre: [''],
      movieImagePath: [''],
      movieDescription: [''],
      movieRating: ['', Validators.pattern('^[0-9](\.[0-9]{1,2})?$')]
    });

    this.imageService.getMovies().subscribe(
      (success => {
        this.movies=success;
        console.log(success);
      }),
      error =>{
        console.log(error);
      }
    )
  }
}

// import { Component, Input, OnInit } from '@angular/core';
// import { ImageService } from '../services/image.service';
// import { error } from 'console';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Observable } from 'rxjs';
// import { Movie } from '../models/movie';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-image',
//   templateUrl: './image.component.html',
//   styleUrl: './image.component.css'
// })
// export class ImageComponent implements OnInit{
//   @Input()
//   movie!:Movie;


//   name!: string;
//   selectedFile!: File;
//   movieForm!: FormGroup;
//   movies:Movie[]=[];
//   editingMovie:Movie |null=null;
//   isEditFormVisible=false;
  

//   constructor(private imageService: ImageService,private sanitizer: DomSanitizer,private fb:FormBuilder,private router:Router) {}
//   ngOnInit(): void {
//     this.movieForm = this.fb.group({
//       movieId: [''],
//       movieTitle: ['', Validators.required],
//       releaseYear: ['', Validators.pattern('^[0-9]{4}$')],
//       genre: [''],
//       movieImagePath: [''],
//       movieDescription: [''],
//       movieRating: ['', Validators.pattern('^[0-9](\.[0-9]{1,2})?$')]
//     });

//     this.imageService.getMovies().subscribe(
//       (success => {
//         this.movies=success;
//         console.log(success);
//       }),
//       error =>{
//         console.log(error);
//       }
//     )
//   }
  

//   deleteMovie(movieId:string|undefined) {
//     if (movieId) {
//       const confirmed = window.confirm('Are you sure you want to delete this movie?');
  
//       if (confirmed) {
//         this.imageService.deleteMovie(movieId).subscribe(
//           () => {
//             alert("Movie successfully deleted !!");
//             this.router.navigate(['/home']);
//           },
//           (error: any) => {
//             alert("uh...oh");
//             console.error('Error deleting movie:', error);
//           }
//         );
//       }
//     } else {
//       console.error('Movie ID is not available.');
//     }
//   }
// }

