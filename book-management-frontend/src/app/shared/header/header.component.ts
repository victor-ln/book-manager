import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title: string = ''; // Recebe o título da página como entrada

  constructor(private location: Location) {}

  goBack() {
    this.location.back(); // Volta para a página anterior
  }
}
