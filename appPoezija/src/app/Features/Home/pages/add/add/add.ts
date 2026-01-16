import { Component } from '@angular/core';
import { Poem } from '../../../../../Core/Services/poem';
import { Auth } from '../../../../../Core/Services/auth';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add',
  standalone: false,
  templateUrl: './add.html',
  styleUrl: './add.css',
})
export class Add {
// Model za obrazec (samo naslov in vsebina)
  newPoem = {
    title: '',
    content: ''
  };

  constructor(
    private poemService: Poem,
    private authService: Auth,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      // 1. Pridobimo trenutnega uporabnika iz Auth servisa (ki ga že imaš v spominu)
      this.authService.currentUser$.subscribe(user => {
        if (user) {
          // 2. Pripravimo celoten objekt za bazo
          const poemToPost = {
            title: this.newPoem.title,
            content: this.newPoem.content,
            author_name: user.user_metadata?.display_name || 'Neznan avtor',
            user_id: user.id
          };

          // 3. Pokličemo servis
          this.poemService.addPoem(poemToPost).subscribe({
            next: () => {
              alert('Poezija uspešno dodana!');
              this.router.navigate(['/home']); // Preusmeritev na domov
            },
            error: (err) => console.error('Napaka pri shranjevanju:', err)
          });
        }
      });
      form.resetForm();
    }
  }
}
