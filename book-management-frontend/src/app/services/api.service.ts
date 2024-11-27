import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book-model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://localhost:3000'; // URL da API

  constructor(private http: HttpClient) {}

  // Obter todos os livros
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.API_URL}/books`);
  }

  // Obter livro por ID
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.API_URL}/books/${id}`);
  }

  // Adicionar novo livro
  addBook(isbn: string): Observable<any> {
    return this.http.post(`${this.API_URL}/books`, { isbn });
  }

  // Obter notas de um livro
  getNotesByBookId(bookId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/books/${bookId}/notes`);
  }

  // Adicionar uma nota a um livro com a página especificada
  addNoteToBook(bookId: number, text: string, page: number): Observable<any> {
    const body = {
      note: text,
      page: page,
    };
    return this.http.post(`${this.API_URL}/books/${bookId}/notes`, body);
  }

  removeBook(bookId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/books/${bookId}`);
  }

  removeNoteFromBook(noteId: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/notes/${noteId}`);
  }
}
