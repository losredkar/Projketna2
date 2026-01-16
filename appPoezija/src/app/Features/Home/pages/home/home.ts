import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Poem } from '../../../../Core/Services/poem';
import { Auth } from '../../../../Core/Services/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  poems: any[] = [];
  currentUserId: string | null = null;
  currentUserEmail: string | null = null;
  currentUserDisplayName: string | null = null;
  onlyMyPoems: boolean = false;

  // Upravljanje z naročninami (da ne povzročamo memory leak-ov)
  private subscriptions: Subscription = new Subscription();

  constructor(
    private poemService: Poem,
    private authService: Auth
  ) {
    console.log('KONSTRUKTOR: Home komponenta se inicializira.');
  }

  ngOnInit(): void {
    console.log('NGONINIT: Vzpostavljam naročnine na podatke...');

    // 1. Naročnina na stanje uporabnika (Auth Service)
    this.subscriptions.add(
      this.authService.currentUser$.subscribe({
        next: (user) => {
          if (user) {
            this.currentUserId = user.id;
            this.currentUserEmail = user.email;
            this.currentUserDisplayName = user.user_metadata?.display_name;
            console.log('Uporabnik identificiran:', this.currentUserId);
          }
        },
        error: (err) => console.error('Napaka pri pridobivanju uporabnika:', err)
      })
    );

    // 2. Naročnina na tok poezij (Poem Service - BehaviorSubject)
    // To nam omogoči takojšen prikaz podatkov brez laga ob preklopu strani
    this.subscriptions.add(
      this.poemService.poems$.subscribe({
        next: (data) => {
          console.log('Prejeti podatki o poezijah iz servisa:', data);
          this.poems = data;
        },
        error: (err) => console.error('Napaka pri osveževanju seznama poezij:', err)
      })
    );

    // 3. Sprožimo dejanski klic na API, da se podatki v servisu osvežijo
    // Tudi če pride do zakasnitve na omrežju, bo uporabnik videl stare podatke (iz koraka 2)
    this.poemService.getPoems();
  }

  /**
   * Ko zapustimo komponento, prekinemo vse aktivne naročnine.
   */
  ngOnDestroy(): void {
    console.log('NGONDESTROY: Čistim naročnine.');
    this.subscriptions.unsubscribe();
  }
  onDelete(id: number) {
    if (confirm('Ali si prepričan, da želiš izbrisati to poezijo?')) {
      this.poemService.deletePoem(id).subscribe({
        next: () => console.log('Izbrisano'),
        error: (err) => alert('Napaka pri brisanju: ' + err.message)
      });
    }
  }
}
