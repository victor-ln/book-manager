import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  book: any = null;
  notes: { id: number; note: string; date: string; page: number | null }[] = [];  // Corrigido para incluir page
  newNote = '';
  newNotePage: number | null = null;  // Nova variável para armazenar a página da nota

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
  ) {}

  ngOnInit() {
    // Obtém o ID do livro da navegação atual
    const navigation = this.router.getCurrentNavigation();
    const bookId = navigation?.extractedUrl?.queryParams['id'] || this.route.snapshot.paramMap.get('id');

    if (bookId) {
      // Faz a requisição para obter os detalhes do livro usando o ID
      this.apiService.getBookById(bookId).subscribe((book) => {
        this.book = book;
        // Após obter o livro, carrega as notas associadas
        this.loadNotes(this.book.id);
      });
    }
  }

  // Carregar as notas associadas ao livro
  loadNotes(bookId: number) {
    this.apiService.getNotesByBookId(bookId).subscribe((response) => {
      this.notes = response;
      console.log('Notas carregadas:', this.notes);
    });
  }

  // Adicionar uma nova nota
  addNote() {
    if (this.newNote.trim() && this.book?.id && this.newNotePage != null) {
      this.apiService.addNoteToBook(this.book.id, this.newNote, this.newNotePage).subscribe((response: any) => {
        this.notes.push({ id: response.id, note: this.newNote, date: response.date, page: this.newNotePage });  // Incluído page
        this.newNote = '';
        this.newNotePage = null;  // Limpa o campo da página após adicionar
        console.log('Nota adicionada:', response);
      });
    }
  }

  removeNote(noteId: number) {
    this.apiService.removeNoteFromBook(noteId).subscribe(
      () => {
        // Remove a nota da lista local após a exclusão bem-sucedida
        this.notes = this.notes.filter((note) => note.id !== noteId);
      },
      (error) => {
        console.error('Erro ao remover nota:', error);
      }
    );
  }
}
