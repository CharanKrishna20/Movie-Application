import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls:[ './search.component.css']
})
export class SearchComponent {
  // @Output() searchQuery = new EventEmitter<string>();
  // searchTerm: string = '';
  // selectedCategory: string = '';
  // categoriesVisible: boolean = false;

  // toggleCategories(): void {
  //   this.categoriesVisible = !this.categoriesVisible;
  // }

  // selectCategory(category: string): void {
  //   this.selectedCategory = category;
  //   this.toggleCategories();
  // }

  // onSearch(): void {
  //   const query = this.selectedCategory ? `${this.selectedCategory}: ${this.searchTerm}` : this.searchTerm;
  //   this.searchQuery.emit(query);
  // }

  searchText: string = '';
  constructor() { }
  @Output() searchEvent = new EventEmitter<string>();

  ngOnInit(): void {
  }
 
  search() {
    this.searchEvent.emit(this.searchText);
  }
}
