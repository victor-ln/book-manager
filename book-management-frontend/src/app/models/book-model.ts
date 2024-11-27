export interface Book {
  id: number;
  author: string;
  title: string;
  cover_link?: string;
  isbn: string;
  pages: number;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: number;
  note: string;
  page: number;
  created_at: string;
  updated_at: string;
  books_idbooks: number;
}
