export type Movie={
    movieId: string;
    movieTitle: string;
    releaseYear:string;
    genre:string;
    movieImagePath:string;
    movieDescription:string;
    movieRating:number;
    movieDirector:string;
    movieWriters:string[];
    trailerLink:string;
    streamingOn:string[];
    castAndCrew:string[];
    availableLanguages:string[];
    movieReviews?:string[];
}