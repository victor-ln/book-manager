import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit {
  book: any = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const isbn = this.route.snapshot.paramMap.get('isbn');
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

    // Busca os detalhes do livro pela API
    this.http.get(apiUrl).subscribe((response: any) => {
      if (response.totalItems > 0) {
        this.book = response.items[0].volumeInfo;
        console.log('Detalhes do livro carregados:', this.book);
    
        // Verifica se existe thumbnail em imageLinks
        this.book.cover = this.book.imageLinks?.thumbnail 
          ? this.book.imageLinks.thumbnail 
          : 'assets/images/default-cover.jpg'; // Caminho para a imagem padrão
      } else {
        console.log('Livro não encontrado.');
      }
    });
  }
}
