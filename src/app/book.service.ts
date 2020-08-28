import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8097/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  

  constructor(private http: HttpClient) { }

  getBook(id: number): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }


  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`, { responseType: 'text' });
  }

  getBookList(params): Observable<any> {
    console.log(params)
    return this.http.get(baseUrl+"?"+"pageSize="+params.size+"&"+"pageNo="+params.page);
  }
}
