import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-poem-card',
  standalone: false,
  templateUrl: './poem-card.html',
  styleUrl: './poem-card.css',
})
export class PoemCard {
  @Input() poem: any;
  @Input() isMyPoem: boolean = false;
  @Input() currentUserId: string | null = null;

  // @OUTPUT: Otrok (ta komponenta) sporoči staršu, da je treba brisati
  @Output() deleteRequested = new EventEmitter<number>();

  onDeleteClick() {
    // Ne brišemo tukaj, ampak pošljemo ID staršu, ki ima dostop do servisa
    this.deleteRequested.emit(this.poem.id);
  }
}
