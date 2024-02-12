export type TvShow={
    tvShowId: string;
    showTitle: string;
    releaseYear:string;
    genre:string;
    showImagePath:string;
    showDescription:string;
    showRating:string;
    showReviews?:string[];
    showDirector:string;
    showWriters:string[];
    trailerLink:string;
    streamingOn:string[];
    castAndCrew:string[];
    availableLanguages:string[]

    // backdrops: string[];
    // reviewIds: Review[];
}