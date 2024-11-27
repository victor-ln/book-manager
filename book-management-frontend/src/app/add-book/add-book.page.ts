import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service'; // Serviço da API

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.page.html',
  styleUrls: ['./add-book.page.scss'],
})
export class AddBookPage {
  newBook = { isbn: '' }; // Modelo inicial do novo livro

  constructor(private router: Router, private apiService: ApiService) {}

  addBook() {
    if (!this.newBook.isbn.trim()) {
      console.error('ISBN é obrigatório!');
      return;
    }

    this.apiService.addBook(this.newBook.isbn).subscribe(
      (response) => {
        console.log('Livro cadastrado com sucesso:', response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erro ao cadastrar livro:', error);
      }
    );
  }
}
