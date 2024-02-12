import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { ImageService } from '../services/image.service';
// import { MovieService } from '../services/movie.service';
// import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
movies: Movie[]=[];


  constructor(private imageService:ImageService){}
  ngOnInit(): void {
    const scrollers: NodeListOf<Element> = document.querySelectorAll(".scroller");

    // If a user hasn't opted in for reduced motion, then we add the animation
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.addAnimation(scrollers);
    }
  }

  private addAnimation(scrollers: NodeListOf<Element>): void {
    scrollers.forEach((scroller: Element) => {
      // add data-animated="true" to every `.scroller` on the page
      (scroller as HTMLElement).setAttribute("data-animated", "true");

      // Make an array from the elements within `.scroller-inner`
      const scrollerInner: Element = scroller.querySelector(".scroller__inner")!;
      const scrollerContent: Element[] = Array.from(scrollerInner.children);

      // For each item in the array, clone it
      // add aria-hidden to it
      // add it into the `.scroller-inner`
      scrollerContent.forEach((item: Element) => {
        const duplicatedItem: Node = item.cloneNode(true);
        (duplicatedItem as HTMLElement).setAttribute("aria-hidden", "true");
        (scrollerInner as HTMLElement).appendChild(duplicatedItem);
      });
    });
  }

}
