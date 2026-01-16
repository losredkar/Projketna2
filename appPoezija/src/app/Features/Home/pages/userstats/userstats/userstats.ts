import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-userstats',
  standalone: false,
  templateUrl: './userstats.html',
  styleUrl: './userstats.css',
})
export class Userstats {
  // Prejmemo število poezij od starša
  @Input() stevilka: number=0 ;

  @Output() state = new EventEmitter<boolean>();

  onToggle(event: any) {
    // switch - on off za izpis poezij samo od avtorja
    const checked = event.target.checked;
    // Pošljemo to informacijo staršu
    this.state.emit(checked);
  }
}
