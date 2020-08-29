
import { Component, OnInit } from '@angular/core';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { Book } from "../book";
import { Observable } from "rxjs";
import { BookService } from "../book.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  books: Observable<Book[]>;

  page = 1;
  count = 0;
  pageSize = 5;
  pageSizes = [5,10,15];

  constructor(private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }
  getRequestParams( page, pageSize) {
  
    let params = {};

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  reloadData() {
    const params = this.getRequestParams( this.page, this.pageSize);
     this.bookService.getBookList(params)
     .subscribe(
      response =>{
        const{books,totalItems} = response;
        this.books = books;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
    
  }

  handlePageChange(event) {
    this.page = event;
    this.reloadData();
  }

  handlePageSizeChange(event) {
    this.pageSize = event.target.value;
    this.page = 1;
    this.reloadData();
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  bookDetails(id: number){
    this.router.navigate(['details', id]);
  }


}
