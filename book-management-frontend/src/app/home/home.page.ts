import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Book } from '../models/book-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  books: Book[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService // Serviço da API injetado
  ) {}

  ngOnInit() {
    console.log("Laylon dev pleno");
    this.loadBooks(); // Carregar os livros ao inicializar o componente
  }

  loadBooks() {
    this.apiService.getAllBooks().subscribe(
      (books: Book[]) => {
        this.books = books; // Atualizar a lista de livros com os dados da API
      },
      (error: Error) => {
        console.error('Erro ao carregar livros:', error);
      }
    );
  }

  public navigateToDetails(isbn: string) {
    this.router.navigate(['/book-details', isbn]);
  }

  public navigateToNotes(bookId: number) {
    this.router.navigate(['/notes', bookId]);
  }

  public removeBook(bookId: number) {
    this.apiService.removeBook(bookId).subscribe(() => {
      // Atualiza a lista de livros após a remoção
      this.books = this.books.filter(book => book.id !== bookId);
    });
  }
}
